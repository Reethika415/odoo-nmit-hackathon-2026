import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5001/api/profile', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setProfile(res.data));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>{profile.name}</h2>
      <p>Email: {profile.email}</p>
      <p>Department: {profile.department}</p>
      <p>Phone: {profile.phone}</p>
    </div>
  );
}
export default Profile;
