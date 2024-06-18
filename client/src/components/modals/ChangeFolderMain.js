import React, { useContext, useState} from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { changeFolder} from '../../http/movieAPI'
import { observer } from 'mobx-react-lite';
import { Context } from '../..';


const ChangeFolderMain = observer(({
        show,
        onHide,
        folderName,
        folderDescr,
        folderId,
    }) => {
    const {user} = useContext(Context)
    const [file, setFile] = useState(null)

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const updateFolder = () => {
        const formData = new FormData()
        formData.append('User_id', user.userID)
        formData.append('Folder_id', folderId)
        formData.append('Folder_name', folderName)
        if(file) {
            formData.append('Cover', file)
        } else {
            formData.append('Cover', null)
        }
        formData.append('Description', folderDescr)
        changeFolder(formData).then((data) => {
            alert('Вы успешно изменили обложку папки!')
            onHide()
        })        
    }
    
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
            <Modal.Title>Изменить папку</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>             
                    <Form.Control
                        placeholder='Добавить обложку'
                        type='file'
                        style={{width: '100%'}}
                        onChange={selectFile}
                    />                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button style={{width: '48%'}} variant="secondary" onClick={() => {
                    onHide()
                }}>
                Закрыть
            </Button>
            <Button style={{width: '48%'}} variant="primary" onClick={updateFolder}>
                Изменить
            </Button>
            </Modal.Footer>
        </Modal>
    );
})

export default ChangeFolderMain;