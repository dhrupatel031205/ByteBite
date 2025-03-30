import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Home from "./components/Home.jsx";
import Profile from "./components/ProfilePage.jsx";
import Model2 from "./components/model2.jsx";
import Navbar from "./components/Navbar.jsx";
import Model3 from "./components/Model3.jsx";
import Model1 from "./components/Model1.jsx";
import Model4 from "./components/model4.jsx";

function App() {
    return (
        <Router>
          {/* <Navbar></Navbar> */}
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/model2" element={<Model2 />} />
                <Route path="/model1" element={<Model1 />} />
                <Route path="/model4" element={<Model4 />} />
                <Route path="/model3" element={<Model3 />} />

            </Routes>
        </Router>
    );
}

export default App;
