import React, { useState, useContext } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import { Context } from '../../index';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { changeCountry } from '../../http/movieAPI';
import { observer } from 'mobx-react-lite';

const ChangeCountry = observer(({ show, onHide }) => {
  const { movie } = useContext(Context);
  const [value, setValue] = useState('');
  const [countryError, setCountryError] = useState('');
  const [nameError, setNameError] = useState('');

  const updateCountry = async () => {
    try {
      let data
      if (!movie.selectedCountry) {
        setCountryError('Пожалуйста введите название');
        return;
      }

      if (value.length < 3 || value.length > 12) {
        setNameError('Название страны должно содеражть 3-12 символов');
        return;
      } else if (!/^[а-яА-Я]+$/.test(value)) {
        setNameError('*Название страны должно содеражть только буквы');
        return;
      }

      const formData = new FormData();
      formData.append('Country_id', movie.selectedCountry.Country_id);
      formData.append('Country_name', value);      
      data = await changeCountry(formData).then(() => {
        setValue('');
        movie.setSelectedCountry('');
        setCountryError('');
        setNameError('');
        alert('Страна успешно изменена!')
        onHide()
      });
    } catch (e) {
      alert(e.response.data.message)
    }
  };

  const handleCountrySelect = (country) => {
    movie.setSelectedCountry(country);
    setCountryError('');
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setNameError('');
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Изменить страну</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown>
          <Dropdown.Toggle style={{width: '100%'}}>
            {movie.selectedCountry ? movie.selectedCountry.Country_name : 'Выберите страну'}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{width: '100%'}}>
            {movie.countries.map((country) => (
              <Dropdown.Item style={{width: '100%'}}
                onClick={() => handleCountrySelect(country)}
                key={country.Country_id}
              >
                {country.Country_name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {countryError && <div className="error-message">{countryError}</div>}
        <Form className="mt-3">
          <Form.Control
            value={value}
            onChange={handleChange}
            placeholder={'Введите название страны'}
          />
          {nameError && <div className="error-message">{nameError}</div>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{width: '48%'}} variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button style={{width: '48%'}} variant="primary" onClick={updateCountry}>
          Изменить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default ChangeCountry;