import React, { useState } from "react";
import "./general.css";

const SearchBar = ({ title, setTitle, placeholder = "Search Movies" }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleInput = (event) => {
        setTitle(event.target.value);
    };

    return (
        <div className={`search-bar ${isFocused ? "focused" : ""}`}>
            <input
                type="text"
                className="search-input"
                placeholder={placeholder}
                value={title}
                onChange={handleInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    );
};

export default SearchBar;
