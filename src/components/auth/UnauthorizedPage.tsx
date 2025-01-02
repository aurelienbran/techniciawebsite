import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Shield className="w-12 h-12 text-red-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Access Denied
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          You don't have permission to access this page
        </p>
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-500"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};