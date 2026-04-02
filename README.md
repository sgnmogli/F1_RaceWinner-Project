# 🏎️ F1 Predictions 2026 - Machine Learning Model

Welcome to the F1 Predictions 2026 repository! This project aims to predict race outcomes for the 2026 Formula 1 season using Machine Learning, historical F1 data, and the `fastf1` API.

## 🚀 Project Overview
This repository implements a Machine Learning pipeline (using a Gradient Boosting Regressor and potential Deep Learning models) that predicts race results, lap times, and driver rankings based on past performance, qualifying times, telemetry, and other structured F1 data.

Key features of our model include:
- Predicting the 2026 race winners and top 10 finishers.
- Fetching and processing data via the FastF1 API.
- Utilizing 2025 historical race results as training data.
- Incorporating 2026 Qualifying and Practice session data for race day predictions.
- Feature engineering techniques for lap times, weather conditions, and pit-stop strategies.

## 📊 Data Sources
- **FastF1 API**: The primary source for fetching lap times, telemetry, session results, and driver data.
- **2025 Historical Race Results**: Detailed lap-by-lap data from the previous season used to train your baseline models.
- **2026 Practice & Qualifying Data**: Live session data used as input features to predict the main race outcome.
- **Weather API (Optional)**: Can be integrated to analyze the impact of rain/track temperature.

## 🏁 How It Works (Methodology)
1. **Data Collection**: Scripts pull relevant session data using the `fastf1` library.
2. **Preprocessing & Feature Engineering**: 
   - Normalizing driver names.
   - Handling missing telemetry or lap times.
   - Structuring pace, tire degradation, and track conditions.
3. **Model Training**: A `GradientBoostingRegressor` (from `scikit-learn`) is trained on historical data.
4. **Prediction**: The trained model ingests 2026 qualifying data to predict target race times and final classifications.
5. **Evaluation**: We evaluate model performance using Mean Absolute Error (MAE) and accuracy in classifying podium finishers.

## 📁 Project Structure
```text
F1_RaceWinner_Project/
│
├── data/                 # Raw and processed datasets (CSV/Parquet)
├── notebooks/            # Jupyter notebooks for EDA and model prototyping
├── src/                  # Core Python modules
│   ├── data_fetcher.py   # Scripts to interact with FastF1 API
│   ├── preprocess.py     # Feature engineering and data cleaning
│   ├── train_model.py    # Training and evaluation logic
│   └── predictor.py      # Inference script for 2026 races
├── README.md             # Project documentation
├── tasks.md              # Step-by-step roadmap and checklist
└── requirements.txt      # Python dependencies
```

## 🔧 Environment Setup
To run this project locally, ensure you have Python 3.9+ installed.

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd F1_RaceWinner_Project
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

### Core Code Dependencies (`requirements.txt`)
- `fastf1`: For Formula 1 data retrieval.
- `numpy`: Numerical calculations.
- `pandas`: Data manipulation and structuring.
- `scikit-learn`: Machine learning model building and evaluation.
- `matplotlib` / `seaborn`: Data visualization.
- `jupyter`: For interactive analysis.

## 📌 Future Improvements
- **Weather Integration**: Incorporate real-time and historical weather tracking as a feature.
- **Tire/Pit Strategies**: Add logic to predict pit windows based on compound degradation.
- **Deep Learning**: Explore recurrent neural networks (RNNs/LSTMs) for time-series lap prediction.

## 📜 License
This project is licensed under the MIT License.
🏎️ Start predicting F1 races like a data scientist! 🚀
