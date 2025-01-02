import { LoginCredentials, RegisterData, User } from '../../types/auth';
import { AppError } from '../../utils/errorUtils';
import { API_ENDPOINTS } from '../config';

export async function loginRequest(credentials: LoginCredentials): Promise<User> {
  const response = await fetch(API_ENDPOINTS.login, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new AppError('Invalid credentials', 'AUTH_ERROR', response.status);
  }

  return response.json();
}

export async function registerRequest(data: RegisterData): Promise<User> {
  const response = await fetch(API_ENDPOINTS.register, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new AppError('Registration failed', 'AUTH_ERROR', response.status);
  }

  return response.json();
}

export async function logoutRequest(): Promise<void> {
  const response = await fetch(API_ENDPOINTS.logout, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new AppError('Logout failed', 'AUTH_ERROR', response.status);
  }
}

export async function getCurrentUserRequest(): Promise<User> {
  const response = await fetch(API_ENDPOINTS.me, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new AppError('Failed to get user', 'AUTH_ERROR', response.status);
  }

  return response.json();
}