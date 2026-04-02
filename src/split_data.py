import pandas as pd
import os
from sklearn.model_selection import train_test_split

def split_data(input_file='features_laps_2025.csv'):
    """
    Splits the feature-rich 2025 dataset into Training (80%) and Testing (20%) sets.
    This ensures we evaluate our model on data it has never seen during training.
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    input_path = os.path.join(base_dir, 'data', input_file)
    
    if not os.path.exists(input_path):
        print(f"❌ Input file not found: {input_path}")
        return

    print(f"✂️ Splitting {input_file} into train/test sets...")
    df = pd.read_csv(input_path)

    # We use a random_state for reproducibility
    train_df, test_df = train_test_split(df, test_size=0.2, random_state=42)

    train_path = os.path.join(base_dir, 'data', 'train_2025.csv')
    test_path = os.path.join(base_dir, 'data', 'test_2025.csv')

    train_df.to_csv(train_path, index=False)
    test_df.to_csv(test_path, index=False)
    
    print(f"✅ Data split complete.")
    print(f"📊 Training samples: {len(train_df)}")
    print(f"📊 Testing samples: {len(test_df)}")
    print(f"💾 Training data saved to: {train_path}")
    print(f"💾 Testing data saved to: {test_path}")

if __name__ == "__main__":
    split_data()
