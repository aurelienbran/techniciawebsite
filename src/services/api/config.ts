export const API_CONFIG = {
  baseUrl: 'http://localhost:8001',
  endpoints: {
    chat: '/chat',
    documents: '/documents',
    vectorSearch: '/vector/search',
    maintenance: '/maintenance',
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      logout: '/auth/logout',
    },
  },
} as const;