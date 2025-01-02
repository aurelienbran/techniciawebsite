import { LoginCredentials, RegisterData, User } from '../../types/auth';
import { AppError } from '../../utils/errorUtils';

const API_URL = 'http://localhost:8001/auth';

export async function login(credentials: LoginCredentials): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new AppError(
        'Invalid credentials',
        'AUTH_ERROR',
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Authentication failed', 'AUTH_ERROR', 500);
  }
}

export async function register(data: RegisterData): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new AppError(
        'Registration failed',
        'AUTH_ERROR',
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Registration failed', 'AUTH_ERROR', 500);
  }
}

export async function logout(): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new AppError('Logout failed', 'AUTH_ERROR', response.status);
    }
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Logout failed', 'AUTH_ERROR', 500);
  }
}

export async function getCurrentUser(): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/me`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new AppError(
        'Failed to get user',
        'AUTH_ERROR',
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Failed to get user', 'AUTH_ERROR', 500);
  }
}