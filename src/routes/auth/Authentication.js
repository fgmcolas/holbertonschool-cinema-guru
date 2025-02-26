import React, { useState } from "react";
import "./auth.css";
import Login from "./Login";
import Register from "./Register";
import Button from "../../components/general/Button";

const Authentication = ({ setIsLoggedIn, setUserUsername }) => {
    const [_switch, setSwitch] = useState(true);

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
