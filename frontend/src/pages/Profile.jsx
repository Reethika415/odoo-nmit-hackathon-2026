import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    phone: "",
    address: "",
    profilePicture: "",
  });

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const loadProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/profile",
        { headers }
      );

      setProfile(response.data);

      setForm({
        phone: response.data.phone || "",
        address: response.data.address || "",
        profilePicture: response.data.profilePicture || "",
      });
    } catch (error) {
      console.error("Failed to load profile:", error);
      setMessage(
        error.response?.data?.message || "Unable to load profile"
      );
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/profile",
        form,
        { headers }
      );

      setProfile(response.data);
      setEditing(false);
      setMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      setMessage(
        error.response?.data?.message || "Unable to update profile"
      );
    }
  };

  if (!profile) {
    return <p>{message || "Loading profile..."}</p>;
  }

  return (
    <div>
      <h2>My Profile</h2>

      {profile.profilePicture && (
        <img
          src={profile.profilePicture}
          alt="Profile"
          width="100"
          height="100"
        />
      )}

      <p>
        <strong>Name:</strong> {profile.name || "-"}
      </p>

      <p>
        <strong>Employee ID:</strong> {profile.employeeId || "-"}
      </p>

      <p>
        <strong>Email:</strong> {profile.email || "-"}
      </p>

      <p>
        <strong>Department:</strong> {profile.department || "-"}
      </p>

      {editing ? (
        <div>
          <div>
            <label>Phone: </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Address: </label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Profile Picture URL: </label>
            <input
              name="profilePicture"
              value={form.profilePicture}
              onChange={handleChange}
            />
          </div>

          <button onClick={handleSave}>
            Save Changes
          </button>

          <button onClick={() => setEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Phone:</strong> {profile.phone || "-"}
          </p>

          <p>
            <strong>Address:</strong> {profile.address || "-"}
          </p>

          <button onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default Profile;
