import React, { useState } from "react";
import "./auth.css";
import axios from "axios";
import Login from "./Login";
import Register from "./Register";
import Button from "../../components/general/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
    const [_switch, setSwitch] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const endpoint = _switch ? "/api/auth/login" : "/api/auth/register";
            const response = await axios.post(`http://localhost:8000${endpoint}`, { username, password });

            if (response.data.accessToken) {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("username", username);
                setUserUsername(username);
                setIsLoggedIn(true);
            } else {
                setErrorMessage("Invalid response from server.");
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Authentication failed.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-tabs">
                    <Button label="Sign In" className={_switch ? "active" : ""} onClick={() => setSwitch(true)} />
                    <Button label="Sign Up" className={!_switch ? "active" : ""} onClick={() => setSwitch(false)} />
                </div>
                <h2 className="auth-title">{_switch ? "Sign in" : "Sign up"} with your account</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    {_switch ? (
                        <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
                    ) : (
                        <Register username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
                    )}
                    <div className="error-container">
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                    <button className="auth-button" type="submit">
                        <FontAwesomeIcon icon={faKey} className="fa-icon" />
                        {_switch ? "Sign In" : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Authentication;
