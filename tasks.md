# 📋 Tasks for 2026 F1 Race Winner Prediction Algorithm

This document outlines the step-by-step roadmap to build, train, and deploy the AI/ML model for predicting 2026 Formula 1 race winners.

## Phase 1: Project Setup and Environment
- [x] **Initialize Project Repository**: Create the folder structure (`data/`, `notebooks/`, `src/`).
- [x] **Set Up Virtual Environment**: Create a Python venv and install required dependencies (`fastf1`, `pandas`, `scikit-learn`, `numpy`, `matplotlib`).
- [x] **Create `requirements.txt`**: Freeze dependencies for reproducibility.
- [x] **Configure FastF1 Caching**: Enable the local cache folder for `fastf1` to prevent repetitive API calls and rate-limiting.

## Phase 2: Data Collection
- [x] **Fetch 2025 Historical Data**: Write a script (`src/data_fetcher.py`) to download all 2025 race lap times, telemetry, and final classifications.
- [ ] **Fetch 2026 Qualifying Data**: Implement logic to fetch live/recent 2026 qualifying and free practice data.
- [x] **Save Datasets**: Store the collected raw data into the `data/` directory in CSV or Parquet formats.

## Phase 3: Data Preprocessing and Feature Engineering
- [x] **Data Cleaning**: Handle missing laps, DNFs (Did Not Finish), and anomalies (like safety cars and red flags).
- [x] **Normalize Data**: Standardize track lengths and lap times, and encode categorical variables like Driver ID, Team, and Tire Compound.
- [x] **Feature Engineering**: 
  - Calculate average pace per compound.
  - Extract grid position vs. final finishing position metrics.
  - (Optional) Fetch and merge weather conditions for each session.
- [x] **Train/Test Split**: Separate the 2025 data into training and validation sets.

## Phase 4: Model Building and Training
- [x] **Choose a Baseline Algorithm**: Start with a `GradientBoostingRegressor` or `RandomForestRegressor` from `scikit-learn`.
- [x] **Define the Target Variable**: Decide whether to predict the exact race completion time (regression) or final placement position (classification).
- [x] **Train the Model**: Write the training logic in `src/train_model.py` and fit the model to the 2025 dataset.
- [x] **Evaluate Performance**: Use Mean Absolute Error (MAE) and accuracy metrics. Analyze feature importance to see which factors impact race results most.

## Phase 5: 2026 Race Prediction (Inference)
- [x] **Build Inference Pipeline**: Write `src/predictor.py` to ingest a specific 2026 Grand Prix qualifying session result.
- [x] **Run Predictions**: Pass the 2026 data through the trained model to predict the race time for each driver.
- [x] **Format Output**: Rank drivers based on predicted race times and format the output (e.g., predicted winner, podium, and calculated MAE).

## Phase 6: Iteration and Advanced AI (Future Enhancements)
- [ ] **Add Deep Learning**: Experiment with neural networks (like a simple MLP or LSTM for time-series lap data) using PyTorch or TensorFlow.
- [ ] **Incorporate Advanced Tactics**: Factor in pit-stop penalty times and track-specific overtaking difficulties.
- [ ] **Automate Executions**: Schedule predictions to run automatically right after 2026 Qualifying sessions conclude.

## Phase 7: GUI Development (Streamlit Dashboard)
- [x] **Initialize Streamlit App**: Create `app.py` and the `pages/` directory.
- [x] **Develop Prediction Page**: Interactive form to select races and view winner forecasts.
- [x] **Develop Telemetry Overlay**: Plotly visualizations for driver speed comparisons.
- [x] **Deploy Instructions**: Add guide for running the dashboard locally.
- [x] **User Feedback**: Replace round numbers with actual race location names in the GUI.
- [x] **User Feedback**: Display full driver names (e.g., Max Verstappen) in the telemetry selection for 2026.
- [x] **Driver Visuals**: Integrate official headshots and team colors into the dashboard.

## Phase 8: Full Stack Architecture (Next.js + FastAPI)
- [x] **Architecture Blueprint**: Document the transition to a professional-grade tech stack (Next.js, FastAPI, Shadcn UI).
- [ ] **API Design**: Define the JSON endpoints for serving race predictions.
- [ ] **Database & State**: Integrate Supabase (Free Tier PostgreSQL) for scalable data persistence instead of local CSVs.

## Phase 9: Real-world Web Implementation (Frontend UI/UX)
- [x] **Setup Backend API**: Initialize a FastAPI project and port the `src/predictor.py` logic.
- [ ] **Setup Modern Frontend**: Build Next.js 14+ App Router project.
- [ ] **Premium UI/UX**: Integrate Tailwind CSS, Shadcn UI, and Framer Motion for sleek animations, glassmorphism, and dark mode.
- [ ] **Advanced DataViz**: Implement Apache ECharts or Recharts for high-performance, interactive telemetry tracking (thousands of data points per lap).

## Phase 10: Scale & Deployment
- [ ] **Deploy Frontend**: Deploy to Vercel global edge network (Free Hobby Tier).
- [ ] **Deploy Backend**: Containerize and deploy FastAPI to Render or Railway (Free Tier).
- [ ] **Automated CI/CD**: Setup GitHub Actions for seamless continuous deployment.
