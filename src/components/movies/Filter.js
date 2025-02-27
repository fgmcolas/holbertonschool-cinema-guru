import React from "react";
import "./movies.css";
import Input from "../general/Input";
import SelectInput from "../general/SelectInput";
import SearchBar from "../general/SearchBar";
import Tag from "./Tag";

const genresList = [
    "Action", "Drama", "Comedy", "Biography", "Romance", "Thriller",
    "War", "History", "Sport", "Sci-Fi", "Documentary", "Crime", "Fantasy"
];

const Filter = ({ minYear, setMinYear, maxYear, setMaxYear, sort, setSort, genres, setGenres, title, setTitle }) => {
    return (
        <div className="filter-container">
            <div className="filter-left">
                <SearchBar title={title} setTitle={setTitle} className="search-bar" />
                <div className="filters">
                    <Input label="Min Date:" type="number" value={minYear} setValue={setMinYear} className="filter-input" />
                    <Input label="Max Date:" type="number" value={maxYear} setValue={setMaxYear} className="filter-input" />
                    <SelectInput
                        label="Sort:"
                        options={[
                            { value: "default", label: "Default" },
                            { value: "latest", label: "Latest" },
                            { value: "oldest", label: "Oldest" },
                            { value: "highestrated", label: "Highest Rated" },
                            { value: "lowestrated", label: "Lowest Rated" }
                        ]}
                        value={sort}
                        setValue={setSort}
                        className="filter-input"
                    />
                </div>
            </div>
            <div className="tags-container">
                {genresList.map((genre, index) => (
                    <Tag key={index} genre={genre} genres={genres} setGenres={setGenres} />
                ))}
            </div>
        </div>
    );
};

export default Filter;
