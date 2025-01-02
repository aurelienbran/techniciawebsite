import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../../types/auth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { LogIn } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (data: LoginCredentials) => void;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <Button
        type="submit"
        disabled={isLoading}
        loading={isLoading}
        icon={LogIn}
        className="w-full"
      >
        Sign In
      </Button>
    </form>
  );
};