import { Link } from "react-router-dom";

function WelcomePage() {
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>Welcome to the ByteBite</h1>
            <p>Login or Sign up to continue.</p>
            <div>
                <Link to="/login" style={{ margin: "10px", padding: "10px 20px", background: "#007BFF", color: "#fff", textDecoration: "none", borderRadius: "5px" }}>Login</Link>
                <Link to="/signup" style={{ margin: "10px", padding: "10px 20px", background: "#28A745", color: "#fff", textDecoration: "none", borderRadius: "5px" }}>Signup</Link>
            </div>
        </div>
    );
}

export default WelcomePage;
