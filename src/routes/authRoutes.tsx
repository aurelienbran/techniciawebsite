import React from 'react';
import { Route } from 'react-router-dom';
import { LoginPage } from '../pages/auth/LoginPage';
import { UnauthorizedPage } from '../components/auth/UnauthorizedPage';

export const authRoutes = (
  <>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/unauthorized" element={<UnauthorizedPage />} />
  </>
);