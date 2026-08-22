import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import Attendance from './pages/Attendance';
import ApplyLeave from './pages/ApplyLeave';
import Payroll from './pages/Payroll';
 
function App() {
 const role = localStorage.getItem('role');
 return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/dashboard" element={role === 'employee' ? <EmployeeDashboard /> : <Navigate to="/" />} />
       <Route path="/admin-dashboard" element={role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
       <Route path="/profile" element={<Profile />} />
       <Route path="/attendance" element={<Attendance />} />
       <Route path="/apply-leave" element={<ApplyLeave />} />
       <Route path="/payroll" element={<Payroll />} />
     </Routes>
   </BrowserRouter>
 );
}
export default App;
