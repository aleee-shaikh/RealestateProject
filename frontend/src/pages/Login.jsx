import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("https://localhost:60872/api/auth/login", {
                email,
                password,
            });

            const token = res.data.token || res.data; // depending on backend
            localStorage.setItem("token", token);

            setMessage("Login successful!");

            // Redirect to Properties page
            navigate("/");
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "400px" }}>
                <h2 className="mb-4 text-center">Login</h2>

                {message && <div className="alert alert-info">{message}</div>}

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="btn btn-primary w-100" onClick={handleLogin}>
                    Login
                </button>

                <p className="text-center text-muted mt-3">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
}
