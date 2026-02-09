from fastapi import APIRouter
from app.schemas.simulation import SimulationRequest, SimulationResponse, ComparisonRequest, ComparisonResponse

router = APIRouter()

@router.post("/simulate", response_model=SimulationResponse)
async def simulate(request: SimulationRequest):
    """Endpoint for running a single simulation."""
    return {"message": "Simulation placeholder"}

@router.post("/compare", response_model=ComparisonResponse)
async def compare(request: ComparisonRequest):
    """Endpoint for comparing multiple simulations."""
    return {"message": "Comparison placeholder"}
