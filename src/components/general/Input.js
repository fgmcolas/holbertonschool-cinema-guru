import React from "react";
import "./general.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = ({ label, type = "text", className = "", value, setValue, icon, inputAttributes = {} }) => {
    const handleInput = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className={`input-container ${className || ""}`}>
            {label && (
                <label className="input-label">
                    {icon && <FontAwesomeIcon icon={icon} className="input-icon" />}
                    {label}
                </label>
            )}
            <input className="input-field" type={type} value={value} onChange={handleInput} {...inputAttributes} />
        </div>
    );
};

export default Input;
