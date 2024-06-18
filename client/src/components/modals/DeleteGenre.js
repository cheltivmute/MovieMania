import React, { useContext, useState} from 'react'
import { Dropdown} from 'react-bootstrap';
import { Context } from "../../index";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteGenre } from '../../http/movieAPI'
import { observer } from 'mobx-react-lite';
import AcceptModal from './AcceptModal';

const DeleteGenre = observer(({show, onHide}) => {
    const {movie} = useContext(Context)
    const [error, setError] = useState('')
    const [showAcceptModal, setAcceptShowModal] = useState(false);

    const delGenre = async () => {
      try {
          let data;
          data = await deleteGenre(movie.selectedGenre.Genre_id, movie.selectedSecondGenre.Genre_id).then((data) => {
            alert('Вы успешно удалили жанр!')
            movie.setSelectedGenre('');
            onHide()
          })
      } catch (e) {
        alert(e.response.data.message)
      }
        
    }    

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить жанр</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Dropdown>
                <Dropdown.Toggle style={{width: '100%'}}>{movie.selectedGenre.Genre_name || 'Выберите жанр'}</Dropdown.Toggle>
                <Dropdown.Menu style={{width: '100%'}}>
                    {movie.genres.map(genre =>
                        <Dropdown.Item style={{width: '100%'}} onClick={() => {movie.setSelectedGenre(genre); movie.setSelectedSecondGenre(genre)}} key={genre.Genre_id}>{genre.Genre_name}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
                {error && (<div>{error}</div>)}
            </Dropdown>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{width: '48%'}} variant="secondary" onClick={onHide}>
            Закрыть
          </Button>
          <Button style={{width: '48%'}} variant="primary" onClick={() => {
              if(!movie.selectedGenre.Genre_id) {
                setError('*Выберите жанр!')
              } else {
                setAcceptShowModal(true)
              }
            }}>
            Удалить
          </Button>
        </Modal.Footer>
        <AcceptModal
          let message={'Вы уверены, что хотите удалить этот жанр?'}
          show={showAcceptModal} 
          onHide={(answer) => {
          if(answer) {
            delGenre();
          } else {              
            alert('Вы отказались от удаления жанра!')
          }                    
          setAcceptShowModal(false);                      
          }}
        />
      </Modal>
  );
})

export default DeleteGenre;