import React, { useState, useEffect } from "react";
import "./dashboard.css";
import MovieCard from "../../components/movies/MovieCard";
import axios from "axios";

const WatchLater = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        axios.get("/api/titles/watchlater/")
            .then((response) => setMovies(response.data))
            .catch((error) => console.error("Error fetching watch later movies:", error));
    }, []);

    return (
        <div className="dashboard-content">
            <h1>Movies to watch later</h1>
            <ul className="movies-list">
                {movies.length > 0 ? (
                    movies.map((movie) => <MovieCard key={movie.imdbId} movie={movie} />)
                ) : (
                    <p>No movies in your watch later list.</p>
                )}
            </ul>
        </div>
    );
};

export default WatchLater;
