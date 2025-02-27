import React, { useState, useEffect } from "react";
import "./dashboard.css";
import MovieCard from "../../components/movies/MovieCard";
import Filter from "../../components/movies/Filter";
import axios from "axios";

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [minYear, setMinYear] = useState(1970);
    const [maxYear, setMaxYear] = useState(2022);
    const [genres, setGenres] = useState([]);
    const [sort, setSort] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const loadMovies = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setErrorMessage("You are not authenticated. Please log in.");
            return;
        }
        setLoading(true);

        try {
            const response = await axios.get("http://localhost:8000/api/titles/advancedsearch", {
                params: {
                    minYear,
                    maxYear,
                    genres: genres.length ? genres.join(",") : "",
                    title,
                    sort,
                    page: 1
                },
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.titles?.length > 0) {
                setMovies(response.data.titles);
                setErrorMessage("");
            } else {
                setErrorMessage("No movies found.");
            }
        } catch (error) {
            console.error("Error fetching movies:", error.response);
            setErrorMessage(`Error fetching movies: ${error.response?.status || "Unknown error"}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setMovies([]);
        loadMovies();
    }, [minYear, maxYear, genres, title, sort]);

    return (
        <div className="dashboard-content">
            <Filter
                minYear={minYear} setMinYear={setMinYear}
                maxYear={maxYear} setMaxYear={setMaxYear}
                sort={sort} setSort={setSort}
                genres={genres} setGenres={setGenres}
                title={title} setTitle={setTitle}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {loading && <p>Loading movies...</p>}
            <ul className="movies-list">
                {movies.map((movie, index) => (
                    <MovieCard key={`${movie.imdbId}-${index}`} movie={movie} />
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
