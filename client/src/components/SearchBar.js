import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "..";
import { Form, Dropdown, DropdownItem, Button} from "react-bootstrap";
import { fetchMovie } from '../http/movieAPI'
import "./css/SearchBar.css";

const SearchBar = observer(({handleTitle}) => {
  const { movie } = useContext(Context);
  const [firstDuration, setFirstDuration] = useState(0);
  const [lastDuration, setLastDuration] = useState(999);
  const [firstBudget, setFirstBudget] = useState(0);
  const [lastBudget, setLastBudget] = useState(999999999);
  const [firstYear, setFirstYear] = useState(0);
  const [lastYear, setLastYear] = useState(2025);

  useEffect( () => {
    movie.setSelectedFakeGenre('')
    movie.setSelectedFakeSecondGenre('')
    movie.setSelectedFakeCountry('')
    setFirstDuration(0)
    setLastDuration(999)
    setFirstBudget(0)
    setLastBudget(999999999)
    setFirstYear(0)
    setLastYear(2025)
  }, []);

  const searchMovies = async () => {
    movie.setSelectedGenre(movie.selectedFakeGenre);
    movie.setSelectedSecondGenre(movie.selectedFakeSecondGenre);
    movie.setSelectedCountry(movie.selectedFakeCountry);
    movie.setSelectedFirstDuration(parseInt(firstDuration));
    movie.setSelectedLastDuration(parseInt(lastDuration));
    movie.setSelectedFirstBudget(parseInt(firstBudget));
    movie.setSelectedLastBudget(parseInt(lastBudget));
    movie.setSelectedFirstYear(parseInt(firstYear));
    movie.setSelectedLastYear(parseInt(lastYear));
    fetchMovie(movie.searchTitle, 
      movie.selectedGenre.Genre_id, 
      movie.selectedSecondGenre.Genre_second_id, 
      movie.selectedCountry.Country_id, 
      movie.selectedFirstDuration, 
      movie.selectedLastDuration, 
      movie.selectedFirstBudget, 
      movie.selectedLastBudget, 
      movie.selectedFirstYear, 
      movie.selectedLastYear,
      movie.selectedSort,
      movie.selectedAscDesc,
      movie.page, movie.limit).then(data => {
        movie.setPickMovies(data.rows)
        movie.setMovies(data.rows)
        movie.setTotalCount(data.count)
      })
  };

  const clearMovies = async () => {
    movie.setSelectedFakeGenre('')
    movie.setSelectedFakeSecondGenre('')
    movie.setSelectedFakeCountry('')
    setFirstDuration(0)
    setLastDuration(999)
    setFirstBudget(0)
    setLastBudget(999999999)
    setFirstYear(0)
    setLastYear(2025)
    movie.setSelectedGenre('')
    movie.setSelectedSecondGenre('')
    movie.setSelectedCountry('')
    movie.setSelectedFirstDuration(0);
    movie.setSelectedLastDuration(999);
    movie.setSelectedFirstBudget(0);
    movie.setSelectedLastBudget(999999999);
    movie.setSelectedFirstYear(0);
    movie.setSelectedLastYear(2025);
    fetchMovie(null, 
      null, 
      null, 
      null, 
      movie.selectedFirstDuration, 
      movie.selectedLastDuration, 
      movie.selectedFirstBudget, 
      movie.selectedLastBudget, 
      movie.selectedFirstYear, 
      movie.selectedLastYear,
      movie.selectedSort,
      movie.selectedAscDesc,
      movie.page, movie.limit).then(data => {
        movie.setPickMovies(data.rows)
        movie.setMovies(data.rows)
        movie.setTotalCount(data.count)
      })
  };

  return (
    <div className="form-searchbar">
    <Form>
      <Form.Label className="form-label-bar">Главный жанр</Form.Label>
        <Dropdown>
              <Dropdown.Toggle  className="form-label-dropdown">{movie.selectedFakeGenre.Genre_name || 'Нет'}</Dropdown.Toggle>
              <Dropdown.Menu  className="form-label-dropdown">
                {movie.genres.map(genre =>
                  <Dropdown.Item onClick={() => movie.setSelectedFakeGenre(genre)} key={genre.Genre_id}>{genre.Genre_name}</Dropdown.Item>
                )}
                <Dropdown.Item onClick={() => movie.setSelectedFakeGenre('')}>Нет</Dropdown.Item>
              </Dropdown.Menu>
        </Dropdown>
      <Form.Label className="form-label-bar">Второй жанр</Form.Label>
      <Dropdown>
            <Dropdown.Toggle  className="form-label-dropdown">{movie.selectedFakeSecondGenre.Genre_name || 'Нет'}</Dropdown.Toggle>
            <Dropdown.Menu  className="form-label-dropdown">
              {movie.secondGenres.map(secondGenre =>
                <Dropdown.Item onClick={() => movie.setSelectedFakeSecondGenre(secondGenre)} key={secondGenre.Genre_second_id}>{secondGenre.Genre_name}</Dropdown.Item>
              )}
              <Dropdown.Item onClick={() => movie.setSelectedFakeSecondGenre('')}>Нет</Dropdown.Item>
            </Dropdown.Menu>            
          </Dropdown>
      <Form.Label className="form-label-bar">Страна</Form.Label>
      <Dropdown>
          <Dropdown.Toggle  className="form-label-dropdown">{movie.selectedFakeCountry.Country_name || 'Нет'}</Dropdown.Toggle>
          <Dropdown.Menu  className="form-label-dropdown">
            {movie.countries.map(country =>
              <Dropdown.Item onClick={() => movie.setSelectedFakeCountry(country)} key={country.Country_id}>{country.Country_name}</Dropdown.Item>
            )}
            <Dropdown.Item onClick={() => movie.setSelectedFakeCountry('')}>Нет</Dropdown.Item>
          </Dropdown.Menu>            
        </Dropdown>
      <Form.Label className="form-label-bar">Длительность (мин)</Form.Label>
      <Form.Control
            value={firstDuration  || 0}
            onChange={e => setFirstDuration(parseInt(e.target.value) || 0)}
            placeholder={0}
      />
      <Form.Control style={{marginTop: '5px' }}
            value={lastDuration || 0}
            onChange={e => setLastDuration(parseInt(e.target.value) || 0)}
            placeholder={999}
      />
      <Form.Label className="form-label-bar">Бюджет (BYN)</Form.Label>
      <Form.Control
            value={firstBudget || 0}
            onChange={e => setFirstBudget(parseInt(e.target.value) || 0)}
            placeholder={0}
      />
      <Form.Control style={{marginTop: '5px' }}
            value={lastBudget || 0}
            onChange={e => setLastBudget(parseInt(e.target.value) || 0)}
            placeholder={999999999}
      />
      <Form.Label className="form-label-bar">Дата выхода (год)</Form.Label>
      <Form.Control
            value={firstYear || 0}
            onChange={e => setFirstYear(parseInt(e.target.value || 0))}
            placeholder={0}
      />
      <Form.Control
            value={lastYear || 0}
            onChange={e => setLastYear(parseInt(e.target.value || 0))}
            placeholder={2025}
      />
      <Button variant="primary" className="form-label-button1" onClick={clearMovies}>
          Очистить
      </Button>
      <Button variant="primary" className="form-label-button2" onClick={searchMovies}>
        {handleTitle === 'save'? (
          <>Сохранить</>
        ) : (
          <>Поиск</>
        )}          
      </Button>
    </Form>
    </div>
  );
});

export default SearchBar;