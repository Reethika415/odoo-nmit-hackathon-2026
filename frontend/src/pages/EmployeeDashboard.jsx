import { Link } from 'react-router-dom';

function EmployeeDashboard() {
  return (
    <div>
      <h2>Employee Dashboard</h2>
      <ul>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/attendance">Attendance</Link></li>
        <li><Link to="/apply-leave">Leave Requests</Link></li>
        <li><Link to="/payroll">Payroll</Link></li>
      </ul>
    </div>
  );
}
export default EmployeeDashboard;
