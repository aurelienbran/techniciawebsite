import React from 'react';
import { useForm } from 'react-hook-form';
import { RegisterData } from '../../types/auth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { UserPlus } from 'lucide-react';

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => void;
  isLoading?: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Name"
        error={errors.name?.message}
        {...register('name', {
          required: 'Name is required',
          minLength: {
            value: 2,
            message: 'Name must be at least 2 characters',
          },
        })}
      />

      <Input
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
          },
        })}
      />

      <Input
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
      />

      <Select
        label="Role"
        error={errors.role?.message}
        {...register('role', { required: 'Role is required' })}
        options={[
          { value: '', label: 'Select Role' },
          { value: 'technician', label: 'Technician' },
          { value: 'supervisor', label: 'Supervisor' },
          { value: 'admin', label: 'Administrator' },
        ]}
      />

      <Input
        label="Department"
        {...register('department')}
        helperText="Optional - Enter your department name"
      />

      <Button
        type="submit"
        disabled={isLoading}
        loading={isLoading}
        icon={UserPlus}
        className="w-full"
      >
        Create Account
      </Button>
    </form>
  );
};