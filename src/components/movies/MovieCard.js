import React, { useState, useEffect } from "react";
import "./movies.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faClock } from "@fortawesome/free-solid-svg-icons";

const MovieCard = ({ movie }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);
    useEffect(() => {
        axios.get("/api/titles/favorite/")
            .then((response) => {
                if (response.data.some(favMovie => favMovie.imdbId === movie.imdbId)) {
                    setIsFavorite(true);
                }
            });

        axios.get("/api/titles/watchlater/")
            .then((response) => {
                if (response.data.some(watchMovie => watchMovie.imdbId === movie.imdbId)) {
                    setIsWatchLater(true);
                }
            });
    }, [movie]);

    const handleClick = (type) => {
        const url = `/api/titles/${type}/${movie.imdbId}`;
        const toggleState = type === "favorite" ? setIsFavorite : setIsWatchLater;
        const stateValue = type === "favorite" ? isFavorite : isWatchLater;
        axios({
            method: stateValue ? "delete" : "post",
            url: url,
        })
            .then(() => toggleState(!stateValue))
            .catch((error) => console.error(`Error updating ${type}:`, error));
    };

    return (
        <li className="movie-card">
            <h3>{movie.title}</h3>
            <p>{movie.synopsis}</p>
            <div className="movie-icons">
                <FontAwesomeIcon icon={faHeart} className={isFavorite ? "active" : ""} onClick={() => handleClick("favorite")} />
                <FontAwesomeIcon icon={faClock} className={isWatchLater ? "active" : ""} onClick={() => handleClick("watchlater")} />
            </div>
            <ul>
                {movie.genres.map((genre, index) => (
                    <li key={index} className="tag">{genre}</li>
                ))}
            </ul>
        </li>
    );
};

export default MovieCard;
