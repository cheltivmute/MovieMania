import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter"
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userAPI";
import { Spinner } from 'react-bootstrap'
import './components/css/MovieItem.css'

const App = observer( () => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  const isAdminCheck = localStorage.getItem('isAdmin');
  const userIDcheck = localStorage.getItem('userID');

  const fetchData = async () => {
    try {
      let data    
      data = await check().then(() => {
        user.setUser(data);
        user.setUserID(userIDcheck);
        
        if (isAdminCheck) {
           user.setIsAdmin(true);
          localStorage.setItem('isAdmin', true); 
        }
        user.setIsAuth(true);
      });
    } catch (error) {
      //alert(error.response.data.message)        
      console.error('Ошибка при выполнении запроса:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (!user.isAuth) { // Добавляем условие, чтобы эффект сработал только при отсутствии аутентификации
      setLoading(true);
      fetchData();
    }
  }, [user.isAuth]); // Добавляем user.isAuth в массив зависимостей

  if (loading) {
    return <Spinner animation={'grow'}/>
  }

  return (    
    <BrowserRouter>
      <div className="image-overlay"></div>
      <div className="image-overlay1"></div>
        <NavBar />
        <AppRouter />
    </BrowserRouter>
  )
})

export default App;