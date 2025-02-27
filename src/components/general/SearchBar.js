import React, { useState } from "react";
import "./general.css";

const SearchBar = ({ title, setTitle }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleInput = (event) => {
        setTitle(event.target.value);
    };

    return (
        <div className={`search-bar ${isFocused ? "focused" : ""}`}>
            <input
                type="text"
                placeholder="Search Movies"
                value={title}
                onChange={handleInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    );
};

export default SearchBar;
