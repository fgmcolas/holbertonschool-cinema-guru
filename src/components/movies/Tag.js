import React from "react";

const Tag = ({ genre, filter, genres, setGenres }) => {
    const isSelected = genres.includes(genre);

    const toggleGenre = () => {
        if (isSelected) {
            setGenres(genres.filter(g => g !== genre));
        } else {
            setGenres([...genres, genre]);
        }
    };

    return (
        <div className={`tag ${isSelected ? "selected" : ""}`} onClick={toggleGenre}>
            {genre}
        </div>
    );
};

export default Tag;
