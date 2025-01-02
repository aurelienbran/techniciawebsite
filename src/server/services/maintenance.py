```python
from typing import List, Optional
from datetime import datetime
from models.maintenance import (
    MaintenanceRequest,
    MaintenanceCreate,
    MaintenanceUpdate
)
from models.user import User
from utils.errors import NotFoundError, PermissionError
from database import supabase

class MaintenanceService:
    """Service for handling maintenance requests."""
    
    async def create_request(
        self,
        request: MaintenanceCreate,
        user_id: str
    ) -> MaintenanceRequest:
        """Create a new maintenance request."""
        try:
            data = {
                **request.dict(),
                'requested_by': user_id,
                'status': 'pending',
                'created_at': datetime.now().isoformat(),
                'updated_at': datetime.now().isoformat()
            }
            
            result = await supabase.table('maintenance_requests').insert(data).execute()
            return MaintenanceRequest(**result.data[0])
        except Exception as e:
            raise Exception(f"Failed to create maintenance request: {str(e)}")

    async def get_requests(self, user: User) -> List[MaintenanceRequest]:
        """Get maintenance requests based on user role."""
        try:
            query = supabase.table('maintenance_requests')
            
            # Filter based on user role
            if user.role == 'technician':
                query = query.eq('assigned_to', user.id)
            elif user.role == 'supervisor':
                query = query.eq('department', user.department)
                
            result = await query.execute()
            return [MaintenanceRequest(**item) for item in result.data]
        except Exception as e:
            raise Exception(f"Failed to fetch maintenance requests: {str(e)}")

    async def get_request(self, request_id: str) -> Optional[MaintenanceRequest]:
        """Get a specific maintenance request."""
        try:
            result = await supabase.table('maintenance_requests')\
                .select('*')\
                .eq('id', request_id)\
                .single()\
                .execute()
                
            if not result.data:
                return None
                
            return MaintenanceRequest(**result.data)
        except Exception as e:
            raise Exception(f"Failed to fetch maintenance request: {str(e)}")

    async def update_request(
        self,
        request_id: str,
        updates: MaintenanceUpdate
    ) -> Optional[MaintenanceRequest]:
        """Update a maintenance request."""
        try:
            # Get current request
            current = await self.get_request(request_id)
            if not current:
                raise NotFoundError("Maintenance request not found")
            
            # Update request
            data = {
                **updates.dict(exclude_unset=True),
                'updated_at': datetime.now().isoformat()
            }
            
            # Add completed_at if status is being set to completed
            if updates.status == 'completed':
                data['completed_at'] = datetime.now().isoformat()
            
            result = await supabase.table('maintenance_requests')\
                .update(data)\
                .eq('id', request_id)\
                .execute()
                
            return MaintenanceRequest(**result.data[0])
        except Exception as e:
            raise Exception(f"Failed to update maintenance request: {str(e)}")
```