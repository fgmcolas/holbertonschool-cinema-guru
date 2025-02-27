import React from "react";
import "./auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";

const Register = ({ username, password, setUsername, setPassword }) => {
    return (
        <>
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
        </>
    );
};

export default Register;
