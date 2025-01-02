```python
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.maintenance import (
    MaintenanceRequest,
    MaintenanceResponse,
    MaintenanceCreate,
    MaintenanceUpdate
)
from services.maintenance import MaintenanceService
from utils.auth import get_current_user

router = APIRouter()
maintenance_service = MaintenanceService()

@router.post("/", response_model=MaintenanceResponse)
async def create_request(
    request: MaintenanceCreate,
    current_user = Depends(get_current_user)
):
    try:
        return await maintenance_service.create_request(request, current_user.id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[MaintenanceResponse])
async def get_requests(current_user = Depends(get_current_user)):
    try:
        return await maintenance_service.get_requests(current_user)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{request_id}", response_model=MaintenanceResponse)
async def get_request(
    request_id: str,
    current_user = Depends(get_current_user)
):
    try:
        request = await maintenance_service.get_request(request_id)
        if not request:
            raise HTTPException(status_code=404, detail="Request not found")
        return request
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/{request_id}", response_model=MaintenanceResponse)
async def update_request(
    request_id: str,
    updates: MaintenanceUpdate,
    current_user = Depends(get_current_user)
):
    try:
        request = await maintenance_service.update_request(request_id, updates)
        if not request:
            raise HTTPException(status_code=404, detail="Request not found")
        return request
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```