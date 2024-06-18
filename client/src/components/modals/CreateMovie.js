import React, { useContext, useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from "../../index";
import { createMovie } from '../../http/movieAPI';
import { observer } from 'mobx-react-lite';

const CreateMovie = observer(({ show, onHide }) => {
  const { movie } = useContext(Context);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);
  const [budget, setBudget] = useState(0);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(null);
  const [bdDate, setBdDate] = useState(null);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorDuration, setErrorDuration] = useState('');
  const [errorBudget, setErrorBudget] = useState('');
  const [errorGenre, setErrorGenre] = useState('');
  const [errorSecondGenre, setErrorSecondGenre] = useState('');
  const [errorCountry, setErrorCountry] = useState('');
  const [errorDate, setErrorDate] = useState('');
  const [errorCover, setErrorCover] = useState('');
  const [errorDescription, setErrorDescription] = useState('');

  const validateForm = () => {
    let isValid = true;
    if(!title) {
        setErrorTitle('*Пожалуйста введите название!');
        isValid = false;
    }
    else if (title.length > 35) {
        setErrorTitle('*Название не должно превышать 35 символов!');
        isValid = false;
    }
    else if (!/^[a-zA-Zа-яА-Я0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/.test(title)) {
        setErrorTitle('*Название должно содержать только буквы, цифры, пробелы и спец. символы!');
        isValid = false;
    } else {
        setErrorTitle('');
    }

    if(!duration) {
      setErrorDuration('*Пожалуйста введите длительность!');
      isValid = false;
    } else if (duration> 999){
      setErrorDuration('*Длительность не должна превышать 999 мин!');
      isValid = false;
    } else if (!/^\d+$/.test(duration)) {
      setErrorDuration('*Длительность должна содержать только цифры!');
      isValid = false;
    } else {
      setErrorDuration('');
    }

    if(!budget) {
      setErrorBudget('*Пожалуйста введите бюджет!');
      isValid = false;
    } else if (budget > 999999999){
      setErrorBudget('*Бюджет не должен превышать 99999999BYN!');
      isValid = false;
    } else if (!/^\d+$/.test(budget)) {
      setErrorBudget('*Бюджет должен содержать только цифры!');
      isValid = false;
    } else {
      setErrorBudget('');
    }

    if (!movie.selectedGenre) {
        setErrorGenre('*Пожалуйста выберите главный жанр!');
        isValid = false;
    } else {
        setErrorGenre('');
    }

    if (!movie.selectedSecondGenre) {
      setErrorSecondGenre('*Пожалуйста выбери второй жанр!');
      isValid = false;
  } else {
      setErrorSecondGenre('');
  }


    if (!movie.selectedCountry) {
        setErrorCountry('*Пожалуйста выбери страну!');
        isValid = false;
    } else {
        setErrorCountry('');
    }


    if (!bdDate) {
        setErrorDate('*Пожалуйста выберите дату выхода фильма!');
        isValid = false;
    }    
    else if (new Date(bdDate) > new Date()) {
        setErrorDate('*Дата выхода не должна быть в будущем!');
        isValid = false;
    } else {
        setErrorDate('');
    }
 

    if (!file) {
        setErrorCover('*Пожайлуйста выберите файл обложки!');
        isValid = false;
    } else {
        setErrorCover('');
    }

    if (!description) {
        setErrorDescription('*Пожалуйста введите описание!');
        isValid = false;
    }
    else if (description.length > 999) {
        setErrorDescription('Описание должно содержать до 999 символов!');
        isValid = false;
    } else {
        setErrorDescription('');
    }

    return isValid;
  }

  const selectFile = e => {
    setFile(e.target.files[0]);
  };

  const addMovie = async () => {
    if (!validateForm()) {
        return;
    } else {
        try {
            let data;
            console.log(title, movie.selectedGenre.Genre_id, movie.selectedSecondGenre.Genre_second_id, movie.selectedCountry.Country_id, duration, budget, description, bdDate)
            const formData = new FormData();
            formData.append('Title', title);
            formData.append('Cover', file);
            formData.append('Genre_id', movie.selectedGenre.Genre_id);
            formData.append('Genre_second_id', movie.selectedSecondGenre.Genre_second_id);
            formData.append('Country_id', movie.selectedCountry.Country_id);
            formData.append('Duration', duration);
            formData.append('Budget', budget);
            formData.append('Description', description);
            formData.append('Release_date', bdDate);
    
            data = await createMovie(formData).then(() => {                
                setErrorTitle('');
                setErrorGenre('');
                setErrorSecondGenre('');
                setErrorCountry('');
                setDuration('');
                setBudget('');
                setErrorDate('');
                setErrorCover('');
                setErrorDescription('');
                alert('Фильм успешно добавлен!');
                movie.setSelectedGenre('');
                movie.setSelectedSecondGenre('');
                movie.setSelectedCountry('');
                setTitle('');
                setDuration(0);
                setBudget(0);
                setFile(null);
                setDescription(null);
                setBdDate(null);
                onHide();
            })
        } catch (e) {
          alert(e.response.data.message);
        }
    }    
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить новый фильм</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={title}
            onChange={e => setTitle(e.target.value)}
            className='mt-3'
            placeholder='Введите название'
          />
          {errorTitle && <div>{errorTitle}</div>}
          <Form.Control
            style={{width: '100%'}}
            className='mt-3'
            placeholder='Добавить обложку'
            type='file'
            onChange={selectFile}
          />
          {errorCover && <div>{errorCover}</div>}
          <Dropdown className='mt-3'>
            <Dropdown.Toggle style={{width: '100%'}}>{movie.selectedGenre.Genre_name || 'Добавить главный жанр'}</Dropdown.Toggle>
            <Dropdown.Menu style={{width: '100%'}}>
              {movie.genres.map(genre =>
                <Dropdown.Item style={{width: '100%'}} onClick={() => movie.setSelectedGenre(genre)} key={genre.Genre_id}>{genre.Genre_name}</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          {errorGenre && <div>{errorGenre}</div>}
          <Dropdown className='mt-3'>
            <Dropdown.Toggle style={{width: '100%'}}>{movie.selectedSecondGenre.Genre_name || 'Добавить второй жанр'}</Dropdown.Toggle>
            <Dropdown.Menu style={{width: '100%'}}>
              {movie.secondGenres.map(secondGenre =>
                <Dropdown.Item style={{width: '100%'}} onClick={() => movie.setSelectedSecondGenre(secondGenre)} key={secondGenre.Genre_second_id}>{secondGenre.Genre_name}</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          {errorSecondGenre && <div>{errorSecondGenre}</div>}
          <Dropdown className='mt-3'>
            <Dropdown.Toggle style={{width: '100%'}}>{movie.selectedCountry.Country_name || 'Добавить страну'}</Dropdown.Toggle>
            <Dropdown.Menu style={{width: '100%'}}>
              {movie.countries.map(country =>
                <Dropdown.Item style={{width: '100%'}} onClick={() => movie.setSelectedCountry(country)} key={country.Country_id}>{country.Country_name}</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          {errorCountry && <div>{errorCountry}</div>}
          
          <Form.Control
            value={duration}
            onChange={e => setDuration(e.target.value)}
            className='mt-3'
            placeholder='Input duration'
          />
          {errorDuration && <div>{errorDuration}</div>}
          <Form.Control
            value={budget}
            onChange={e => setBudget(e.target.value)}
            className='mt-3'
            placeholder='Input budget'
          />
          {errorBudget && <div>{errorBudget}</div>}
          <Form.Control
            value={bdDate}
            onChange={e => setBdDate(e.target.value)}
            className='mt-3'
            placeholder='Дата выхода ДД/ММ/ГГГГ'
            type='date'
          />
          {errorDate && <div>{errorDate}</div>}
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Введите описание:</Form.Label>
            {errorDescription && <div>{errorDescription}</div>}
            <Form.Control
              value={description}
              onChange={e => setDescription(e.target.value)}
              as="textarea"
              rows={3}
            />            
          </Form.Group>          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button  style={{width: '48%'}} variant="secondary" onClick={() => onHide()}>
          Закрыть
        </Button>
        <Button  style={{width: '48%'}} variant="primary" onClick={addMovie}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateMovie;