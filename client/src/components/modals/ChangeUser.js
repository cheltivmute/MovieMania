import React, {useContext, useState} from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {changeUser} from '../../http/movieAPI'
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

const ChangeUser = observer(({
        show,
        onHide,
        username,
        setUsername,
        email,
        setEmail,
        bdDate,
        setBDdate,
    }) => {
    const {user} = useContext(Context)
    const [file, setFile] = useState(null)

    const [errorUsername, setUsernameError] = useState('');
    const [errorEmail, setEmailError] = useState('');
    const [errorDate, setDateError] = useState('');
    const [errorAvatar, setAvatarError] = useState('');

    const validateForm = () => {
      let isValid = true;

      if (username.length < 3 || username.length > 12) {
        setUsernameError('*Имя пользователя должно содержать 3-12 символов!')
        isValid = false;
      } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
        setUsernameError('*Имя пользователя должно содержать только латинские буквы или цифры!')
        isValid = false;
      }
      else {
        setUsernameError('');
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailError('*Почта должна соответствовать формату xxx@xxx.xxx !')
        isValid = false;
      }
      else if (!email) {
        setEmailError('*Пожалуйста введите почту!');
        isValid = false;
      }
      else {
        setEmailError('')
      }

      if (!bdDate) {
        setDateError('*Пожалуйста введите дату рождения!');
        isValid = false;
      }    
      else if (new Date(bdDate) > new Date()) {
        setDateError('*Дата рождения не должна быть в будущем:)');
          isValid = false;
      }
      else {
        setDateError('');
      }
  
      return isValid;
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const updateUser = async () => {
      if (!validateForm()) {
        return;
      } else {
        try {
          let data
          const formData = new FormData()
          formData.append('User_id', user.userID)
          formData.append('Username', username)
          formData.append('Email', email)
          formData.append('Birthday_date', bdDate)
          if(file) {
              formData.append('Avatar', file)
          } else {
              formData.append('Avatar', null)
          }
          data = await changeUser(formData).then(() => {
            alert('Информация об аккаунте успешно изменена!')
            onHide()
          })
        } catch (e) {
          alert(e.response.data.message)
        }
      }
    }
    
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать информацию</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Label>Ааватар:</Form.Label>
                <Form.Control
                        placeholder='Выберите файл'
                        type="file"
                        style={{width: '100%'}}
                        onChange={selectFile}
                />
                {errorAvatar && <div>{errorAvatar}</div>}
                <Form.Label className='mt-3'>Имя пользователя:</Form.Label>
                <Form.Control
                        placeholder='Введите имя пользователя'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                />
                {errorUsername && <div>{errorUsername}</div>}
                <Form.Label className='mt-3'>Почта:</Form.Label>
                <Form.Control
                        placeholder='Введите почту'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                />
                {errorEmail && <div>{errorEmail}</div>}
                <Form.Label className='mt-3'>Дата рождения: {new Date(bdDate).toLocaleDateString()}</Form.Label>
                <Form.Control
                        placeholder='Введите дату'
                        type='date'
                        value={bdDate}
                        onChange={e => setBDdate(e.target.value)}
                />
                {errorDate && <div>{errorDate}</div>}
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{width: '48%'}} variant="secondary" onClick={onHide}>
            Закрыть
          </Button>
          <Button style={{width: '48%'}} variant="primary" onClick={updateUser}>
            Изменить
          </Button>
        </Modal.Footer>
      </Modal>
  );
})

export default ChangeUser;