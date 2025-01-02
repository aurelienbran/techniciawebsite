import { useState, useCallback } from 'react';
import { MaintenanceRequest, MaintenanceFormData } from '../types/maintenance';

export function useMaintenanceRequests() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRequest = useCallback(async (data: MaintenanceFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const newRequest: MaintenanceRequest = {
        id: crypto.randomUUID(),
        ...data,
        status: 'pending',
        requestedBy: 'current-user', // Replace with actual user ID
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setRequests(prev => [...prev, newRequest]);
      return newRequest;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create request');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateRequest = useCallback(async (
    id: string,
    updates: Partial<MaintenanceRequest>
  ) => {
    setRequests(prev =>
      prev.map(request =>
        request.id === id
          ? { ...request, ...updates, updatedAt: new Date() }
          : request
      )
    );
  }, []);

  return {
    requests,
    isLoading,
    error,
    createRequest,
    updateRequest,
  };
}