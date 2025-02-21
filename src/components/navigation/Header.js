import React from "react";
import "./navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Header = ({ userUsername, setIsLoggedIn }) => {
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
    };

    return (
        <nav className="header">
            <img src="https://picsum.photos/100/100" alt="User Avatar" />
            <p>Welcome, {userUsername}!</p>
            <span onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </span>
        </nav>
    );
};

export default Header;
