import streamlit as st
import fastf1
import joblib
import os
import pandas as pd
from src.config import setup_cache

st.set_page_config(page_title="Race Predictions", page_icon="🔮")
st.title("🔮 2026 Race Winner Predictions")

setup_cache()

# Load model
model_path = os.path.join(os.getcwd(), 'models', 'f1_lap_predictor_v1.pkl')

if not os.path.exists(model_path):
    st.error("Model file not found! Please run `python src/train_model.py` first.")
else:
    model = joblib.load(model_path)
    
    # User Inputs
    st.sidebar.header("Race Selection")
    year = st.sidebar.number_input("Year", min_value=2026, max_value=2026, value=2026)
    
    # Load schedule to get race names
    schedule = fastf1.get_event_schedule(year)
    # Filter only real races (RoundNumber > 0)
    races = schedule[schedule['RoundNumber'] > 0][['RoundNumber', 'EventName']]
    race_names = races['EventName'].tolist()
    
    selected_race = st.sidebar.selectbox("Select Grand Prix", race_names)
    round_num = int(races[races['EventName'] == selected_race]['RoundNumber'].values[0])
    
    if st.button("Run Forecast"):
        with st.spinner(f"AI is analyzing Round {round_num} data..."):
            try:
                # Fetching session
                session = fastf1.get_session(year, round_num, 'Q')
                session.load(telemetry=False, weather=False)
                
                laps = session.laps
                df = laps[['Driver', 'LapTime', 'Compound', 'TyreLife']].copy()
                df['LapTime'] = df['LapTime'].dt.total_seconds()
                
                # Preprocess
                compound_map = {'SOFT': 3, 'MEDIUM': 2, 'HARD': 1, 'INTERMEDIATE': 0, 'WET': -1}
                df['CompoundScore'] = df['Compound'].map(compound_map).fillna(0)
                df['EstFuelLoad'] = 58 - 1 # Simple approximation
                df = df.sort_values(by=['Driver', 'LapTime'])
                df['RollingPace'] = df.groupby('Driver')['LapTime'].transform(lambda x: x.rolling(window=2, min_periods=1).mean())
                
                # Predict
                features = ['CompoundScore', 'TyreLife', 'EstFuelLoad', 'RollingPace']
                input_data = df.groupby('Driver').first().reset_index()
                
                preds = model.predict(input_data[features])
                input_data['Score'] = preds
                input_data = input_data.sort_values(by='Score')
                input_data['Rank'] = range(1, len(input_data) + 1)
                
                # Display Results
                st.subheader(f"🏆 Predicted Results: {session.event['EventName']}")
                
                # Visual Podium for Top 3
                podium_cols = st.columns(3)
                for i in range(min(3, len(input_data))):
                    driver = input_data.iloc[i]
                    drv_info = session.get_driver(driver['Driver'])
                    color = f"#{drv_info['TeamColor']}" if drv_info['TeamColor'] else "#FFFFFF"
                    headshot = drv_info['HeadshotUrl']
                    
                    with podium_cols[i]:
                        st.markdown(f"<h3 style='text-align: center; color: {color};'>P{i+1}: {drv_info['LastName']}</h3>", unsafe_allow_html=True)
                        if headshot:
                            st.image(headshot, use_container_width=True)
                        else:
                            st.markdown("👤 (Image Pending)")
                        st.metric("Score", f"{driver['Score']:.4f}")

                st.divider()
                st.table(input_data[['Rank', 'Driver', 'Score']].head(10))

            except Exception as e:
                st.error(f"Error fetching data: {e}")
