# Trazabilidad SDLC: HU-05
from fastapi import APIRouter, HTTPException
from app.schemas import Ave, Error
from app.dependencies import get_ave_repository

router = APIRouter()


@router.get("/aves", response_model=dict[str, list[Ave]])
def list_aves() -> dict[str, list[Ave]]:
    repo = get_ave_repository()
    return {"items": [Ave.model_validate(a) for a in repo.list()]}


@router.get(
    "/aves/{ave_id}",
    response_model=Ave,
    responses={404: {"description": "Ave no encontrada", "model": Error}},
)
def get_ave(ave_id: int) -> Ave:
    repo = get_ave_repository()
    ave = repo.get(ave_id)
    if ave is None:
        raise HTTPException(status_code=404, detail="Ave no encontrada")
    return Ave.model_validate(ave)
