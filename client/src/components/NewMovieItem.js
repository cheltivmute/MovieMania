import React, { useState } from "react";
import { Image, Button } from "react-bootstrap";
import './css/NewMovieItem.css'
import { useHistory } from "react-router-dom";
import { MOVIE_ROUTE } from "../utils/consts";

const NewMovieItem = ({
        movie
    }) => {
    const history = useHistory();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="div-main-folder">
            <div className="div-image-folder">
                {isHovered ? (
                    <div className="div-description-folder" onMouseLeave={() => setIsHovered(false)} onClick={() => {history.push(`${MOVIE_ROUTE}/${movie.Movie_id}`)}}>
                        {movie.Description}
                    </div>
                ) : (
                    <Image
                        onClick={() => {history.push(`${MOVIE_ROUTE}/${movie.Movie_id}`)}}
                        onMouseEnter={() => setIsHovered(true)} 
                        className="img-folder-gang"                     
                        width={200}
                        height={300}
                        objectFit={'cover'}
                        src={"http://klyuchna9:5000/" + movie.Cover}
                    />
                )}
                <div className="div-title-folder" onClick={() => {history.push(`${MOVIE_ROUTE}/${movie.Movie_id}`)}} >{movie.Title}</div>
                <div className="div-moviebuttons-folder">
                    <span className="movieitem-description">{movie.Genre.Genre_name} ● {movie.Country.Country_name} ● {new Date(movie.Release_date).getFullYear()}</span>
                </div>
            </div>
        </div>
        
    );
};

export default NewMovieItem;