import React, { useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { AuthContext } from "./context";
import AuthService from "./API/AuthService";
import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [userData, setUserData] = useState({username: '', email: ''})

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')

    if(jwt) {
      AuthService.getContent(jwt)
      .then((res) => {
        if(res) {
          setIsAuth(true)
          setUserData({username: res.username, email: res.email});
        }
      })
      .catch(() => {
        localStorage.removeItem('jwt')
      })
      .finally(() => {
        setLoading(false)
      })
    }else{
      setLoading(false)
    }
  }, [])
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        isLoading,
        userData,
        setUserData,
      }}
    >
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}


export default App
