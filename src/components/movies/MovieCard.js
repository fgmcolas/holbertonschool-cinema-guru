import React, { useState, useEffect } from "react";
import "./movies.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faClock } from "@fortawesome/free-solid-svg-icons";

const MovieCard = ({ movie }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);
    const fallbackImage = "https://streaming1.cigre.org/view/img/notfound_portrait.jpg";

    const imageUrl = movie.imageurls && movie.imageurls.length > 0
        ? movie.imageurls[0]
        : fallbackImage;

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
                <img
                    src={imageUrl}
                    alt={movie.title}
                    onError={(e) => e.target.src = fallbackImage}
                />
                <div className="movie-title-overlay">
                    <p className="movie-title">{movie.title}</p>
                </div>
                <div className="movie-icons">
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={`icon ${isFavorite ? "active" : ""}`}
                        onClick={() => handleClick("favorite")}
                        aria-label="Add to favorites"
                    />
                    <FontAwesomeIcon
                        icon={faClock}
                        className={`icon ${isWatchLater ? "active" : ""}`}
                        onClick={() => handleClick("watchlater")}
                        aria-label="Add to watch later"
                    />
                </div>
            </div>
            <div className="movie-details">
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
