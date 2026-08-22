import { useEffect, useState } from 'react';
import axios from 'axios';

function Attendance() {
  const [records, setRecords] = useState([]);
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const load = () => {
    axios.get('http://localhost:5001/api/attendance/me', { headers })
      .then((res) => setRecords(res.data));
  };

  useEffect(() => { load(); }, []);

  const checkIn = async () => {
    await axios.post('http://localhost:5001/api/attendance/checkin', {}, { headers });
    load();
  };
  const checkOut = async () => {
    await axios.post('http://localhost:5001/api/attendance/checkout', {}, { headers });
    load();
  };

  return (
    <div>
      <h2>My Attendance</h2>
      <button onClick={checkIn}>Check In</button>
      <button onClick={checkOut}>Check Out</button>
      <ul>
        {records.map((r) => (
          <li key={r._id}>{new Date(r.date).toDateString()} — {r.status}</li>
        ))}
      </ul>
    </div>
  );
}
export default Attendance;
