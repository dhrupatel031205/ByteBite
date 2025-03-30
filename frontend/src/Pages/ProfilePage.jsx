import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="profile-page" style={{ padding: "20px" }}>
        {user ? (
          <div>
            <img
              src={user.profilePic}
              alt={user.fullName}
              style={{ width: "150px", borderRadius: "50%" }}
            />
            <h1>{user.fullName}</h1>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </>
  );
}
