export const MESSAGES = {
  ERROR: {
    AUTH: {
      INVALID_CREDENTIALS: 'Invalid email or password',
      REGISTRATION_FAILED: 'Registration failed. Please try again.',
      SESSION_EXPIRED: 'Your session has expired. Please log in again.',
    },
    DOCUMENT: {
      UPLOAD_FAILED: 'Failed to upload document. Please try again.',
      DELETE_FAILED: 'Failed to delete document.',
      INVALID_TYPE: 'Invalid file type. Please upload a supported document.',
      FILE_TOO_LARGE: 'File size exceeds the maximum limit of 10MB.',
    },
  },
  SUCCESS: {
    AUTH: {
      LOGIN: 'Successfully logged in',
      LOGOUT: 'Successfully logged out',
      REGISTER: 'Successfully registered',
    },
    DOCUMENT: {
      UPLOAD: 'Document uploaded successfully',
      DELETE: 'Document deleted successfully',
    },
  },
} as const;