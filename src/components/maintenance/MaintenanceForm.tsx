import React from 'react';
import { useForm } from 'react-hook-form';
import { MaintenanceFormData, MaintenancePriority } from '../../types/maintenance';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { maintenanceValidation } from '../../utils/validation/maintenanceValidation';

interface MaintenanceFormProps {
  onSubmit: (data: MaintenanceFormData) => void;
  initialData?: Partial<MaintenanceFormData>;
  isLoading?: boolean;
}

export const MaintenanceForm: React.FC<MaintenanceFormProps> = ({
  onSubmit,
  initialData,
  isLoading,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<MaintenanceFormData>({
    defaultValues: initialData,
  });

  const priorities: { value: MaintenancePriority; label: string; icon: string }[] = [
    { value: 'low', label: 'Low', icon: '🟢' },
    { value: 'medium', label: 'Medium', icon: '🟡' },
    { value: 'high', label: 'High', icon: '🟠' },
    { value: 'critical', label: 'Critical', icon: '🔴' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          {...register('title', maintenanceValidation.title)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Brief description of the issue"
          disabled={isLoading}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Equipment</label>
        <input
          type="text"
          {...register('equipment', maintenanceValidation.equipment)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Equipment name or ID"
          disabled={isLoading}
        />
        {errors.equipment && (
          <p className="mt-1 text-sm text-red-600">{errors.equipment.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Priority</label>
        <select
          {...register('priority', maintenanceValidation.priority)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          disabled={isLoading}
        >
          <option value="">Select priority</option>
          {priorities.map(({ value, label, icon }) => (
            <option key={value} value={value}>
              {icon} {label}
            </option>
          ))}
        </select>
        {errors.priority && (
          <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register('description', maintenanceValidation.description)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Detailed description of the maintenance request"
          disabled={isLoading}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <AlertTriangle className="w-5 h-5 mr-2" />
            Submit Maintenance Request
          </>
        )}
      </button>
    </form>
  );
};