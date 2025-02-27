import React, { useState } from "react";
import "./auth.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/general/Button";

const Register = ({ setIsLoggedIn, setUserUsername }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/auth/register", { username, password })
            .then((response) => {
                localStorage.setItem("accessToken", response.data.token);
                setUserUsername(username);
                setIsLoggedIn(true);
            })
            .catch((error) => console.error("Registration failed:", error));
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <label className="input-label">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                Username:
            </label>
            <div className="input-group">
                <input className="auth-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <label className="input-label">
                <FontAwesomeIcon icon={faKey} className="input-icon" />
                Password:
            </label>
            <div className="input-group">
                <input className="auth-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button
                label="Sign Up"
                icon={faKey}
                className="auth-button"
                onClick={handleSubmit}
            />
        </form>
    );
};

export default Register;
