import React, { useState, useEffect } from "react";
import "./dashboard.css";
import MovieCard from "../../components/movies/MovieCard";
import axios from "axios";

const Favorites = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        axios.get("/api/titles/favorite/")
            .then((response) => setMovies(response.data))
            .catch((error) => console.error("Error fetching favorites:", error));
    }, []);

    return (
        <div className="dashboard-content">
            <h1>Movies you like</h1>
            <ul className="movies-list">
                {movies.length > 0 ? (
                    movies.map((movie) => <MovieCard key={movie.imdbId} movie={movie} />)
                ) : (
                    <p>No favorite movies found.</p>
                )}
            </ul>
        </div>
    );
};

export default Favorites;
