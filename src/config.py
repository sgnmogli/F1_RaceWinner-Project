import os
import fastf1

def setup_cache():
    """
    Sets up the FastF1 cache directory within the data folder.
    This helps in saving API requests and speeding up subsequent executions.
    """
    # Define the cache directory path
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    cache_dir = os.path.join(base_dir, 'data', 'cache')
    
    # Create the cache directory if it doesn't exist
    os.makedirs(cache_dir, exist_ok=True)
    
    # Enable the FastF1 cache
    fastf1.Cache.enable_cache(cache_dir)
    print(f"✅ FastF1 Cache enabled at: {cache_dir}")

if __name__ == "__main__":
    setup_cache()
