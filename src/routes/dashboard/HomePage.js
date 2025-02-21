import React, { useState, useEffect } from "react";
import "./dashboard.css";
import MovieCard from "../../components/movies/MovieCard";
import Filter from "../../components/movies/Filter";
import Button from "../../components/general/Button";
import axios from "axios";

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [minYear, setMinYear] = useState(1970);
    const [maxYear, setMaxYear] = useState(2022);
    const [genres, setGenres] = useState([]);
    const [sort, setSort] = useState("");
    const [title, setTitle] = useState("");
    const [page, setPage] = useState(1);
    const loadMovies = (pageNum) => {
        axios
            .get("/api/titles/advancedsearch", {
                params: { minYear, maxYear, genres, title, sort, page: pageNum },
            })
            .then((response) => {
                setMovies((prevMovies) => [...prevMovies, ...response.data]);
            })
            .catch((error) => console.error("Error fetching movies:", error));
    };

    useEffect(() => {
        setMovies([]);
        loadMovies(1);
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
            <ul className="movies-list">
                {movies.map((movie) => (
                    <MovieCard key={movie.imdbId} movie={movie} />
                ))}
            </ul>
            <Button label="Load More.." onClick={() => { setPage(page + 1); loadMovies(page + 1); }} />
        </div>
    );
};

export default HomePage;
