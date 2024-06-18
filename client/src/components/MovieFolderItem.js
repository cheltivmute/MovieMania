import React, { useEffect, useState } from "react";
import { Image, Button } from "react-bootstrap";
import './css/MovieItem.css'
import { useHistory, useParams } from "react-router-dom";
import { MOVIE_ROUTE } from "../utils/consts";
import { getAvgRating } from '../http/movieAPI'
import AcceptModal from "./modals/AcceptModal";

const MovieFolderItem = ({ movie, delFromList }) => {
    const { Folder_id } = useParams()
    
    const [avgRatingValue, setAvgRatingValue] = useState(null);
    const [showAcceptModal, setAcceptShowModal] = useState(false);

    useEffect( () => {
        getAvgRating(+movie.Movie_id).then((data)=>{      
          setAvgRatingValue(data.averageRating)
        })
    }, [movie])

    

    const history = useHistory()
    return (
        <div className="div-main">
            <div className="div-image" onClick={() => {history.push(`${MOVIE_ROUTE}/${movie.Movie_id}`)}}>
                <Image width={150} height={200} style={{objectFit: 'cover'}} src={"http://klyuchna9:5000/" + movie.Cover} />
            </div>
            <div className="div-info">
                <div className="div-title" onClick={() => {history.push(`${MOVIE_ROUTE}/${movie.Movie_id}`)}}>{movie.Title}</div>
                <div className="div-buttons">
                    <Button className="div-button2" variant="outline-dark" onClick={()=>{ setAcceptShowModal(true)}}>⊗</Button>
                </div>
                
                <div className="div-description" onClick={() => {history.push(`${MOVIE_ROUTE}/${movie.Movie_id}`)}}>
                    <span className="div-undertitle">{movie.Genre.Genre_name} ● {movie.SecondGenre.Genre_name} ● {movie.Country.Country_name} ● {new String(movie.Duration + " min")} ● {movie.Budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " BYN"} ● {new Date(movie.Release_date).getFullYear()}</span>
                    <br/>   
                    <span className="div-undertitletext">{movie.Description}</span>
                </div>
                <div className="div-rating" onClick={() => {history.push(`${MOVIE_ROUTE}/${movie.Movie_id}`)}}>
                    Рейтинг:
                    {avgRatingValue ? (
                        <>                   
                        <div className="div-rating-num">
                            {avgRatingValue}
                        </div>
                        </>
                    ) : (
                        <>                   
                        <div className="div-rating-num">
                            {':('}
                        </div>
                        </>
                    )}
                </div>
            </div>
            <AcceptModal
                let message={'Вы уверены, что хотите удалить этот фильм из папки?'}
                show={showAcceptModal} 
                onHide={(answer) => {
                if(answer) {
                    delFromList(Folder_id, movie.Movie_id)
                } else {              
                    alert('Вы отказались от удаления фильма из папки!')
                }                    
                setAcceptShowModal(false);                      
                }}
            />
        </div>
    );
};

export default MovieFolderItem;