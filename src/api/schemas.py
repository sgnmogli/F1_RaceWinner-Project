from pydantic import BaseModel
from typing import List, Optional

class RaceInfo(BaseModel):
    RoundNumber: int
    EventName: str
    EventDate: str

class PredictionEntry(BaseModel):
    Rank: int
    Driver: str
    Score: float
    TeamColor: str
    HeadshotUrl: Optional[str] = None

class PredictionResponse(BaseModel):
    EventName: str
    Predictions: List[PredictionEntry]

class TelemetryPoint(BaseModel):
    Distance: float
    Speed: float

class TelemetryResponse(BaseModel):
    Driver1: str
    Driver1Color: str
    Driver1Data: List[TelemetryPoint]
    Driver2: str
    Driver2Color: str
    Driver2Data: List[TelemetryPoint]
