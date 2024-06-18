import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserLib from './movieLib/UserLib';
import MovieLib from './movieLib/MovieLib';

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
    user: new UserLib(),
    movie: new MovieLib(),
  }}>
    <App />
  </Context.Provider>,  
  document.getElementById('root')
);