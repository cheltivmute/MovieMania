import React, {useState, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {createReview, fetchOneMovie} from '../../http/movieAPI'
import { observer } from 'mobx-react-lite';
import { Context } from "../../index";

const CreateReview= observer(({show, onHide}) => {
    const [movie, setMovies] = useState({info: [], })
    const {Movie_id} = useParams()
    const {user} = useContext(Context)
    const [value, setValue] = useState('')
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOneMovie(Movie_id).then(data => setMovies(data))
    }, [])

    const addReview = async () => {
      try {
        if(!value) {
          setError('*Пожалуйста введите значение!')
          return;
        }
        if(value.length > 1000) {
          setError('*Комментарий не должен превышать 1000 символов!')
          return;
        }

        let data
        data = await createReview(user.userID, Movie_id, value).then(() => {
            alert('Обзор успешно добавлен!')
            setValue('')
            setError('')
            onHide()
        })
      } catch (e) {
        alert(e.response.data.message)
      }
    }

  return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить комментарий</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Label>Фильм: {movie.Title}</Form.Label>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Введите комментарий:</Form.Label>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        as="textarea"
                        rows={5}
                    />
                    {error && <div>{error}</div>}
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{width: '48%'}} variant="secondary" onClick={onHide}>
            Закрыть
          </Button>
          <Button  style={{width: '48%'}} variant="primary" onClick={addReview}>
            Добавить
          </Button>
        </Modal.Footer>
      </Modal>
  );
})

export default CreateReview;