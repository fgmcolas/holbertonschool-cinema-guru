import React, { useState, useEffect } from "react";
import "./movies.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock } from "@fortawesome/free-solid-svg-icons";

const MovieCard = ({ movie }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);
    const fallbackImage = "https://streaming1.cigre.org/view/img/notfound_portrait.jpg";

    const imageUrl = movie.imageurls?.length > 0 ? movie.imageurls[0] : fallbackImage;

    useEffect(() => {
        const fetchMovieStatus = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) return;

            try {
                const [favRes, watchRes] = await Promise.all([
                    axios.get("http://localhost:8000/api/titles/favorite/", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://localhost:8000/api/titles/watchlater/", {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                ]);

                setIsFavorite(favRes.data.some(favMovie => favMovie.imdbId === movie.imdbId));
                setIsWatchLater(watchRes.data.some(watchMovie => watchMovie.imdbId === movie.imdbId));
            } catch (error) {
                console.error("Error fetching movie status:", error);
            }
        };

        fetchMovieStatus();
    }, [movie]);

    const handleClick = async (type) => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const url = `http://localhost:8000/api/titles/${type}/${movie.imdbId}`;
        const toggleState = type === "favorite" ? setIsFavorite : setIsWatchLater;
        const stateValue = type === "favorite" ? isFavorite : isWatchLater;

        try {
            if (stateValue) {
                await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
            } else {
                await axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` } });
            }
            toggleState(!stateValue);
        } catch (error) {
            console.error(`Error updating ${type}:`, error);
        }
    };

    return (
        <div className="movie-card">
            <div className="movie-image">
                <img
                    src={imageUrl}
                    alt={movie.title}
                    onError={(e) => (e.target.src = fallbackImage)}
                />
                <div className="movie-title-overlay">
                    <p className="movie-title">{movie.title}</p>
                </div>
                <div className="movie-icons">
                    <FontAwesomeIcon
                        icon={faClock}
                        className={`icon ${isWatchLater ? "active" : ""}`}
                        onClick={() => handleClick("watchlater")}
                        aria-label="Add to watch later"
                    />
                    <FontAwesomeIcon
                        icon={faStar}
                        className={`icon ${isFavorite ? "active" : ""}`}
                        onClick={() => handleClick("favorite")}
                        aria-label="Add to favorites"
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
