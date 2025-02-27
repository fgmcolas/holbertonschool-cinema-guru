import React, { useState } from "react";
import "./auth.css";
import axios from "axios";
import Button from "../../components/general/Button";

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
    const [_switch, setSwitch] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = _switch ? "/api/auth/login" : "/api/auth/register";
        try {
            const response = await axios.post(endpoint, { username, password });

            if (response.data.accessToken) {
                localStorage.setItem("accessToken", response.data.accessToken);
                setUserUsername(username);
                setIsLoggedIn(true);
            } else {
                setErrorMessage("Authentication failed, no token received.");
            }
        } catch (error) {
            console.error("Authentication error:", error);
            setErrorMessage(
                error.response?.data?.message || "Authentication failed. Please try again."
            );
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-tabs">
                    <Button
                        label="Sign In"
                        className={_switch ? "active" : ""}
                        onClick={() => setSwitch(true)}
                    />
                    <Button
                        label="Sign Up"
                        className={!_switch ? "active" : ""}
                        onClick={() => setSwitch(false)}
                    />
                </div>
                <h2 className="auth-title">{_switch ? "Sign in" : "Sign up"} with your account</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <Button
                        label={_switch ? "Sign In" : "Sign Up"}
                        className="auth-button"
                        type="submit"
                    />
                </form>
            </div>
        </div>
    );
};

export default Authentication;
