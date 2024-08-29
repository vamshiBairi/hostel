import React from 'react';
import { Route,Routes} from 'react-router-dom';
import './index.css';
import LoginPage from './Landing/Login';
import AdminLogin from './Landing/adminlogin';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path="/admin/*" element={<AdminDashboard />} /> 
        <Route path="/admin-login" element={<AdminLogin/>} /> 
        <Route path="/student-dashboard/*" element={<StudentDashboard />}/>
      </Routes>
    </div>
  );
}

export default App;
