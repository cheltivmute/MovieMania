import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createCountry } from '../../http/movieAPI';
import { observer } from 'mobx-react-lite';

const CreateCountry = observer(({ show, onHide }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const addCountry = async () => {
    try {
      let data;
      if (value.length < 3 || value.length > 12) {
        setError('Название страны должно содержать 3-12 символов!');
        return;
      } else if (!/^[а-яА-Я]+$/.test(value)) {
        setError('*Название страны должно содержать только буквы!');
        return;
      }

      data = await createCountry({ Country_name: value }).then(() => {
        setValue('');
        setError('');
        alert('Страна ' + value + ' успешно добавлена!')
        onHide();
      });
    } catch (e) {
      alert(e.response.data.message)
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setError('');
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить новую страну</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={handleChange}
            placeholder={'Введите название страны'}
          />
          {error && <div className="error-message">{error}</div>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{width: '48%'}} variant="secondary" onClick={onHide}>
          Закрыть
        </Button>
        <Button style={{width: '48%'}} variant="primary" onClick={addCountry}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateCountry;