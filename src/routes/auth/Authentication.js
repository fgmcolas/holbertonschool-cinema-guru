import React, { useState } from "react";
import "./auth.css";
import Login from "./Login";
import Register from "./Register";

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
    const [_switch, setSwitch] = useState(true);

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-tabs">
                    <button className={_switch ? "active" : ""} onClick={() => setSwitch(true)}>Sign In</button>
                    <button className={!_switch ? "active" : ""} onClick={() => setSwitch(false)}>Sign Up</button>
                </div>
                <h2 className="auth-title">Sign in with your account</h2>
                {_switch ? (
                    <Login setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />
                ) : (
                    <Register setIsLoggedIn={setIsLoggedIn} setUserUsername={setUserUsername} />
                )}
            </div>
        </div>
    );
};

export default Authentication;
