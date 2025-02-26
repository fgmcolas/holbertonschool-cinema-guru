import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navigation.css";
import Activity from "../Activity";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faStar, faClock } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
    const [selected, setSelected] = useState("home");
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();
    const setPage = (pageName) => {
        setSelected(pageName);
        navigate(`/${pageName}`);
    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        axios.get("http://localhost:8000/api/activity", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                setActivities(response.data);
            })
            .catch((error) => console.error("Failed to fetch activities:", error));
    }, []);

    return (
        <nav className="sidebar">
            <ul>
                <li className={selected === "home" ? "active" : ""} onClick={() => setPage("home")}>
                    <FontAwesomeIcon icon={faFolder} /> Library
                </li>
                <li className={selected === "favorites" ? "active" : ""} onClick={() => setPage("favorites")}>
                    <FontAwesomeIcon icon={faStar} /> Favorites
                </li>
                <li className={selected === "watchlater" ? "active" : ""} onClick={() => setPage("watchlater")}>
                    <FontAwesomeIcon icon={faClock} /> Watch Later
                </li>
            </ul>
        </nav>
    );
};

export default SideBar;
