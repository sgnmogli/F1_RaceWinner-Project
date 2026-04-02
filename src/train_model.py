import pandas as pd
import os
import joblib
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, r2_score

def train_f1_model(train_file='train_2025.csv', test_file='test_2025.csv'):
    """
    Trains a GradientBoostingRegressor to predict NormalizedLapTime.
    Saves the trained model to the models/ directory.
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    train_path = os.path.join(base_dir, 'data', train_file)
    test_path = os.path.join(base_dir, 'data', test_file)
    
    if not os.path.exists(train_path) or not os.path.exists(test_path):
        print("❌ Train/Test files not found. Run split_data.py first.")
        return

    print("🌲 Loading training and testing data...")
    train_df = pd.read_csv(train_path)
    test_df = pd.read_csv(test_path)

    # Features: CompoundScore, TyreLife, EstFuelLoad, RollingPace
    # Note: We use RollingPace as it encapsulates recent driver performance/consistency.
    features = ['CompoundScore', 'TyreLife', 'EstFuelLoad', 'RollingPace']
    target = 'NormalizedLapTime'

    # Drop any remaining NaNs in these specific columns (just in case)
    train_df = train_df.dropna(subset=features + [target])
    test_df = test_df.dropna(subset=features + [target])

    X_train = train_df[features]
    y_train = train_df[target]
    
    X_test = test_df[features]
    y_test = test_df[target]

    print(f"🚀 Training GradientBoostingRegressor with features: {features}")
    # Initialize the model
    model = GradientBoostingRegressor(
        n_estimators=150, 
        learning_rate=0.1, 
        max_depth=4, 
        random_state=42
    )

    # Fit the model
    model.fit(X_train, y_train)

    # Evaluate the model
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    print("\n📈 Model Evaluation Results:")
    print(f"📊 Mean Absolute Error (MAE): {mae:.5f}")
    print(f"📊 R² Score: {r2:.4f}")

    # Feature Importance
    importance = pd.DataFrame({'Feature': features, 'Importance': model.feature_importances_})
    importance = importance.sort_values(by='Importance', ascending=False)
    print("\n🧠 Feature Importance:")
    print(importance)

    # Save the model
    model_dir = os.path.join(base_dir, 'models')
    os.makedirs(model_dir, exist_ok=True)
    model_path = os.path.join(model_dir, 'f1_lap_predictor_v1.pkl')
    joblib.dump(model, model_path)
    
    print(f"\n✅ Model saved to: {model_path}")

if __name__ == "__main__":
    train_f1_model()
