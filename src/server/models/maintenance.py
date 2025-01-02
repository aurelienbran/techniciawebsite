```python
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum

class MaintenanceStatus(str, Enum):
    PENDING = 'pending'
    IN_PROGRESS = 'in-progress'
    COMPLETED = 'completed'
    CANCELLED = 'cancelled'

class MaintenancePriority(str, Enum):
    LOW = 'low'
    MEDIUM = 'medium'
    HIGH = 'high'
    CRITICAL = 'critical'

class MaintenanceBase(BaseModel):
    title: str = Field(..., min_length=5, max_length=100)
    description: str = Field(..., min_length=20)
    equipment: str = Field(..., min_length=2)
    priority: MaintenancePriority

class MaintenanceCreate(MaintenanceBase):
    pass

class MaintenanceUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=5, max_length=100)
    description: Optional[str] = Field(None, min_length=20)
    equipment: Optional[str] = Field(None, min_length=2)
    priority: Optional[MaintenancePriority] = None
    status: Optional[MaintenanceStatus] = None
    assigned_to: Optional[str] = None

class MaintenanceResponse(MaintenanceBase):
    id: str
    status: MaintenanceStatus
    requested_by: str
    assigned_to: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True
```