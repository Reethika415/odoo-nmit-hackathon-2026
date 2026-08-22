import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

function Reports() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports/summary', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  const attendanceData = data.attendanceCounts.map((a) => ({ name: a._id, count: a.count }));
  const leaveData = data.leaveCounts.map((l) => ({ name: l._id, count: l.count }));

  return (
    <div>
      <h2>Attendance Summary</h2>
      <BarChart width={400} height={250} data={attendanceData}>
        <XAxis dataKey="name" /><YAxis /><Tooltip />
        <Bar dataKey="count" fill="#4f46e5" />
      </BarChart>

      <h2>Leave Summary</h2>
      <BarChart width={400} height={250} data={leaveData}>
        <XAxis dataKey="name" /><YAxis /><Tooltip />
        <Bar dataKey="count" fill="#16a34a" />
      </BarChart>
    </div>
  );
}

export default Reports;