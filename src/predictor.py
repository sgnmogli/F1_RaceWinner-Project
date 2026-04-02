import fastf1
import pandas as pd
import joblib
import os
import warnings
from config import setup_cache

warnings.filterwarnings("ignore")

def predict_race_winner(year=2026, round_num=5):
    """
    Predicts the race results for a specific GP using Qualifying data as input features.
    1. Fetches 2026 Qualifying data.
    2. Processes features (RollingPace, FuelLoad, Compound).
    3. Runs the model to predict NormalizedLapTime.
    4. Ranks drivers to find the winner.
    """
    setup_cache()
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    model_path = os.path.join(base_dir, 'models', 'f1_lap_predictor_v1.pkl')
    
    if not os.path.exists(model_path):
        print("❌ Model not found. Run train_model.py first.")
        return

    model = joblib.load(model_path)
    
    print(f"\n🏁 Fetching 2026 Qualifying data for Round {round_num}...")
    # We load Qualifying ('Q') to get the latest pace and tire compound info
    session = fastf1.get_session(year, round_num, 'Q')
    session.load(telemetry=False, weather=False)
    
    laps = session.laps
    if laps.empty:
        print("❌ No laps found for this session.")
        return

    # Feature Engineering for Inference
    # For prediction, we take the best/average performance from Qualifying for each driver
    df = laps[['Driver', 'LapTime', 'Compound', 'TyreLife']].copy()
    df['LapTime'] = df['LapTime'].dt.total_seconds()
    
    # Pre-process compounds
    compound_map = {'SOFT': 3, 'MEDIUM': 2, 'HARD': 1, 'INTERMEDIATE': 0, 'WET': -1}
    df['CompoundScore'] = df['Compound'].map(compound_map).fillna(0)
    
    # Estimate Fuel Load for a typical Race Start (Max Laps - 1)
    # We assume we are predicting for the start of the race.
    try:
        race_session = fastf1.get_session(year, round_num, 'R')
        race_session.load(telemetry=False, weather=False, laps=False)
        total_laps = int(race_session.total_laps) if race_session.total_laps else 58
    except:
        total_laps = 58 # Default
        
    df['EstFuelLoad'] = total_laps - 1
    
    # Rolling Pace (Use their best 3 laps in Quali as a proxy for race consistency)
    df = df.sort_values(by=['Driver', 'LapTime'])
    df['RollingPace'] = df.groupby('Driver')['LapTime'].transform(lambda x: x.rolling(window=2, min_periods=1).mean())

    # Features for the model
    features = ['CompoundScore', 'TyreLife', 'EstFuelLoad', 'RollingPace']
    
    # We take the BEST qualifying lap representative for each driver
    input_data = df.groupby('Driver').first().reset_index()
    
    print(f"🔮 Predicting race pace for {session.event['EventName']}...")
    predictions = model.predict(input_data[features])
    input_data['PredictedPaceScore'] = predictions

    # Rank drivers (Lower pace score = faster normalized lap = higher rank)
    input_data = input_data.sort_values(by='PredictedPaceScore')
    input_data['PredictedPos'] = range(1, len(input_data) + 1)

    print(f"\n🏆 PREDICTED TOP 10 - {session.event['EventName']} 🏆")
    print("-" * 45)
    top_10 = input_data[['PredictedPos', 'Driver', 'PredictedPaceScore']].head(10)
    for index, row in top_10.iterrows():
        medal = "🥇" if row['PredictedPos'] == 1 else "🥈" if row['PredictedPos'] == 2 else "🥉" if row['PredictedPos'] == 3 else "🏎️ "
        print(f"{medal} P{int(row['PredictedPos'])}: {row['Driver']} (Score: {row['PredictedPaceScore']:.5f})")
    
    print("-" * 45)
    winner = input_data.iloc[0]['Driver']
    print(f"\n🔥 Predicted Winner: {winner} 🔥")

if __name__ == "__main__":
    # Predicting for the Saudi Arabian GP (Round 2) to ensure more stable availability
    predict_race_winner(2026, 2)
