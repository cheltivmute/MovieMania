import React, { useContext, useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import MovieFolderList from "../components/MovieFolderList";
import { getMovieToFolder, fetchGenre, fetchCountry, fetchOneMovie, deleteMovieToFolder } from '../http/movieAPI'
import { useParams } from 'react-router-dom'
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const FolderInPage = observer(() => {    
    const { movie } = useContext(Context)
    

    movie.setMovieFolders(null);
    const [newArray, setNewArray] = useState([]);
    const { Folder_id } = useParams()
    const delFromList = (folId, movId) => {
      deleteMovieToFolder(folId, movId).then(()=> {
        getMovieToFolder(Folder_id).then(data => {
          const promises = data.rows.map(row => fetchOneMovie(row.Movie.Movie_id));
          Promise.all(promises).then(results => {
              const updatedArray = results.filter(result => result !== undefined && result !== null);
              setNewArray(updatedArray);
              movie.setMovieFolders(updatedArray);
          });
        });
      })
    }

    useEffect(() => {
        getMovieToFolder(Folder_id).then(data => {
            const promises = data.rows.map(row => fetchOneMovie(row.Movie.Movie_id));
            Promise.all(promises).then(results => {
                const updatedArray = results.filter(result => result !== undefined && result !== null);
                setNewArray(updatedArray);
                movie.setMovieFolders(updatedArray);
            });
        });
    }, []);

    return (
        <Container>
            <Row className="mt-2">
                <Col md={12}>
                    <MovieFolderList delFromList={delFromList}/>
                </Col>
            </Row>
        </Container>
    )
}); 

export default FolderInPage;