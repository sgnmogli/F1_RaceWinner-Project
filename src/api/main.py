from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import fastf1
import joblib
import os
import pandas as pd
from typing import List
from . import schemas
import sys

# Add parent directory to path to import config
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import setup_cache

app = FastAPI(title="F1 2026 Prediction API")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with actual frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
)

setup_cache()

# Load the ML model once on startup
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'models', 'f1_lap_predictor_v1.pkl')
model = joblib.load(MODEL_PATH)

@app.get("/races", response_model=List[schemas.RaceInfo])
async def get_races(year: int = 2026):
    try:
        schedule = fastf1.get_event_schedule(year)
        races = schedule[schedule['RoundNumber'] > 0].copy()
        # Cast EventDate to string for JSON serialization
        races['EventDate'] = races['EventDate'].dt.strftime('%Y-%m-%d')
        return races[['RoundNumber', 'EventName', 'EventDate']].to_dict('records')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/predict/{round_num}", response_model=schemas.PredictionResponse)
async def get_prediction(round_num: int, year: int = 2026):
    try:
        session = fastf1.get_session(year, round_num, 'Q')
        session.load(telemetry=False, weather=False)
        
        laps = session.laps
        df = laps[['Driver', 'LapTime', 'Compound', 'TyreLife']].copy()
        df['LapTime'] = df['LapTime'].dt.total_seconds()
        
        # Preprocess
        compound_map = {'SOFT': 3, 'MEDIUM': 2, 'HARD': 1, 'INTERMEDIATE': 0, 'WET': -1}
        df['CompoundScore'] = df['Compound'].map(compound_map).fillna(0)
        df['EstFuelLoad'] = 57 # Total laps approximation
        df = df.sort_values(by=['Driver', 'LapTime'])
        df['RollingPace'] = df.groupby('Driver')['LapTime'].transform(lambda x: x.rolling(window=2, min_periods=1).mean())
        
        features = ['CompoundScore', 'TyreLife', 'EstFuelLoad', 'RollingPace']
        input_data = df.groupby('Driver').first().reset_index()
        
        preds = model.predict(input_data[features])
        input_data['Score'] = preds
        input_data = input_data.sort_values(by='Score')
        
        results = []
        for i, row in enumerate(input_data.itertuples()):
            drv_info = session.get_driver(row.Driver)
            results.append({
                "Rank": i + 1,
                "Driver": row.Driver,
                "Score": float(row.Score),
                "TeamColor": f"#{drv_info['TeamColor']}" if drv_info['TeamColor'] else "#FFFFFF",
                "HeadshotUrl": drv_info['HeadshotUrl']
            })
            
        return {
            "EventName": session.event['EventName'],
            "Predictions": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/telemetry/{round_num}", response_model=schemas.TelemetryResponse)
async def get_telemetry(round_num: int, d1: str, d2: str, year: int = 2026):
    try:
        session = fastf1.get_session(year, round_num, 'Q')
        session.load(telemetry=True, laps=True, weather=False)
        
        l1 = session.laps.pick_driver(d1).pick_fastest()
        l2 = session.laps.pick_driver(d2).pick_fastest()
        
        t1 = l1.get_telemetry().add_distance()
        t2 = l2.get_telemetry().add_distance()
        
        d1_info = session.get_driver(d1)
        d2_info = session.get_driver(d2)
        
        return {
            "Driver1": d1,
            "Driver1Color": f"#{d1_info['TeamColor']}" if d1_info['TeamColor'] else "#00FFFF",
            "Driver1Data": t1[['Distance', 'Speed']].rename(columns={'Distance': 'Distance', 'Speed': 'Speed'}).to_dict('records'),
            "Driver2": d2,
            "Driver2Color": f"#{d2_info['TeamColor']}" if d2_info['TeamColor'] else "#FF0000",
            "Driver2Data": t2[['Distance', 'Speed']].rename(columns={'Distance': 'Distance', 'Speed': 'Speed'}).to_dict('records')
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
