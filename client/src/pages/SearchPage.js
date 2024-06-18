import React, { useContext, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import SliderBar from "../components/SliderBar";
import CountryBar from "../components/CountryBar";
import MovieList from "../components/MovieList";
import SearchTitleBar from "../components/SearchTitleBar";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchGenre, fetchCountry, fetchMovie, fetchFolder, getOneUser, fetchSecondGenre } from '../http/movieAPI'
import Pages from "../components/Pages";


const SearchPage = observer(() => {
  const {movie} = useContext(Context)
  const {user} = useContext(Context)
  const [gang, setGang] = useState(false)
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
      'Release_date', 'DESC',
      1, 15).then(data => {
        movie.setNewMovies(data.rows)
      })
    fetchMovie(movie.searchTitle, 
      null, 
      null, 
      null, 
      0, 
      999, 
      0, 
      999999999, 
      0, 
      2025, 
      movie.selectedSort, movie.selectedAscDesc,
      1, 10).then(data => {
        movie.setMovies(data.rows)
        movie.setTotalCount(data.count)
      })
    
  }, [user, movie, movie.selectedSort, movie.selectedAscDesc])

  useEffect( () => {
    if(user.isAuth) {
      getOneUser(user.userID).then((data)=>{
        setGang(data.Is_blocked);
      })
      fetchFolder(user.userID).then((data) => {
        movie.setFolders(data.rows)
      })
    }
    fetchMovie(movie.searchTitle, 
      null, 
      null, 
      null, 
      movie.selectedFirstDuration, 
      movie.selectedLastDuration, 
      movie.selectedFirstBudget, 
      movie.selectedLastBudget, 
      movie.selectedFirstYear, 
      movie.selectedLastYear, 
      movie.selectedSort, movie.selectedAscDesc,
      movie.page, movie.limit).then(data => {
        movie.setMovies(data.rows)
        movie.setTotalCount(data.count)
      })
    
  }, [user, movie, movie.searchTitle, movie.selectedSort, movie.selectedAscDesc,
    movie.page,
    movie.limit])

  return (    
    <Container>
      <Row className="mt-3">
        <SliderBar movies={movie.newMovies} titleBar="Новинки"></SliderBar> 
      </Row>
            
      <Row className="mt-3">
        <Col md={2}>
          <SearchBar/>
        </Col>
        <Col md={10}>
          {gang && (
            <div style={{textAlign: 'center', width: '100%', fontSize: '32px', fontWeight: 'bold'}}>ВАШ АККАУНТ ЗАБЛОКИРОВАН! НЕКОТОРЫЕ ФУНКЦИИ БОЛЬШЕ НЕ ДОСТУПНЫ!</div>
          )}
          <SearchTitleBar/>
          <CountryBar/>
          <MovieList/>
          <Pages/>
        </Col>
      </Row>
      <br/>
    </Container>
  )
})

export default SearchPage;