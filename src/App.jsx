import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import { LeadProvider } from './context/LeadContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LeadProvider>
          <ThemeProvider>
            <AppRoutes />
          </ThemeProvider>
        </LeadProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;