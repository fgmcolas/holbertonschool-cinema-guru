import React from "react";
import "./components.css";

const Activity = ({ activity }) => {
    return (
        <li className="activity-item">
            <p>{activity}</p>
        </li>
    );
};

export default Activity;
