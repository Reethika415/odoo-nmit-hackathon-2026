import { useEffect, useState } from "react";
import axios from "axios";

function Attendance() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const loadAttendance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/attendance/me",
        { headers }
      );

      setRecords(response.data);
    } catch (error) {
      console.error("Failed to load attendance:", error);
      setMessage(
        error.response?.data?.message || "Unable to load attendance"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const handleCheckIn = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/attendance/checkin",
        {},
        { headers }
      );

      setMessage("Checked in successfully!");
      loadAttendance();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Check-in failed"
      );
    }
  };

  const handleCheckOut = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/attendance/checkout",
        {},
        { headers }
      );

      setMessage("Checked out successfully!");
      loadAttendance();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Check-out failed"
      );
    }
  };

  if (loading) {
    return <p>Loading attendance...</p>;
  }

  return (
    <div>
      <h2>My Attendance</h2>

      <button onClick={handleCheckIn}>
        Check In
      </button>

      <button onClick={handleCheckOut}>
        Check Out
      </button>

      {message && <p>{message}</p>}

      <h3>Attendance Records</h3>

      {records.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Check In</th>
              <th>Check Out</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record._id}>
                <td>
                  {new Date(record.date).toLocaleDateString()}
                </td>

                <td>{record.status}</td>

                <td>
                  {record.checkIn
                    ? new Date(record.checkIn).toLocaleTimeString()
                    : "-"}
                </td>

                <td>
                  {record.checkOut
                    ? new Date(record.checkOut).toLocaleTimeString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Attendance;
