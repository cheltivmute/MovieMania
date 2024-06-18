import React, { useContext, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchGenre, fetchCountry, fetchFolder, getOneUser, fetchSecondGenre, fetchMovie } from '../http/movieAPI'
import '../components/css/PickMoviePage.css'
import MovieItem from "../components/MovieItem";


const PickMoviePage = observer(() => {
  const {movie} = useContext(Context)
  const {user} = useContext(Context)
  const [gang, setGang] = useState(false)
  const [pickedMovie, setPickedMovie] = useState(null)
  const [availableIndexes, setAvailableIndexes] = useState([]);
  movie.setFolders(null)


  useEffect( () => {
    movie.setSelectedGenre('')
    movie.setSelectedSecondGenre('')
    movie.setSelectedCountry('')
    movie.setSelectedFirstDuration(0);
    movie.setSelectedLastDuration(999);
    movie.setSelectedFirstBudget(0);
    movie.setSelectedLastBudget(999999999);
    movie.setSelectedFirstYear(0);
    movie.setSelectedLastYear(2025);
    if(user.isAuth) {
      getOneUser(user.userID).then((data)=>{
        setGang(data.Is_blocked);
      })
      fetchFolder(user.userID).then((data) => {
        movie.setFolders(data.rows)
      })
    }    
    fetchGenre().then(data => movie.setGenres(data))
    fetchSecondGenre().then(data => movie.setSecondGenres(data))
    fetchCountry().then(data => movie.setCountries(data))
    fetchMovie(null, 
        null, 
        null, 
        null, 
        0, 
        999, 
        0, 
        999999999, 
        0, 
        2025, 
        'Title', 'ASC',
        movie.page, 9999999).then(data => {
            movie.setPickMovies(data.rows)
        })
      
  }, [user, movie])

  useEffect(() => {
    const indexes = Array.from(Array(movie.pickMovies.length).keys());
    setAvailableIndexes(indexes); 
  }, [movie.pickMovies])
   
  function handleButtonClick() {
    if (availableIndexes.length === 1) {
      const indexes = Array.from(Array(movie.pickMovies.length).keys());
      setAvailableIndexes(indexes);
    }
  
    const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    const randomMovie = movie.pickMovies[randomIndex];
    setAvailableIndexes(prevIndexes => prevIndexes.filter(index => index !== randomIndex));
    setPickedMovie(randomMovie);    
  }

  return (    
    <Container>
      <Row className="mt-3">
        <div className="div-pick-title">МУВИ ПИКЕР</div>
        <Col style={{marginTop: '10px'}} md={2}>
          <SearchBar handleTitle="save"/>
        </Col>
        <Col md={10}>
            <div className="div-pick-help">👈<span style={{fontWeight: 'bold'}}>Шаг 1</span>: Выберите настройки слева👈</div>
            <div className="div-pick-help">👇<span style={{fontWeight: 'bold'}}>Шаг 2</span>: Нажмите на БОЛЬШУЮ синию кнопку👇</div>
            <div className="div-pick-button">
                <button className="big-blue-button" onClick={handleButtonClick}>
                👆
                </button>
            </div>
            <div className="div-pick-help3">👇<span style={{fontWeight: 'bold'}}>Шаг 3</span>: Выбранный фильм будет представлен снизу👇</div>
            {pickedMovie && <MovieItem movie={pickedMovie}></MovieItem>}
            {pickedMovie && <div className="div-pick-help">😀<span style={{fontWeight: 'bold'}}>Шаг 4</span>: Наслаждайтесь просмотром выбранного фильма!😀</div>}
        </Col>
      </Row>
      <br/>
    </Container>
  )
})

export default PickMoviePage;