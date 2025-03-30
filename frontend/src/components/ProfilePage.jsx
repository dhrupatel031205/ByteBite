import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/api/user/update",
        user,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.setItem("user", JSON.stringify(response.data.user)); // Update localStorage
      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      setMessage("Error updating profile!");
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>Profile</h1>
        {message && <p style={{ color: "green" }}>{message}</p>}

        <div
          style={{
            maxWidth: "400px",
            margin: "auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            background: "#fff",
          }}
        >
          <label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            disabled={!isEditing}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <label style={{ display: "block", marginBottom: "5px" }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled={!isEditing}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          {isEditing ? (
            <button
              onClick={handleUpdate}
              style={{
                padding: "10px",
                background: "#28A745",
                color: "#fff",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: "10px",
                background: "#007BFF",
                color: "#fff",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
