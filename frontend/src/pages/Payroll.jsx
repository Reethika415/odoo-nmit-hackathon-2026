import { useEffect, useState } from 'react';
import axios from 'axios';

function Payroll() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5001/api/payroll/me', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;
  return (
    <div>
      <h2>My Payroll</h2>
      <p>Job Title: {data.jobTitle}</p>
      <p>Department: {data.department}</p>
      <p>Salary: {data.salary}</p>
    </div>
  );
}
export default Payroll;