import pandas as pd
import os
import numpy as np

def clean_data(input_file='laps_data_2025.csv'):
    """
    Cleans the raw F1 lap data by:
    1. Removing laps with missing times (DNFs / Pit In-Outs).
    2. Removing laps driven under Safety Car or Virtual Safety Car.
    3. Basic anomaly detection (extreme lap times).
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    input_path = os.path.join(base_dir, 'data', input_file)
    
    if not os.path.exists(input_path):
        print(f"❌ Input file not found: {input_path}")
        return

    print(f"🧹 Loading raw data from {input_file}...")
    df = pd.read_csv(input_path)
    initial_count = len(df)

    # 1. Drop rows with null LapTime (meaning the lap was not completed or recorded properly)
    df = df.dropna(subset=['LapTime'])

    # 2. Filter out non-racing conditions
    # FastF1 'TrackStatus' codes: 
    # '1' is Green flag, '2' is Yellow, '4' is SC, '6' is VSC, '7' is Red Flag
    # We only want '1' for pure racing pace prediction.
    if 'TrackStatus' in df.columns:
        df = df[df['TrackStatus'] == 1]
    
    # 3. Remove Pit In/Out Laps (as they skew the average pace)
    # PitOutTime/PitInTime aren't null for those laps.
    df = df[df['PitOutTime'].isna() & df['PitInTime'].isna()]

    # 4. Filter anomalies (laps that are way too slow but didn't have a track status flag)
    # We calculate the median per driver per race to find outliers
    # If a lap is > 115% of the median, it's likely a mistake or a spin not caught by flags.
    # Note: Column in FastF1 CSV is 'Driver', not 'DriverCode'
    median_laps = df.groupby(['RoundNumber', 'Driver'])['LapTime'].transform('median')
    df = df[df['LapTime'] < (median_laps * 1.15)]

    final_count = len(df)
    removed = initial_count - final_count
    
    output_path = os.path.join(base_dir, 'data', 'cleaned_laps_2025.csv')
    df.to_csv(output_path, index=False)
    
    print(f"✅ Data cleaning complete.")
    print(f"📊 Rows before: {initial_count}")
    print(f"📊 Rows after: {final_count} (Removed {removed} noise/outlier rows)")
    print(f"💾 Cleaned data saved to: {output_path}")

if __name__ == "__main__":
    clean_data()
