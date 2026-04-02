import streamlit as st
import fastf1
import plotly.graph_objects as go
import os
from src.config import setup_cache

st.set_page_config(page_title="Telemetry Comparison", page_icon="📊", layout="wide")
st.title("📊 Driver Telemetry Overlay")

setup_cache()

# Inputs
st.sidebar.header("Session Settings")
year = st.sidebar.number_input("Year", min_value=2025, max_value=2026, value=2026)

# Load schedule to get race names
schedule = fastf1.get_event_schedule(year)
races = schedule[schedule['RoundNumber'] > 0][['RoundNumber', 'EventName']]
race_names = races['EventName'].tolist()

selected_race = st.sidebar.selectbox("Select Grand Prix", race_names)
round_num = int(races[races['EventName'] == selected_race]['RoundNumber'].values[0])

st.sidebar.info(f"Comparing the FASTEST lap of selected drivers in {selected_race}.")

try:
    session = fastf1.get_session(year, round_num, 'Q')
    session.load(telemetry=False, weather=False)
    
    # Get all drivers and map to full names
    driver_map = {}
    for drv_code in session.drivers:
        try:
            drv_info = session.get_driver(drv_code)
            full_name = f"{drv_info['FirstName']} {drv_info['LastName']} ({drv_code})"
            driver_map[full_name] = drv_code
        except:
            driver_map[drv_code] = drv_code
            
    full_names = list(driver_map.keys())

    d1_full = st.selectbox("Select Driver 1", full_names, index=0)
    d2_full = st.selectbox("Select Driver 2", full_names, index=1 if len(full_names) > 1 else 0)
    
    d1 = driver_map[d1_full]
    d2 = driver_map[d2_full]

    if st.button("Compare Laps"):
        with st.spinner("Fetching high-speed telemetry..."):
            session.load(telemetry=True, laps=True)
            l1 = session.laps.pick_driver(d1).pick_fastest()
            l2 = session.laps.pick_driver(d2).pick_fastest()
            
            tel1 = l1.get_telemetry().add_distance()
            tel2 = l2.get_telemetry().add_distance()
            
            # Fetch official colors
            c1_hex = f"#{session.get_driver(d1)['TeamColor']}" or "#00FFFF"
            c2_hex = f"#{session.get_driver(d2)['TeamColor']}" or "#FF0000"
            
            fig = go.Figure()
            
            # Trace 1
            fig.add_trace(go.Scatter(
                x=tel1['Distance'], y=tel1['Speed'],
                name=f"{d1} Speed",
                line=dict(color=c1_hex, width=2)
            ))
            
            # Trace 2
            fig.add_trace(go.Scatter(
                x=tel2['Distance'], y=tel2['Speed'],
                name=f"{d2} Speed",
                line=dict(color=c2_hex, width=2, dash='dash')
            ))
            
            fig.update_layout(
                title=f"Speed Trace: {d1} vs {d2} ({session.event['EventName']})",
                xaxis_title="Distance (m)",
                yaxis_title="Speed (km/h)",
                template="plotly_dark",
                hovermode="x unified",
                height=600
            )
            
            st.plotly_chart(fig, use_container_width=True)
            
            # Additional Stats
            c1, c2 = st.columns(2)
            c1.write(f"**{d1}** Max Speed: {tel1['Speed'].max()} km/h")
            c2.write(f"**{d2}** Max Speed: {tel2['Speed'].max()} km/h")

except Exception as e:
    st.error(f"Please wait for data to load or check session availability. Error: {e}")
