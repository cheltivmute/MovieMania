import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AcceptModal = ({message, show, onHide }) => {
    let answer = false;
    return(
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Подтверждение</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button style={{width: '48%'}} variant="secondary" onClick={() => {
            answer = false;
            onHide(answer)
          }}>
            Отмена
          </Button>
          <Button style={{width: '48%'}} variant="primary" onClick={() => {
            answer = true;
            onHide(answer)
          } }>
            Подтвердить
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AcceptModal;