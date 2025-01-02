import React from 'react';
import { Input } from '../../ui/Input';
import { authValidation } from '../../../utils/validation/authValidation';
import { UseFormRegister } from 'react-hook-form';
import { LoginCredentials } from '../../../types/auth';

interface LoginFieldsProps {
  register: UseFormRegister<LoginCredentials>;
  errors: Record<string, any>;
}

export const LoginFields: React.FC<LoginFieldsProps> = ({ register, errors }) => {
  return (
    <>
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
    </>
  );
};