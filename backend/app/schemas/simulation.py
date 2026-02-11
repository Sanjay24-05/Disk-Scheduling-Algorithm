from pydantic import BaseModel
from typing import List, Optional

class SimulationRequest(BaseModel):
    algorithm: str
    requests: List[int]
    start_head: int
    disk_size: int
    direction: Optional[str] = "right"

class SimulationResponse(BaseModel):
    sequence: List[int]
    total_head_movement: int
    message: Optional[str] = None

class ComparisonRequest(BaseModel):
    algorithms: List[str]
    requests: List[int]
    start_head: int
    disk_size: int

class ComparisonResponse(BaseModel):
    results: dict
    message: Optional[str] = None
