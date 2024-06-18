import { observer } from "mobx-react-lite";
import React, { useEffect, useContext, useState } from "react";
import { Context } from "..";
import "./css/SliderBar.css";
import { Carousel, Row } from 'react-bootstrap';
import NewMovieItem from "./NewMovieItem";
import { fetchMovie } from '../http/movieAPI'

const SliderBar = observer(({movies, titleBar}) => {
    
  const { movie } = useContext(Context);
  const moviesToRender = Array.isArray(movies) ? movies : [];

  // Split the movies into three groups based on their indices
  const firstFiveMovies = moviesToRender.slice(0, 5);
  const nextFiveMovies = moviesToRender.slice(5, 10);
  const lastFiveMovies = moviesToRender.slice(10, 15);

  return (
    <div className="div-slider-main">
      <div className="div-slider-title">{titleBar}</div>
      <Carousel data-bs-theme="dark" className="div-slider-carousel">
        <Carousel.Item interval={5000}>
          <div className="div-slider-card">
            <Row className="d-flex justify-content-center">
              {firstFiveMovies.map(movieq =>
                <NewMovieItem key={movieq.Movie_id} movie={movieq} />
              )}
            </Row>
          </div>
        </Carousel.Item>
        {moviesToRender.length > 5 && (
        <Carousel.Item interval={5000}>
          <div className="div-slider-card">
            <Row className="d-flex justify-content-center">
              {nextFiveMovies.map(movieq =>
                <NewMovieItem key={movieq.Movie_id} movie={movieq} />
              )}
            </Row>
          </div>
        </Carousel.Item>)}
        {moviesToRender.length > 10 && (
           <Carousel.Item>
           <div className="div-slider-card">
             <Row className="d-flex justify-content-center">
               {lastFiveMovies.map(movieq =>
                 <NewMovieItem key={movieq.Movie_id} movie={movieq} />
               )}
             </Row>
           </div>
         </Carousel.Item>
        )}  
       
      </Carousel>
    </div>
  );
});

export default SliderBar;