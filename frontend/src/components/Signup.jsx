import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/signup", formData);
            navigate("/login");
        } catch (error) {
            setError(error.response.data.msg);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px", background: "#fff" }}>
            <h2 style={{ textAlign: "center" }}>Signup</h2>
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required style={{ padding: "10px", margin: "5px 0", borderRadius: "5px", border: "1px solid #ccc" }} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={{ padding: "10px", margin: "5px 0", borderRadius: "5px", border: "1px solid #ccc" }} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={{ padding: "10px", margin: "5px 0", borderRadius: "5px", border: "1px solid #ccc" }} />
                <button type="submit" style={{ padding: "10px", background: "#28A745", color: "#fff", borderRadius: "5px", border: "none", cursor: "pointer" }}>Signup</button>
            </form>
            <p style={{ textAlign: "center", marginTop: "10px" }}>
                Already have an account? <Link to="/login" style={{ color: "#007BFF", textDecoration: "none" }}>Login here</Link>
            </p>
        </div>
    );
}

export default Signup;
