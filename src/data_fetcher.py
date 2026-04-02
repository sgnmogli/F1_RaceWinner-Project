import fastf1
import pandas as pd
import os
import warnings
from config import setup_cache

# Suppress annoying fastf1 warnings for cleaner output
warnings.filterwarnings("ignore", category=FutureWarning)

def fetch_season_data(year=2025):
    """
    Fetches the lap data and weather for all completed races in a given season.
    Saves the aggregated dataframe into the data/ directory as a CSV.
    """
    setup_cache()
    schedule = fastf1.get_event_schedule(year)
    
    all_laps = []
    
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = os.path.join(base_dir, 'data')
    os.makedirs(data_dir, exist_ok=True)
    
    print(f"\n🏎️  Fetching race lap data for {year} season...")
    
    # In fastf1, testing events usually have RoundNumber = 0; real races are > 0
    valid_rounds = schedule[schedule['RoundNumber'] > 0]['RoundNumber'].max()
    
    # Download data round by round
    for round_num in range(1, valid_rounds + 1):
        try:
            print(f"Loading {year} Round {round_num}...")
            # Grab the main race session ('R')
            session = fastf1.get_session(year, round_num, 'R')
            
            # Load laps and weather. Skip high-frequency telemetry (car data) for now to save disk space/memory.
            session.load(telemetry=False, weather=True) 
            
            laps = session.laps
            
            if not laps.empty:
                # Add round metadata to the dataframe for later context
                laps['RoundNumber'] = round_num
                laps['EventName'] = session.event['EventName']
                all_laps.append(laps)
                
        except Exception as e:
            print(f"⚠️ Could not load Round {round_num}: {e}")
            
    if all_laps:
        # Combine all the rounds into a single massive dataframe
        season_laps_df = pd.concat(all_laps, ignore_index=True)
        
        # CSVs cannot store native Timedelta objects easily, so convert them to total seconds
        for col in season_laps_df.select_dtypes(include=['timedelta64[ns]','timedelta64']).columns:
            season_laps_df[col] = season_laps_df[col].dt.total_seconds()
            
        csv_path = os.path.join(data_dir, f'laps_data_{year}.csv')
        season_laps_df.to_csv(csv_path, index=False)
        print(f"\n✅ Successfully aggregated and saved {year} season lap data to {csv_path}")
    else:
        print("\n❌ No laps found for the given season.")

if __name__ == "__main__":
    fetch_season_data(2025)
