import React from "react";
import "./general.css";

const SelectInput = ({ label, options = [], className = "", value, setValue }) => {
    const handleSelect = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className={`select-container ${className}`}>
            {label && <label className="select-label">{label}</label>}
            <select className={`select-input ${className}`} value={value} onChange={handleSelect}>
                {options.length > 0 ? (
                    options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))
                ) : (
                    <option value="" disabled>No options available</option>
                )}
            </select>
        </div>
    );
};

export default SelectInput;
