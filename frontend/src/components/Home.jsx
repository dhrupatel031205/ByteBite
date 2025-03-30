import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (!token || !userData) {
            navigate("/login");
        } else {
            setUser(JSON.parse(userData));
        }
    }, [navigate]);

    return (
        <div>
            <Navbar></Navbar>
            <div style={{ textAlign: "center", padding: "50px" }}>
                <h1>Welcome to the Home Page</h1>
                {user ? (
                    <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "5px", background: "#fff", display: "inline-block" }}>
                        <h2>Hello, {user.name} 👋</h2>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                ) : (
                    <p>Loading user details...</p>
                )}
            </div>
        </div>
    );
}

export default Home;
