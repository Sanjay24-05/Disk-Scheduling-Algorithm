from fastapi import APIRouter, HTTPException
from app.schemas.simulation import SimulationRequest, SimulationResponse, ComparisonRequest, ComparisonResponse
from app.core import simulator

router = APIRouter()


@router.post("/simulate", response_model=SimulationResponse)
async def simulate(request: SimulationRequest):
    """Endpoint for running a single simulation."""
    try:
        result = simulator.run_single(request.algorithm, request.requests, request.start_head, request.disk_size)
        return {"sequence": result.get("sequence", []), "total_head_movement": result.get("total_head_movement", 0)}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/compare", response_model=ComparisonResponse)
async def compare(request: ComparisonRequest):
    """Endpoint for comparing multiple simulations."""
    results = simulator.run_compare(request.algorithms, request.requests, request.start_head, request.disk_size)
    return {"results": results}
