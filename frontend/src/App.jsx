import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Properties from "./pages/Properties";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const payload = parseJwt(token);
            setName(
                payload?.[
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                ] || ""
            );
        } else {
            setName("");
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    };

    function parseJwt(token) {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    }

    return (
        <>
            {/* Bootstrap Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        RealEstatePortal
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Properties
                                </Link>
                            </li>
                            {token && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/favorites">
                                        Favorites
                                    </Link>
                                </li>
                            )}
                        </ul>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {!token && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}

                            {token && (
                                <>
                                    <li className="nav-item nav-link">Hello, {name}</li>
                                    <li className="nav-item">
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Routes */}
            <div className="container">
                <Routes>
                    <Route path="/" element={<Properties />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </>
    );
}
