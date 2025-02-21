import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navigation.css";
import Activity from "../Activity";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faHeart, faClock, faBars } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
    const [selected, setSelected] = useState("home");
    const [small, setSmall] = useState(true);
    const [activities, setActivities] = useState([]);
    const [showActivities, setShowActivities] = useState(false);
    const navigate = useNavigate();
    const setPage = (pageName) => {
        setSelected(pageName);
        const routes = {
            home: "/home",
            favorites: "/favorites",
            watchlater: "/watchlater",
        };
        navigate(routes[pageName]);
    };

    useEffect(() => {
        axios.get("/api/activity")
            .then((response) => {
                setActivities(response.data);
            })
            .catch((error) => console.error("Failed to fetch activities:", error));
    }, []);

    return (
        <nav className={`sidebar ${small ? "" : "expanded"}`}>
            <div className="toggle-btn" onClick={() => setSmall(!small)}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <ul>
                <li className={selected === "home" ? "active" : ""} onClick={() => setPage("home")}>
                    <FontAwesomeIcon icon={faHome} /> {small ? "" : "Home"}
                </li>
                <li className={selected === "favorites" ? "active" : ""} onClick={() => setPage("favorites")}>
                    <FontAwesomeIcon icon={faHeart} /> {small ? "" : "Favorites"}
                </li>
                <li className={selected === "watchlater" ? "active" : ""} onClick={() => setPage("watchlater")}>
                    <FontAwesomeIcon icon={faClock} /> {small ? "" : "Watch Later"}
                </li>
            </ul>
            <div className="activities">
                <h4 onClick={() => setShowActivities(!showActivities)}>
                    {small ? "🔄" : "Recent Activities"}
                </h4>
                {showActivities && (
                    <ul>
                        {activities.slice(0, 10).map((activity, index) => (
                            <Activity key={index} activity={activity} />
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default SideBar;
