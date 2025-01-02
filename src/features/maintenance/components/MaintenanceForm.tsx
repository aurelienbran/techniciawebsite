import React from 'react';
import { useForm } from 'react-hook-form';
import { MaintenanceFormData, MaintenancePriority } from '../../../types/maintenance';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { AlertTriangle } from 'lucide-react';

interface MaintenanceFormProps {
  onSubmit: (data: MaintenanceFormData) => void;
  isLoading?: boolean;
}

export const MaintenanceForm: React.FC<MaintenanceFormProps> = ({
  onSubmit,
  isLoading
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<MaintenanceFormData>();

  const priorities: { value: MaintenancePriority; label: string }[] = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'critical', label: 'Critical' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Title"
        error={errors.title?.message}
        {...register('title', { required: 'Title is required' })}
        placeholder="Brief description of the maintenance task"
      />

      <Input
        label="Equipment"
        error={errors.equipment?.message}
        {...register('equipment', { required: 'Equipment is required' })}
        placeholder="Equipment name or ID"
      />

      <Select
        label="Priority"
        error={errors.priority?.message}
        {...register('priority', { required: 'Priority is required' })}
        options={priorities}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Detailed description of the maintenance request"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        loading={isLoading}
        icon={AlertTriangle}
        className="w-full"
      >
        Submit Request
      </Button>
    </form>
  );
};