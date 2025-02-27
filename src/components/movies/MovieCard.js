import React, { useState, useEffect } from "react";
import "./movies.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faClock } from "@fortawesome/free-solid-svg-icons";

const MovieCard = ({ movie }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        axios.get("http://localhost:8000/api/titles/favorite/", {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            if (response.data.some(favMovie => favMovie.imdbId === movie.imdbId)) {
                setIsFavorite(true);
            }
        });

        axios.get("http://localhost:8000/api/titles/watchlater/", {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            if (response.data.some(watchMovie => watchMovie.imdbId === movie.imdbId)) {
                setIsWatchLater(true);
            }
        });
    }, [movie]);

    const handleClick = (type) => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const url = `http://localhost:8000/api/titles/${type}/${movie.imdbId}`;
        const toggleState = type === "favorite" ? setIsFavorite : setIsWatchLater;
        const stateValue = type === "favorite" ? isFavorite : isWatchLater;

        axios({
            method: stateValue ? "delete" : "post",
            url: url,
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => toggleState(!stateValue))
            .catch((error) => console.error(`Error updating ${type}:`, error));
    };

    return (
        <div className="movie-card">
            <div className="movie-image">
                <img src={movie.imageUrl || "https://via.placeholder.com/300x450"} alt={movie.title} />
                <div className="movie-icons">
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={`icon ${isFavorite ? "active" : ""}`}
                        onClick={() => handleClick("favorite")}
                    />
                    <FontAwesomeIcon
                        icon={faClock}
                        className={`icon ${isWatchLater ? "active" : ""}`}
                        onClick={() => handleClick("watchlater")}
                    />
                </div>
            </div>
            <div className="movie-details">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-synopsis">{movie.synopsis}</p>
                <div className="movie-genres">
                    {movie.genres.map((genre, index) => (
                        <span key={index} className="genre-tag">{genre}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
