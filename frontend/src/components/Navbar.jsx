import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")); // Get user details

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav style={navbarStyle}>
            {/* Left: Logo */}
            <h2 style={logoStyle} onClick={() => navigate("/dashbord")}>
                ByteBite
            </h2>

            {/* Center: AI Models Navigation */}
            <div>
                <Link to="/model1" style={linkStyle}>Model 1</Link>
                <Link to="/model2" style={linkStyle}>Model 2</Link>
                <Link to="/model3" style={linkStyle}>Model 3</Link>
                <Link to="/model4" style={linkStyle}>Model 4</Link>
            </div>

            {/* Right: Search, Notifications, Profile/Login */}
            <div style={rightMenuStyle}>
                <input
                    type="text"
                    placeholder="Search"
                    style={searchStyle}
                />
                <span style={iconStyle}>🔔</span>

                {user ? (
                    <>
                        <p
                            onClick={() => navigate("/profile")}
                            style={profileStyle}
                        >
                            {user.name}
                        </p>
                        <button onClick={handleLogout} style={logoutButtonStyle}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate("/login")} style={authButtonStyle}>
                            Login
                        </button>
                        <button onClick={() => navigate("/signup")} style={authButtonStyle}>
                            Signup
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

// ✅ Styles
const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 25px",
    background: "linear-gradient(90deg, #00C853, #00E676)",
    color: "#fff"
};

const logoStyle = {
    margin: 0,
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "22px"
};

const linkStyle = {
    margin: "0 12px",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.3s",
    cursor: "pointer"
};

// Add hover effect
linkStyle[":hover"] = { color: "#FFD700" };

const rightMenuStyle = {
    display: "flex",
    alignItems: "center"
};

const searchStyle = {
    padding: "6px",
    borderRadius: "5px",
    border: "none",
    marginRight: "10px"
};

const iconStyle = {
    marginRight: "15px",
    cursor: "pointer",
    fontSize: "20px"
};

const profileStyle = {
    cursor: "pointer",
    textDecoration: "underline",
    fontWeight: "bold",
    marginRight: "10px"
};

const authButtonStyle = {
    padding: "6px 12px",
    marginLeft: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    background: "#fff",
    color: "#00C853",
    borderRadius: "5px",
    transition: "background 0.3s"
};

// Hover effect for buttons
authButtonStyle[":hover"] = { background: "#ddd" };

const logoutButtonStyle = {
    ...authButtonStyle,
    background: "#FF3D00",
    color: "#fff"
};

export default Navbar;
