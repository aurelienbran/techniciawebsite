import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ApiProvider } from './contexts/ApiContext';
import { AppRoutes } from './routes';
import { ToastContainer } from './components/ui/ToastContainer';

function App() {
  return (
    <AuthProvider>
      <ApiProvider>
        <AppRoutes />
        <ToastContainer />
      </ApiProvider>
    </AuthProvider>
  );
}

export default App;