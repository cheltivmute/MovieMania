import React, { useContext, useState, useEffect } from 'react'
import { Dropdown, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from "../../index";
import { changeMovie, fetchGenre, fetchCountry} from '../../http/movieAPI'
import { observer } from 'mobx-react-lite';

const ChangeMovie = observer(({
        show,
        onHide,
        movID,
        newTitle,
        setNewTitle,
        newDuration,
        setNewDuration,
        newBudget,
        setNewBudget,
        newDescription,
        setNewDescription,
        newReleaseDate,
        setNewRealeaseDate,
    }) => {
    const {movie} = useContext(Context)
    const [file, setFile] = useState(null)
    const [errorTitle, setErrorTitle] = useState('');
    const [errorDuration, setErrorDuration] = useState('');
    const [errorBudget, setErrorBudget] = useState('');
    const [errorGenre, setErrorGenre] = useState('');
    const [errorSecondGenre, setErrorSecondGenre] = useState('');
    const [errorCountry, setErrorCountry] = useState('');
    const [errorDate, setErrorDate] = useState('');
    const [errorCover, setErrorCover] = useState('');
    const [errorDescription, setErrorDescription] = useState('');

    useEffect( () => {
        fetchGenre().then(data => movie.setGenres(data))
        fetchCountry().then(data => movie.setCountries(data))
      }, [movie])

      const validateForm = () => {
        let isValid = true;

        if(!newTitle) {
            setErrorTitle('*Пожалуйста введите название!');
            isValid = false;
        }
        else if (newTitle.length > 35) {
            setErrorTitle('*Название должно содержать до 35 символов!');
            isValid = false;
        }
        else if (!/^[a-zA-Zа-яА-Я0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/.test(newTitle)) {
            setErrorTitle('*Название должно содержать буквы, цифры, пробелы, и спец. символы!');
            isValid = false;
        } else {
            setErrorTitle('');
        }

        if(!newDuration) {
            setErrorDuration('*Пожалуйста введите длительность!');
            isValid = false;
        } else if (newDuration> 500){
            setErrorDuration('*Длительность не должна превышать 500 минут!');
            isValid = false;
        } else if (!/^\d+$/.test(newDuration)) {
            setErrorDuration('*Длительность должна содержать только цифры!');
            isValid = false;
        } else {
            setErrorDuration('');
        }
        
        if(!newBudget) {
            setErrorBudget('*пожалуйста введите бюджет!');
            isValid = false;
        } else if (newBudget > 999999999){
            setErrorBudget('*Бюджет не должен превышать 999999999$!');
            isValid = false;
        } else if (!/^\d+$/.test(newBudget)) {
            setErrorBudget('*Бюджет должен содержать только цифры!');
            isValid = false;
        } else {
            setErrorBudget('');
        }
    
        if (!newReleaseDate) {
            setErrorDate('*Пожалуйста введите дату выхода!');
            isValid = false;
        }    
        else if (new Date(newReleaseDate) > new Date()) {
            setErrorDate('*Дата выхода не должна быть в будущем!');
            isValid = false;
        } else {
            setErrorDate('');
        }
    
        if (!newDescription) {
            setErrorDescription('*Пожалуйста введите описание!');
            isValid = false;
        }
        else if (newDescription.length > 999) {
            setErrorDescription('Описание не должно превышать 999 символов!');
            isValid = false;
        } else {
            setErrorDescription('');
        }
    
        return isValid;
      }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const updateFolder = async () => {
        if (!validateForm()) {
            return;
        } else {
            try {
                let data
                const formDataMovie = new FormData()
                formDataMovie.append('Movie_id', movID)
                formDataMovie.append('Title', newTitle)
                formDataMovie.append('Genre_id', movie.selectedGenre.Genre_id)
                formDataMovie.append('Genre_second_id', movie.selectedSecondGenre.Genre_second_id)
                formDataMovie.append('Country_id', movie.selectedCountry.Country_id)
                formDataMovie.append('Cover', file)
                formDataMovie.append('Duration', newDuration)
                formDataMovie.append('Budget', newBudget)
                formDataMovie.append('Description', newDescription)
                formDataMovie.append('Release_date', newReleaseDate) 
                data = await changeMovie(formDataMovie).then(() => {                    
                    alert('Фильм успешно изменён!');
                    setErrorTitle('');
                    setErrorGenre('');
                    setErrorSecondGenre('');
                    setErrorCountry('');
                    setErrorDate('');
                    setErrorCover('');
                    setErrorDescription('');
                    setErrorDuration('');
                    setErrorBudget('');
                    movie.setSelectedGenre('');
                    movie.setSelectedSecondGenre('');
                    movie.setSelectedCountry('');
                    onHide()
                }) 
            } catch (e) {
                alert(e.response.data.message);
            }
        }
    }
    
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
            <Modal.Title>Изменить информацию о фильме</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Обложка:</Form.Label>
                    <Form.Control
                            style={{width: '100%'}}
                            placeholder='Select cover'
                            type="file"
                            onChange={selectFile}
                    />
                    {errorCover && <div>{errorCover}</div>}
                    <Form.Label className='mt-3'>Название:</Form.Label>
                    <Form.Control
                            placeholder='Введите название'
                            value={newTitle}
                            onChange={e => setNewTitle(e.target.value)}
                    />
                    {errorTitle && <div>{errorTitle}</div>}
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle style={{width: '100%'}}>{movie.selectedGenre.Genre_name || 'Изменить главный жанр'}</Dropdown.Toggle>
                        <Dropdown.Menu style={{width: '100%'}}>
                            {movie.genres.map(genre =>
                                <Dropdown.Item style={{width: '100%'}} onClick={() => movie.setSelectedGenre(genre)} key={genre.Genre_id}>{genre.Genre_name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    {errorGenre && <div>{errorGenre}</div>}
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle style={{width: '100%'}}>{movie.selectedSecondGenre.Genre_name || 'Изменить второй жанр'}</Dropdown.Toggle>
                        <Dropdown.Menu style={{width: '100%'}}>
                            {movie.secondGenres.map(secondGenre =>
                                <Dropdown.Item style={{width: '100%'}} onClick={() => movie.setSelectedSecondGenre(secondGenre)} key={secondGenre.Genre_second_id}>{secondGenre.Genre_name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    {errorSecondGenre && <div>{errorSecondGenre}</div>}
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle style={{width: '100%'}}>{movie.selectedCountry.Country_name || 'Изменить страну'}</Dropdown.Toggle>
                        <Dropdown.Menu style={{width: '100%'}}>
                            {movie.countries.map(country =>
                                <Dropdown.Item style={{width: '100%'}} onClick={() => movie.setSelectedCountry(country)} key={country.Country_id}>{country.Country_name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    {errorCountry && <div>{errorCountry}</div>}
                    <Form.Label className='mt-3'>Длительность:</Form.Label>
                    <Form.Control
                            placeholder='Введите длительность'
                            value={newDuration}
                            onChange={eq => setNewDuration(eq.target.value)}
                    />
                    {errorDuration && <div>{errorDuration}</div>}   
                    <Form.Label className='mt-3'>Бюджет:</Form.Label>
                    <Form.Control
                            placeholder='Введите бюджет'
                            value={newBudget}
                            onChange={ee => setNewBudget(ee.target.value)}
                    />
                    {errorBudget && <div>{errorBudget}</div>}               
                    <Form.Label className='mt-3'>Дата выхода: {new Date(newReleaseDate).toLocaleDateString()}</Form.Label>
                    <Form.Control
                            placeholder='Введите дату выхода'
                            type='date'
                            value={newReleaseDate}
                            onChange={e => setNewRealeaseDate(e.target.value)}
                    />
                    {errorDate && <div>{errorDate}</div>}
                    <Form.Group className="mt-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Описание:</Form.Label>
                        {errorDescription && <div>{errorDescription}</div>}
                        <Form.Control
                            value={newDescription}
                            onChange={e => setNewDescription(e.target.value)}
                            as="textarea"
                            rows={5}
                        />
                    </Form.Group>
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

export default ChangeMovie;