import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", formData);
            
            // Save token and user details in localStorage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            navigate("/dashbord");
        } catch (error) {
            setError(error.response.data.msg);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px", background: "#fff" }}>
            <h2 style={{ textAlign: "center" }}>Login</h2>
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={{ padding: "10px", margin: "5px 0", borderRadius: "5px", border: "1px solid #ccc" }} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={{ padding: "10px", margin: "5px 0", borderRadius: "5px", border: "1px solid #ccc" }} />
                <button type="submit" style={{ padding: "10px", background: "#007BFF", color: "#fff", borderRadius: "5px", border: "none", cursor: "pointer" }}>Login</button>
            </form>
            <p style={{ textAlign: "center", marginTop: "10px" }}>
                Don't have an account? <Link to="/signup" style={{ color: "#007BFF", textDecoration: "none" }}>Sign up here</Link>
            </p>
        </div>
    );
}

export default Login;
