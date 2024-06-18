import React, { useState, useContext} from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { Context } from '../../index';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { changeGenre } from '../../http/movieAPI';
import { observer } from 'mobx-react-lite';

const ChangeGenre = observer(({ show, onHide }) => {
  const { movie } = useContext(Context);
  const [value, setValue] = useState('');
  const [genreError, setGenreError] = useState('');
  const [nameError, setNameError] = useState('');

  const updateGenre = async () => {
    try{
      let data
      if (!movie.selectedGenre) {
        setGenreError('Пожалуйста введите название жанра!');
        return;
      }
      if (value.length < 3 || value.length > 12) {
        setNameError('Название жанра должно содержать 3-12 символов!');
        return;
      } else if (!/^[а-яА-Я]+$/.test(value)) {
        setNameError('*Название жанра должно содержать только буквы!');
        return;
      }
      const formData = new FormData();
      formData.append('Genre_id', movie.selectedGenre.Genre_id);
      formData.append('Genre_second_id', movie.selectedGenre.Genre_id);
      formData.append('Genre_name', value);
      
      data = await changeGenre(formData).then(() => {
        setValue('');
        movie.setSelectedGenre('');
        setGenreError('');
        setNameError('');
        alert('Жанр успешно изменен!')
        onHide()
      });
    } catch (e) {
      alert(e.response.data.message)
    }
  };

  const handleGenreSelect = (genre) => {
    movie.setSelectedGenre(genre);
    setGenreError('');
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setNameError('');
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Изменить жанр</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown>
          <Dropdown.Toggle style={{width: '100%'}}>
            {movie.selectedGenre ? movie.selectedGenre.Genre_name : 'Выберите жанр'}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{width: '100%'}}>
            {movie.genres.map((genre) => (
              <Dropdown.Item style={{width: '100%'}} onClick={() => handleGenreSelect(genre)} key={genre.Genre_id}>
                {genre.Genre_name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {genreError && <div className="error-message">{genreError}</div>}
        <Form className="mt-3">
          <Form.Control
            value={value}
            onChange={handleChange}
            placeholder={'Введите название жанра'}
          />
          {nameError && <div className="error-message">{nameError}</div>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{width: '48%'}} variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button style={{width: '48%'}} variant="primary" onClick={updateGenre}>
          Изменить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default ChangeGenre;