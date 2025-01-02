import { useState, useCallback } from 'react';
import { MaintenanceRequest, MaintenanceFormData } from '../../../types/maintenance';
import * as maintenanceService from '../../../services/supabase/maintenance';
import { useToast } from '../../../hooks/useToast';

export function useMaintenanceRequests() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { show } = useToast();

  const fetchRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await maintenanceService.getMaintenanceRequests();
      setRequests(data);
    } catch (error) {
      show(
        error instanceof Error ? error.message : 'Failed to fetch requests',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  }, [show]);

  const createRequest = useCallback(async (data: MaintenanceFormData) => {
    try {
      const newRequest = await maintenanceService.createMaintenanceRequest(data);
      setRequests(prev => [...prev, newRequest]);
      show('Maintenance request created successfully', 'success');
      return newRequest;
    } catch (error) {
      show(
        error instanceof Error ? error.message : 'Failed to create request',
        'error'
      );
      throw error;
    }
  }, [show]);

  return {
    requests,
    isLoading,
    fetchRequests,
    createRequest,
  };
}