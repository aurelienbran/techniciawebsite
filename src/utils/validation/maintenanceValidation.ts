export const maintenanceValidation = {
  title: {
    required: 'Title is required',
    minLength: {
      value: 5,
      message: 'Title must be at least 5 characters',
    },
    maxLength: {
      value: 100,
      message: 'Title must not exceed 100 characters',
    },
  },
  equipment: {
    required: 'Equipment is required',
    minLength: {
      value: 2,
      message: 'Equipment must be at least 2 characters',
    },
  },
  description: {
    required: 'Description is required',
    minLength: {
      value: 20,
      message: 'Description must be at least 20 characters',
    },
    maxLength: {
      value: 1000,
      message: 'Description must not exceed 1000 characters',
    },
  },
  priority: {
    required: 'Priority is required',
  },
};