import { useState } from 'react';
import axios from 'axios';

function ApplyLeave() {
  const [form, setForm] = useState({ leaveType: 'Paid', startDate: '', endDate: '', remarks: '' });
  const token = localStorage.getItem('token');

  const submit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/api/leave', form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Leave request submitted');
  };

  return (
    <form onSubmit={submit}>
      <h2>Apply for Leave</h2>
      <select onChange={(e) => setForm({ ...form, leaveType: e.target.value })}>
        <option value="Paid">Paid</option>
        <option value="Sick">Sick</option>
        <option value="Unpaid">Unpaid</option>
      </select>
      <input type="date" onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
      <input type="date" onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
      <textarea placeholder="Remarks" onChange={(e) => setForm({ ...form, remarks: e.target.value })} />
      <button type="submit">Submit</button>
    </form>
  );
}
export default ApplyLeave;