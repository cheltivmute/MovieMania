import React, { useContext, useEffect, useState } from "react";
import { Image, Button } from "react-bootstrap";
import './css/MovieItem.css'
import { useHistory } from "react-router-dom";
import { MOVIE_ROUTE } from "../utils/consts";
import { getAvgRating, createMovieToFolder, getOneFolder, getOneMovieToFolder, deleteMovieToFolder, getOneUser, getFolderToMovie} from '../http/movieAPI'
import { Context } from "..";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import FolderBar from "./FolderBar";

const MovieItem = ({ movie, usersToRender }) => {
    const {user} = useContext(Context)
    const [avgRatingValue, setAvgRatingValue] = useState(null);
    const [isInFav, setIsInFav] = useState(false);
    const [gang, setGang] = useState(false)
    const [isActiveButton, setIsActiveButton] = useState(false)
    const [actveFolders, setActiveFolders] = useState([])
    useEffect( () => {
        if(user.isAuth) {
            getOneUser(user.userID).then((data)=>{
                setGang(data.Is_blocked);
              })
            getOneFolder(user.userID, 'Избранные').then((data)=> {
                getOneMovieToFolder(data.Folder_id, movie.Movie_id).then((data1) => {
                    if(data1.count > 0) {
                        setIsInFav(true)
                    } else {
                        setIsInFav(false)
                    }
                })
            })
        }        
        getAvgRating(+movie.Movie_id).then((data)=>{      
          setAvgRatingValue(data.averageRating)
        })
    }, [user.isAuth, user.userID, movie])

    const leshGoToFav = () => {
        getOneFolder(user.userID, 'Избранные').then((data) => {
            createMovieToFolder(data.Folder_id, movie.Movie_id)
            setIsInFav(true)
        })
    }

    const leshGoFromFav = () => {
        getOneFolder(user.userID, 'Избранные').then((data) => {
            deleteMovieToFolder(data.Folder_id, movie.Movie_id)
            setIsInFav(false)
        })
    }

    const goToFolder = (folId) => {
        createMovieToFolder(folId, movie.Movie_id).then(()=> {
            getFolderToMovie(movie.Movie_id).then((data) => {
                setActiveFolders(data.map((item) => item.Folder_id));
                getOneFolder(user.userID, 'Избранные').then((dataq)=> {
                    getOneMovieToFolder(dataq.Folder_id, movie.Movie_id).then((data1) => {
                        if(data1.count > 0) {
                            setIsInFav(true)
                        } else {
                            setIsInFav(false)
                        }
                    })
                })
            })
        })
    }

    const goFromFolder = (folId) => {
        deleteMovieToFolder(folId, movie.Movie_id).then(()=>{
            getFolderToMovie(movie.Movie_id).then((data) => {
                setActiveFolders(data.map((item) => item.Folder_id));
                getOneFolder(user.userID, 'Избранные').then((dataq)=> {
                    getOneMovieToFolder(dataq.Folder_id, movie.Movie_id).then((data1) => {
                        if(data1.count > 0) {
                            setIsInFav(true)
                        } else {
                            setIsInFav(false)
                        }
                    })
                })
            })
        })
    }

    const clickButton = (movID) => {
        if(isActiveButton) {
            setIsActiveButton(false)
        } else {            
            getFolderToMovie(movID).then((data) => {
                setActiveFolders(data.map((item) => item.Folder_id))
                setIsActiveButton(true)             
            })            
        }
        
        
    }
    
    const history = useHistory()
    return (
        <div className="div-main">
            <div className="div-image" onClick={() => {history.push(`${MOVIE_ROUTE}/${movie.Movie_id}`)}}>
                <Image width={150} height={200} style={{objectFit: 'cover'}} src={"http://klyuchna9:5000/" + movie.Cover} />
            </div>
            <div className="div-info">
                <div className="div-title" onClick={() => {history.push(`${MOVIE_ROUTE}/${movie.Movie_id}`)}}>{movie.Title}</div>
                <div className="div-buttons">
                {user.isAuth ? (
                <> {!gang ? (
                    <>
                    {isInFav ? (
                        <Button className="div-button1" variant="outline-dark" onClick={() => { leshGoFromFav() }}>♥</Button>
                    ) : (
                        <Button className="div-button1" variant="outline-dark" onClick={() => { leshGoToFav() }}>♡</Button>
                    )}
                    
                    <OverlayTrigger
                    trigger="click"                    
                    key="left"
                    placement="left"
                    overlay={
                        <Popover id="popover-positioned-left">
                        <Popover.Header as="h3"></Popover.Header>
                        <Popover.Body>
                            <span style={{ fontSize: '16px', cursor: 'pointer'}}>
                                <FolderBar actveFolders={actveFolders} goToFolder={goToFolder} goFromFolder={goFromFolder}/>
                            </span>
                        </Popover.Body>
                        </Popover>
                    }
                    >   
                    {(isActiveButton) ? (
                        <Button variant="outline-dark" className="div-button2" onClick={() => {clickButton(movie.Movie_id)}}>★</Button>
                    ) : (
                        <Button variant="outline-dark" className="div-button2" onClick={() => {clickButton(movie.Movie_id)}}>☆</Button>                      
                    )}           
                        
                    </OverlayTrigger>
                    </>
                    ):(
                        ''
                    )} 
                </>
                ) : (
                'Войдите!'
                )}
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
        </div>
    );
};

export default MovieItem;