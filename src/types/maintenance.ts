export type MaintenanceStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';
export type MaintenancePriority = 'low' | 'medium' | 'high' | 'critical';

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  equipment: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  requestedBy: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  relatedDocuments?: string[];
}

export interface MaintenanceFormData {
  title: string;
  description: string;
  equipment: string;
  priority: MaintenancePriority;
}