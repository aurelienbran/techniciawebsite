import React from 'react';
import { Route } from 'react-router-dom';
import { DocumentManagement } from '../pages/admin/DocumentManagement';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { ROLES } from '../utils/roles';

export const adminRoutes = (
  <Route path="admin">
    <Route
      path="documents"
      element={
        <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
          <DocumentManagement />
        </ProtectedRoute>
      }
    />
  </Route>
);