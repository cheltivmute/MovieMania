import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Row, Image } from "react-bootstrap";
import CreateGenre from '../components/modals/CreateGenre'
import ChangeGenre from '../components/modals/ChangeGenre'
import DeleteGenre from '../components/modals/DeleteGenre'
import CreateCountry from '../components/modals/CreateCountry'
import ChangeCountry from '../components/modals/ChangeCountry'
import CreateMovie from '../components/modals/CreateMovie'
import { changeUserIsBlock, changeUserRole, getAllUsers, fetchGenre, fetchCountry, fetchSecondGenre } from "../http/movieAPI";
import '../components/css/AdminPage.css'
import { observer } from "mobx-react-lite";
import { Context } from "..";
import DeleteCountry from "../components/modals/DeleteCountry";

const Admin = observer(() => {
  const [users, setUsers] = useState([])
  const {movie} = useContext(Context)
  const {user} = useContext(Context)

  useEffect(() => {
    getAllUsers().then((data) => {      
      setUsers(data.rows)
    })
    fetchGenre().then(data => movie.setGenres(data))
    fetchSecondGenre().then(data => movie.setSecondGenres(data))
    fetchCountry().then(data => movie.setCountries(data))
    
  }, [movie])

  const usersToRender  = Array.isArray(users) ? users : [];
  

  const [genreVisible, setGenreVisible] = useState(false)
  const [changeGenreVisible, setChangeGenreVisible] = useState(false)
  const [deleteGenreVisible, setDeleteGenreVisible] = useState(false)
  const [countryVisible, setCountryVisible] = useState(false)
  const [changeCountryVisible, setChangeCountryVisible] = useState(false)
  const [deleteCountryVisible, setDeleteCountryVisible] = useState(false)
  const [movieVisible, setMovieVisible] = useState(false)

  const updateUserRole = (usID, roleUser) => {
    if (usID !== user.userID) {
      if (roleUser === 'USER') {
        changeUserRole(usID, 'ADMIN').then(() => {
          getAllUsers().then((data) => {      
            setUsers(data.rows)
          })
        })
      } else {
        changeUserRole(usID, 'USER').then(() => {
          getAllUsers().then((data) => {      
            setUsers(data.rows)
          })
        })
      }
    } else {
      alert('Вы не можете поменять свою роль!')
    }
    
    
  }

  const updateIsBlocked = (usID, gang) => {
    if(usID !== user.userID) {
      if(gang) {
        changeUserIsBlock(usID, false).then(() => {
          getAllUsers().then((data) => {      
            setUsers(data.rows)
          })
        })
      } else {
        changeUserIsBlock(usID, true).then(() => {
          getAllUsers().then((data) => {      
            setUsers(data.rows)
          })
        })
      }
    } else {
      alert('Вы не можете заблокировать самого себя!')
    }
    
    
  }

  return (
    <Container className="d-flex flex-column" style={{padding: '0px'}}>
      
      <Button 
        variant={'outline-dark'}
        className="mt-2"
        onClick={() => setGenreVisible(true)}
      >
        Добавить жанр
      </Button>

      <Button 
        variant={'outline-dark'}
        className="mt-2"
        onClick={() => setChangeGenreVisible(true)}
      >
        Изменить жанр
      </Button>

      <Button 
        variant={'outline-dark'}
        className="mt-2"
        onClick={() => setDeleteGenreVisible(true)}
      >
        Удалить жанр
      </Button>

      <br/>

      <Button 
        variant={'outline-dark'}
        className="mt-4"
        onClick={() => setCountryVisible(true)}
      >
        Добавить страну
      </Button>

      <Button 
        variant={'outline-dark'}
        className="mt-2"
        onClick={() => setChangeCountryVisible(true)}
      >
        Изменить страну
      </Button>

      <Button 
        variant={'outline-dark'}
        className="mt-2"
        onClick={() => setDeleteCountryVisible(true)}
      >
        Удалить страну
      </Button>

      <br/>

      <Button
        variant={'outline-dark'}
        className="mt-4"
        onClick={() => setMovieVisible(true)}
      >
        Добавить фильм
      </Button>

      <Row className="d-flex mt-5" style={{borderTop: "1px solid black"} }>
          
               <div className="div-users-main">
                  <div className="div-users-image">
                    
                  </div>
                  <div className="div-users-id">
                    ID
                  </div>
                  <div className="div-users-username">
                    Имя
                  </div>
                  <div className="div-users-email">
                    Почта
                  </div>
                  <div className="div-users-bd">
                    ДР
                  </div>
                  <div className="div-users-role">
                    Роль
                  </div>
                  <div className="div-users-isblock">
                    Заблок?
                  </div>
                  <div className="div-users-setrole">
                  </div>
                  <div className="div-users-setblock">
                  </div>
              </div>
      </Row>
      <Row className="d-flex" style={{borderTop: "1px solid black"}}>
          {usersToRender.map(userq =>
               <div key={userq.User_id} className="div-users-main">
                  <div className="div-users-image">
                    <Image width={50} height={50} style={{objectFit: 'cover'}} src={"http://klyuchna9:5000/" + userq.Avatar} />
                  </div>
                  <div className="div-users-id">
                    {userq.User_id}
                  </div>
                  <div className="div-users-username">
                    {userq.Username}
                  </div>
                  <div className="div-users-email">
                    {userq.Email}
                  </div>
                  <div className="div-users-bd">
                    {new Date(userq.Birthday_date).toLocaleDateString()}
                  </div>
                  <div className="div-users-role">
                    {userq.Role}
                  </div>
                  <div className="div-users-isblock">
                    {userq.Is_blocked ? (
                      ':('
                    ): (
                      ':)'
                    )}
                  </div>
                  <div className="div-users-setrole">
                    <Button variant="secondary" onClick={() => {                   
                      updateUserRole(userq.User_id, userq.Role)
                      }}>
                      Изменить роль
                    </Button>
                  </div>
                  <div className="div-users-setblock">
                    
                      <Button variant="secondary" onClick={() => {
                        updateIsBlocked(userq.User_id, userq.Is_blocked)
                        }}>
                        {userq.Is_blocked ? ('Разблокировать'):('Заблокировать')}
                      </Button>
                  </div>
              </div>
          )}
      </Row>
      <br/><br/>

      <CreateGenre show={genreVisible} onHide={() => {
        setGenreVisible(false);
        
        movie.setSelectedGenre('')
        movie.setSelectedSecondGenre('')
        movie.setSelectedCountry('')
        fetchGenre().then(data => movie.setGenres(data))
      }}/>
      <ChangeGenre show={changeGenreVisible} onHide={() => {
        setChangeGenreVisible(false)
        movie.setSelectedGenre('')
        movie.setSelectedSecondGenre('')
        movie.setSelectedCountry('')
        fetchGenre().then(data => movie.setGenres(data))
      }}/>
      <DeleteGenre show={deleteGenreVisible} onHide={() => {
        movie.setSelectedGenre('')
        movie.setSelectedSecondGenre('')
        movie.setSelectedCountry('')
        setDeleteGenreVisible(false)
        fetchGenre().then(data => movie.setGenres(data))
      }}/>

      <CreateCountry show={countryVisible} onHide={() => {
        setCountryVisible(false)
        movie.setSelectedGenre('')
        movie.setSelectedSecondGenre('')
        movie.setSelectedCountry('')
        fetchCountry().then(data => movie.setCountries(data))
      }}/>
      <ChangeCountry show={changeCountryVisible} onHide={() => {
        setChangeCountryVisible(false)
        movie.setSelectedGenre('')
        movie.setSelectedSecondGenre('')
        movie.setSelectedCountry('')
        fetchCountry().then(data => movie.setCountries(data))
        }}/>
      <DeleteCountry show={deleteCountryVisible} onHide={() => {
        movie.setSelectedGenre('')
        movie.setSelectedSecondGenre('')
        movie.setSelectedCountry('')
        setDeleteCountryVisible(false)
        fetchCountry().then(data => movie.setCountries(data))
      }}/>

      <CreateMovie show={movieVisible} onHide={() => {
        movie.setSelectedGenre('')
        movie.setSelectedSecondGenre('')
        movie.setSelectedCountry('')
        setMovieVisible(false)
      }}/>
    </Container>    
  )
})

export default Admin;

