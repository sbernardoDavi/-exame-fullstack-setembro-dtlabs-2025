// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from '../../pages/Login/loginPage';
import HomePage from '../../pages/Home/homePage';
import PrivateRoute from '../PrivateRoute/privateRoute';
import RegisterPage from '../Register/register';
import DevicesPage from '../../pages/Devices/devices';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/devices" element={
          <PrivateRoute>
            <DevicesPage />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
