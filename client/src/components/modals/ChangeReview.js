import React, {useState, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {changeReview, fetchOneMovie} from '../../http/movieAPI'
import { observer } from 'mobx-react-lite';
import { Context } from "../../index";

const ChangeReview = observer(({show, onHide, reviewText, setReviewText, reviewId}) => {
    const [movie, setMovies] = useState({info: [], })
    const [error, setError] = useState('');
    const {Movie_id} = useParams()

    useEffect(() => {
        fetchOneMovie(Movie_id).then(data => setMovies(data))
    }, [])

    const updateReview = async () => {
      try{        
        if(!reviewText) {
          setError('*Пожалуйста введите значение!')
          return;
        }
        if(reviewText.length > 1000) {
          setError('*Комментарий должен содержать до 1000 символов!')
          return;
        }
        let data
        data = await changeReview(reviewId, reviewText).then(() => {
          alert('Обзор успешно изменен!')
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
          <Modal.Title>Изменить комментарий</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Label>Фильм: {movie.Title}</Form.Label>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Комментарий:</Form.Label>
                    <Form.Control
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}
                        as="textarea"
                        rows={5}
                    />
                </Form.Group>
                {error && <div>{error}</div>}
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{width: '48%'}} variant="secondary" onClick={onHide}>
            Закрыть
          </Button>
          <Button style={{width: '48%'}} variant="primary" onClick={updateReview}>
            Изменить
          </Button>
        </Modal.Footer>
      </Modal>
  );
})

export default ChangeReview;