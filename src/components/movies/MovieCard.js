import React, { useState, useEffect } from "react";
import "./movies.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faClock } from "@fortawesome/free-solid-svg-icons";

const MovieCard = ({ movie, index }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        axios.get("http://localhost:8000/api/titles/favorite/", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                if (response.data.some(favMovie => favMovie.imdbId === movie.imdbId)) {
                    setIsFavorite(true);
                }
            })
            .catch((error) => console.error("Error fetching favorites:", error));
        axios.get("http://localhost:8000/api/titles/watchlater/", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                if (response.data.some(watchMovie => watchMovie.imdbId === movie.imdbId)) {
                    setIsWatchLater(true);
                }
            })
            .catch((error) => console.error("Error fetching watch later:", error));
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
        <li className="movie-card" key={`${movie.imdbId}-${index}`}>
            <h3>{movie.title}</h3>
            <p>{movie.synopsis}</p>
            <div className="movie-icons">
                <FontAwesomeIcon icon={faHeart} className={isFavorite ? "active" : ""} onClick={() => handleClick("favorite")} />
                <FontAwesomeIcon icon={faClock} className={isWatchLater ? "active" : ""} onClick={() => handleClick("watchlater")} />
            </div>
            <ul>
                {movie.genres.map((genre, genreIndex) => (
                    <li key={`${movie.imdbId}-${genreIndex}`} className="tag">{genre}</li>
                ))}
            </ul>
        </li>
    );
};

export default MovieCard;
