import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { DashboardPage } from '../pages/DashboardPage';
import { ChatPage } from '../pages/ChatPage';
import { DocumentManagement } from '../pages/DocumentManagement';
import { SettingsPage } from '../pages/SettingsPage';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { MainLayout } from '../layouts';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="documents" element={<DocumentManagement />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}