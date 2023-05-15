import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Trip from "./pages/Trip.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
    return (
        <>
            <Router className="router">
                <Routes className="routes">
                    <Route path="/" element={<Landing className="app" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/trip" element={<Trip />} />
                </Routes>
            </Router>
        </>

    );
}

export default App;
