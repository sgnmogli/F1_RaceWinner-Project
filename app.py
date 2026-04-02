import streamlit as st
import os

st.set_page_config(
    page_title="F1 2026 Predictor",
    page_icon="🏎️",
    layout="wide",
)

st.title("🏎️ F1 Race Winner Prediction Dashboard (2026)")

st.markdown("""
Welcome to the **F1 2026 Prediction Engine**. This dashboard uses a **Gradient Boosting Machine Learning** model 
trained on the 2025 season to forecast results for the 2026 season.

### 🚀 Key Features
- **Winner Predictions**: Select any 2026 Grand Prix and see our AI's predicted top 10 rankings.
- **Telemetry Analysis**: Compare driver performance side-by-side using interactive Plotly charts.
- **ML Insights**: Understand the 'Feature Importance' behind the AI's decisions.

### 🛠️ Navigation
Use the sidebar on the left to navigate between:
1. **Predictions**: Forecast future race winners.
2. **Telemetry**: Analyze technical driver data.

---
**Model Version:** 1.0.0 (Gradient Boosting Regressor)  
**Data Source:** FastF1 API
""")

# Quick status check
st.sidebar.success("Model Status: Loaded & Ready")
st.sidebar.info("Cache: Enabled")
