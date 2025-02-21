import React, { useState } from "react";
import "./auth.css";
import axios from "axios";
import Login from "./Login";
import Register from "./Register";

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
    const [_switch, setSwitch] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = _switch ? "/api/auth/login" : "/api/auth/register";

        try {
            const response = await axios.post(url, { username, password });
            const { accessToken } = response.data;
            localStorage.setItem("accessToken", accessToken);
            setIsLoggedIn(true);
            setUserUsername(username);
            console.log("Authentication successful");
        } catch (error) {
            console.error("Authentication failed:", error.response?.data || error.message);
            alert("Échec de l'authentification. Vérifiez vos informations.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-header">
                <button className={_switch ? "active" : ""} onClick={() => setSwitch(true)}>Sign In</button>
                <button className={!_switch ? "active" : ""} onClick={() => setSwitch(false)}>Sign Up</button>
            </div>
            <form className="auth-form" onSubmit={handleSubmit}>
                {_switch ? (
                    <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
                ) : (
                    <Register username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
                )}
                <button type="submit">{_switch ? "Login" : "Register"}</button>
            </form>
        </div>
    );
};

export default Authentication;
