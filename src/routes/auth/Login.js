import React, { useState } from "react";
import "./auth.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/general/Button";

const Login = ({ username, password, setUsername, setPassword, setIsLoggedIn, setUserUsername }) => {
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/auth/login", { username, password });

            if (response.data.accessToken) {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("username", username);
                setUserUsername(username);
                setIsLoggedIn(true);
            } else {
                setErrorMessage("Invalid login response, missing token.");
            }
        } catch (error) {
            console.error("Login failed:", error);
            setErrorMessage("Incorrect username or password.");
        }
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <label className="input-label">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                Username:
            </label>
            <div className="input-group">
                <input
                    className="auth-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <label className="input-label">
                <FontAwesomeIcon icon={faKey} className="input-icon" />
                Password:
            </label>
            <div className="input-group">
                <input
                    className="auth-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Button label="Sign In" className="auth-button" type="submit" />
        </form>
    );
};

export default Login;
