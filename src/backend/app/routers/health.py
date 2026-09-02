from fastapi import APIRouter
from app.schemas import HealthStatus

router = APIRouter()


@router.get("/health", response_model=HealthStatus)
def health_check() -> HealthStatus:
    return HealthStatus(status="ok")
