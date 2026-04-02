import pandas as pd
import os
import numpy as np

def engineer_features(input_file='cleaned_laps_2025.csv'):
    """
    Transforms the cleaned data into a feature-rich dataset for ML.
    Creates:
    - TyreAge: Current age of tyres.
    - TyreCompound_Encoded: Numerical value for compounds.
    - EstFuelLoad: Estimated fuel remaining in the car.
    - RollingPace: Average of the last 3 lap times for that driver/race.
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    input_path = os.path.join(base_dir, 'data', input_file)
    
    if not os.path.exists(input_path):
        print(f"❌ Input file not found: {input_path}")
        return

    print(f"🚀 Feature Engineering started on {input_file}...")
    df = pd.read_csv(input_path)

    # 1. Encode Tyre Compounds (Soft is fastest/less durable, Hard is slowest/most durable)
    # Mapping based on common racing knowledge
    compound_map = {
        'SOFT': 3,
        'MEDIUM': 2,
        'HARD': 1,
        'INTERMEDIATE': 0,
        'WET': -1
    }
    df['CompoundScore'] = df['Compound'].map(compound_map).fillna(0)

    # 2. Estimated Fuel Load
    # Cars are heaviest at Lap 1. Each lap reduces weight (approx 100Kg total over ~60 laps).
    # Feature calculation: (Total Laps in Race - Current Lap)
    # We estimate total laps as the maximum lap number for that Round.
    max_laps = df.groupby('RoundNumber')['LapNumber'].transform('max')
    df['EstFuelLoad'] = max_laps - df['LapNumber']

    # 3. Rolling Pace (Moving Average)
    # We look at the last 3 laps to see how consistent the driver is.
    df = df.sort_values(by=['RoundNumber', 'Driver', 'LapNumber'])
    df['RollingPace'] = df.groupby(['RoundNumber', 'Driver'])['LapTime'].transform(lambda x: x.rolling(window=3).mean())
    
    # Fill rolling pace for Lap 1 and 2 with the current LapTime to avoid NaNs
    df['RollingPace'] = df['RollingPace'].fillna(df['LapTime'])

    # 4. Normalize Lap Time (Track Relative)
    # Different tracks have different lengths/times (Monaco vs Monza).
    # We scale lap times relative to the median time of the entire race to allow the model to generalize across tracks.
    race_median = df.groupby('RoundNumber')['LapTime'].transform('median')
    df['NormalizedLapTime'] = df['LapTime'] / race_median

    output_path = os.path.join(base_dir, 'data', 'features_laps_2025.csv')
    df.to_csv(output_path, index=False)
    
    print(f"✅ Feature engineering complete.")
    print(f"📊 Features added: CompoundScore, EstFuelLoad, RollingPace, NormalizedLapTime.")
    print(f"💾 Feature-rich data saved to: {output_path}")

if __name__ == "__main__":
    engineer_features()
