import React from "react";
import "./components.css";

const Activity = ({ activity }) => {
    const { user, activityType, title, createdAt } = activity;
    const movieTitle = typeof title === "object" && title !== null ? title.name || title.title || "Unknown Title" : title;
    const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
    });

    return (
        <li className="activity-item">
            <p>
                <strong className="activity-username">{user?.username || "Unknown User"}</strong> {" "}
                {activityType.includes("remove") ? "removed" : "added"} {" "}
                <strong className="activity-movie">{movieTitle}</strong> {" "}
                {activityType.includes("favorite") ? "to favorites" : "to watch later"} {" "}
                - <strong className="activity-date">{formattedDate}</strong>
            </p>
        </li>
    );
};

export default Activity;
