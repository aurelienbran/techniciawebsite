import { MaintenanceRequest } from '../../../types/maintenance';

export function sortMaintenanceRequests(
  requests: MaintenanceRequest[],
  sortBy: keyof MaintenanceRequest = 'createdAt',
  order: 'asc' | 'desc' = 'desc'
): MaintenanceRequest[] {
  return [...requests].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (order === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    }
    return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
  });
}

export function groupMaintenanceRequestsByStatus(
  requests: MaintenanceRequest[]
): Record<MaintenanceRequest['status'], MaintenanceRequest[]> {
  return requests.reduce((acc, request) => {
    if (!acc[request.status]) {
      acc[request.status] = [];
    }
    acc[request.status].push(request);
    return acc;
  }, {} as Record<MaintenanceRequest['status'], MaintenanceRequest[]>);
}