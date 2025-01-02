import { supabase } from '../../lib/supabase/client';
import { MaintenanceFormData } from '../../types/maintenance';
import type { Database } from '../../lib/supabase/types';

type MaintenanceRequest = Database['public']['Tables']['maintenance_requests']['Row'];

export async function createMaintenanceRequest(data: MaintenanceFormData) {
  const { data: request, error } = await supabase
    .from('maintenance_requests')
    .insert({
      title: data.title,
      description: data.description,
      equipment: data.equipment,
      priority: data.priority,
      status: 'pending',
      requested_by: (await supabase.auth.getUser()).data.user?.id,
    })
    .select()
    .single();

  if (error) throw error;
  return request;
}

export async function getMaintenanceRequests() {
  const { data: requests, error } = await supabase
    .from('maintenance_requests')
    .select(`
      *,
      requested_by:users!maintenance_requests_requested_by_fkey(name),
      assigned_to:users!maintenance_requests_assigned_to_fkey(name)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return requests;
}

export async function updateMaintenanceRequest(
  id: string,
  updates: Partial<MaintenanceRequest>
) {
  const { data: request, error } = await supabase
    .from('maintenance_requests')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return request;
}