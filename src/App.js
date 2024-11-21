import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeManagement from './components/EmployeeManagement';
import SuperAdminLogin from './admins/SuperAdminLogin';
import SuperAdminRegister from './admins/SuperAdminRegister';
import GeneralAdminLogin from './admins/GeneralAdminLogin';
import GeneralAdminRegister from './admins/GeneralAdminRegister';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        {/* Admin routes */}
        <Route path="/superadmin/login" element={<SuperAdminLogin />} />
        <Route path="/superadmin/register" element={<SuperAdminRegister />} />
        <Route path="/generaladmin/login" element={<GeneralAdminLogin />} />
        <Route path="/generaladmin/register" element={<GeneralAdminRegister />} />

        <Route path="/employee-management" element={<EmployeeManagement />} />

        <Route path="/" element={<SuperAdminLogin />} />
      </Routes>
    </div>
  );
};

export default App;
