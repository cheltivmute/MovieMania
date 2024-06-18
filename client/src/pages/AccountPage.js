import React, { useContext, useState, useEffect } from "react";
import { Container, Col, Image, Button, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchFolder, getAllRating, getOneUser } from '../http/movieAPI'
import '../components/css/AccountPage.css'
import ChangeUser from "../components/modals/ChangeUser";
import MovieItem from "../components/MovieItem";

const AccountPage = observer(() => {
  const { movie } = useContext(Context);
  const { user } = useContext(Context);

  const moviesToRender = Array.isArray(movie.accMovies) ? movie.accMovies : [];

  const [changeUserVisible, setChangeUserVisible] = useState(false)

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bdDate, setBDdate] = useState(null);
  
  movie.setFolders(null);

  useEffect(() => {
    getOneUser(user.userID).then((data) => {
      movie.setUsers(data);
    });

    if(user.isAuth) {
      fetchFolder(user.userID).then((data) => {
        movie.setFolders(data.rows)
      })
    }
    getAllRating(user.userID).then((data) => {
      console.log(data.rows.length);
      const newArr = new Array();
      for (let i = 0; i < data.rows.length; i++) {
        newArr.push(data.rows[i].Movie)
      }

      movie.setAccMovies(newArr)
      
      
        
    })
    
  }, [user.userID, movie]);

  return (
    <Container>
      <Col md={12}>
        <div className="div-main-acc">
          <div className="div-image-acc">
            <Image width={298} height={298} style={{objectFit: 'cover'}} src={"http://klyuchna9:5000/" + movie.users.Avatar} />            
          </div>
          <div className="div-info-acc">        
            <div className="div-description-acc">
              <span className="div-description-acc2">Имя пользователя </span><span className="div-description-acc3">{movie.users.Username}</span>
            </div>
            <div className="div-description-acc">
              <span className="div-description-acc2">Почта </span><span className="div-description-acc3">{movie.users.Email}</span>
            </div>
            <div className="div-description-acc">
              <span className="div-description-acc2">Дата рождения </span><span className="div-description-acc3">{new Date(movie.users.Birthday_date).toLocaleDateString()}</span>
            </div>
            <div className="div-description-acc">
              <span className="div-description-acc2">Создан от </span><span className="div-description-acc3">{new Date(movie.users.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <Button
            style={{width: '100%'}}
            variant={'outline-dark'}
            className="mt-2"
            onClick={() => {
                setChangeUserVisible(true);
                setUsername(movie.users.Username)
                setEmail(movie.users.Email)
                setBDdate(movie.users.Birthday_date)
            }}
        >
            Изменить
        </Button>

        <div style={{marginTop: '30px'}} className="div-movieacc-title">Последние оценки</div>
        <Row style={{marginTop: '10px'}} className="d-flex" >
            {moviesToRender.map(movieq =>
                <MovieItem key={movieq.Movie_id} movie={movieq}/>
            )}
        </Row>
        <br/>
        
      </Col>
        <ChangeUser
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            bdDate={bdDate}
            setBDdate={setBDdate}
            
            show={changeUserVisible}            
            onHide={() => {
                setChangeUserVisible(false)
                getOneUser(user.userID).then((data) => {
                    movie.setUsers(data);
                });
            }}
        />
    </Container>
  );
});

export default AccountPage;