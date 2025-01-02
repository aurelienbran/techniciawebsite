import { AppError } from '../../utils/errorUtils';
import { supabase } from '../../lib/supabase/client';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

async function getAuthHeaders() {
  const session = await supabase.auth.getSession();
  return {
    'Authorization': `Bearer ${session.data.session?.access_token}`,
    'Content-Type': 'application/json',
  };
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new AppError(
        await response.text(),
        'API_ERROR',
        response.status
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      'Failed to communicate with the server',
      'API_ERROR',
      500
    );
  }
}