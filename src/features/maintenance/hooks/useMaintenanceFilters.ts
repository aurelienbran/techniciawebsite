import { useState, useCallback, useMemo } from 'react';
import { MaintenanceRequest } from '../../../types/maintenance';
import { MaintenanceFilters } from '../components/MaintenanceFilters';

export function useMaintenanceFilters(requests: MaintenanceRequest[]) {
  const [filters, setFilters] = useState<MaintenanceFilters>({});

  const handleFilterChange = useCallback((newFilters: MaintenanceFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  const filteredRequests = useMemo(() => {
    return requests.filter(request => {
      if (filters.status && request.status !== filters.status) {
        return false;
      }
      if (filters.priority && request.priority !== filters.priority) {
        return false;
      }
      return true;
    });
  }, [requests, filters]);

  return {
    filters,
    filteredRequests,
    handleFilterChange,
  };
}