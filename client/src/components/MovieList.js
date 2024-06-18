import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { Row } from "react-bootstrap"
import MovieItem from "./MovieItem";

const MovieList = observer((usersToRender) => {
    const { movie } = useContext(Context);
    // Добавляем проверку на тип данных movie.movies
    const moviesToRender = Array.isArray(movie.movies) ? movie.movies : [];

    return (
        <Row className="d-flex">
            {moviesToRender.map(movieq =>
                <MovieItem key={movieq.Movie_id} movie={movieq} usersToRender={usersToRender}/>
            )}
        </Row>
    )
});

export default MovieList;