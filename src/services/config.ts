const API_BASE = 'http://localhost:8001';

export const API_ENDPOINTS = {
  // Auth endpoints
  login: `${API_BASE}/auth/login`,
  register: `${API_BASE}/auth/register`,
  logout: `${API_BASE}/auth/logout`,
  me: `${API_BASE}/auth/me`,
  
  // Document endpoints
  documents: `${API_BASE}/documents`,
  documentSearch: `${API_BASE}/documents/search`,
  
  // Maintenance endpoints
  maintenance: `${API_BASE}/maintenance`,
  equipment: `${API_BASE}/equipment`,
  
  // Vector DB endpoints
  vectorSearch: `${API_BASE}/vector/search`,
  vectorIndex: `${API_BASE}/vector/index`,
} as const;