import React from 'react';
import { useAuth } from '../hooks/useAuth';

export function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h2>
          <dl className="grid grid-cols-1 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{user?.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900 capitalize">{user?.role}</dd>
            </div>
            {user?.department && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Department</dt>
                <dd className="mt-1 text-sm text-gray-900">{user.department}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}