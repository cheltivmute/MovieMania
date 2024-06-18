import React, { useContext, useState} from 'react'
import { Dropdown} from 'react-bootstrap';
import { Context } from "../../index";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteCountry } from '../../http/movieAPI'
import { observer } from 'mobx-react-lite';
import AcceptModal from './AcceptModal';

const DeleteCountry = observer(({show, onHide}) => {
    const {movie} = useContext(Context)
    const [error, setError] = useState('')
    const [showAcceptModal, setAcceptShowModal] = useState(false);

    const delCountry = async () => {
      try {
          let data;
          data = await deleteCountry(movie.selectedCountry.Country_id).then((data) => {
            alert('Вы успешно удалили страну!')
            movie.setSelectedCountry('');
            onHide()
        })
      } catch (e) {
        alert(e.response.data.message)
      }
        
    }    

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить страну</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Dropdown>
                <Dropdown.Toggle style={{width: '100%'}}>{movie.selectedCountry.Country_name || 'Выберите страну'}</Dropdown.Toggle>
                <Dropdown.Menu style={{width: '100%'}}>
                    {movie.countries.map(country =>
                        <Dropdown.Item style={{width: '100%'}} onClick={() => movie.setSelectedCountry(country)} key={country.Country_id}>{country.Country_name}</Dropdown.Item>
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
                if(!movie.selectedCountry.Country_id) {
                    setError('*Выберите страну!')
                } else {
                    setAcceptShowModal(true)
                }                
            }}>
            Удалить
          </Button>
        </Modal.Footer>
        <AcceptModal
          let message={'Вы уверены, что хотите удалить эту страну?'}
          show={showAcceptModal} 
          onHide={(answer) => {
          if(answer) {
            delCountry();
          } else {              
            alert('Вы отказались от удаления страны!')
          }                    
          setAcceptShowModal(false);                      
          }}
        />
      </Modal>
  );
})

export default DeleteCountry;