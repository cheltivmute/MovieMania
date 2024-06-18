import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { Row } from "react-bootstrap"
import MovieFolderItem from "./MovieFolderItem";

const MovieFodlerList = observer(({delFromList}) => {
    const {movie} = useContext(Context);

    const movieFoldersToRender = Array.isArray(movie.movieFolders) ? movie.movieFolders : [];

    return (
        <Row className="d-flex justify-content-center">
            {movieFoldersToRender.map(movieFolder =>
                <MovieFolderItem
                    delFromList={delFromList}
                    key={movieFolder.Movie_id}
                    movie={movieFolder}
                />
            )}
        </Row>
    )
});

export default MovieFodlerList;