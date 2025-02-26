import React, { useState, useEffect } from "react";
import "./dashboard.css";
import MovieCard from "../../components/movies/MovieCard";
import axios from "axios";

const Favorites = () => {
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setErrorMessage("You are not authenticated. Please log in.");
                return;
            }
            setLoading(true);

            try {
                const response = await axios.get("http://localhost:8000/api/titles/favorite/", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching favorites:", error);
                setErrorMessage("Failed to fetch favorite movies.");
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div className="dashboard-content">
            <h1>Movies you like</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {loading && <p>Loading movies...</p>}
            <ul className="movies-list">
                {movies.length > 0 ? (
                    movies.map((movie, index) => <MovieCard key={`${movie.imdbId}-${index}`} movie={movie} />)
                ) : (
                    <p>No favorite movies found.</p>
                )}
            </ul>
        </div>
    );
};

export default Favorites;
