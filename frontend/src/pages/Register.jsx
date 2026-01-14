import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post("https://localhost:60872/api/auth/register", {
                email,
                password,
            });

            setMessage("Registration successful. Redirecting to login...");

            // Redirect to login page after short delay
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "80vh" }}
        >
            <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "400px" }}>
                <h2 className="mb-4 text-center">Register</h2>

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

                <button className="btn btn-success w-100" onClick={handleRegister}>
                    Register
                </button>

                <p className="text-center text-muted mt-3">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
}
