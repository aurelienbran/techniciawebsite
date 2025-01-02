export interface User {
  id: string;
  email: string;
  name: string;
  role: 'technician' | 'supervisor' | 'admin';
  department?: string;
  certifications?: string[];
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: User['role'];
  department?: string;
}