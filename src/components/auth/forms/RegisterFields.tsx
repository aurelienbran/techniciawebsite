import React from 'react';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { authValidation } from '../../../utils/validation/authValidation';
import { UseFormRegister } from 'react-hook-form';
import { RegisterData } from '../../../types/auth';

interface RegisterFieldsProps {
  register: UseFormRegister<RegisterData>;
  errors: Record<string, any>;
}

export const RegisterFields: React.FC<RegisterFieldsProps> = ({ register, errors }) => {
  return (
    <>
      <Input
        label="Name"
        error={errors.name?.message}
        {...register('name', authValidation.name)}
      />
      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email', authValidation.email)}
      />
      <Input
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register('password', authValidation.password)}
      />
      <Select
        label="Role"
        error={errors.role?.message}
        {...register('role', authValidation.role)}
        options={[
          { value: '', label: 'Select Role' },
          { value: 'technician', label: 'Technician' },
          { value: 'supervisor', label: 'Supervisor' },
        ]}
      />
      <Input
        label="Department"
        {...register('department')}
        helperText="Optional - Enter your department name"
      />
    </>
  );
};