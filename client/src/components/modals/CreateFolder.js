import React, { useContext, useState, useEffect} from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from "../../index";
import { createFolder} from '../../http/movieAPI'
import { observer } from 'mobx-react-lite';


const CreateFolder = observer(({show, onHide}) => {
    const {user} = useContext(Context)
    const [title, setTitle] = useState('')
    const [file, setFile] = useState(null)
    const [description, setDescription] = useState(null)
    const [errorTitle, setErrorTitle] = useState('');
    const [errorCover, setErrorCover] = useState('');
    const [errorDescription, setErrorDescription] = useState('');

    const validateForm = () => {
        let isValid = true;
        if(!title) {
            setErrorTitle('*Пожалуйста введит название папки!');
            isValid = false;
        }
        else if (title.length > 13) {
            setErrorTitle('*Название папки должно содержать до 13 символов');
            isValid = false;
        }
        else if (!/^[a-zA-Zа-яА-Я0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/.test(title)) {
            setErrorTitle('*Название папки должно содержать буквы, цифры, пробелы, и спец. символы');
            isValid = false;
        } else {
            setErrorTitle('');
        }
     
    
        if (!file) {
            setErrorCover('*Пожалуйста выберите файл!');
            isValid = false;
        } else {
            setErrorCover('');
        }
    
        if (!description) {
            setErrorDescription('*Пожалуйста введите описание!');
            isValid = false;
        }
        else if (description.length > 110) {
            setErrorDescription('Описание должно содержать до 100 символов');
            isValid = false;
        } else {
            setErrorDescription('');
        }
    
        return isValid;
    }
    
    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addFolder = async () => {
        if (!validateForm()) {
            return;
        } else {
            try {
                let data
                const formData = new FormData()
                formData.append('User_id', user.userID)
                formData.append('Folder_name', title)
                formData.append('Cover', file)
                formData.append('Description', description)
                
                data = await createFolder(formData).then(() => {
                    alert('Папка ' + title + ' успешно создана!')
                    setTitle('')
                    setFile(null)
                    setDescription(null)               
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
            <Modal.Title>Добавить новую папку</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className='mt-3'
                        placeholder='Введите название папки'
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
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Input description:</Form.Label>
                        <Form.Control
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            as="textarea"
                            rows={3}
                        />
                    </Form.Group>
                    {errorDescription && <div>{errorDescription}</div>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button style={{width: '48%'}} variant="secondary" onClick={() => {
                    onHide()
                }}>
                Закрыть
            </Button>
            <Button style={{width: '48%'}} variant="primary" onClick={addFolder}>
                Добавить
            </Button>
            </Modal.Footer>
        </Modal>
    );
})

export default CreateFolder;