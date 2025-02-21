import React from "react";
import "./general.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ label, className, onClick, icon }) => {
    return (
        <button className={`button ${className}`} onClick={onClick}>
            {icon && <FontAwesomeIcon icon={icon} className="button-icon" />}
            {label}
        </button>
    );
};

export default Button;
