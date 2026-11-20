import React, { useEffect, useState } from "react"
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import AppRouter from './components/AppRouter'
import { AuthContext } from "./context"

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if(localStorage.getItem('auth')){
      setIsAuth(true)
    }
    setLoading(false)
  }, [])
  return (
    <div>
      <AuthContext.Provider
        value={{
          isAuth,
          setIsAuth,
          isLoading
        }}
      >
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthContext.Provider> 
    </div>
  )
}

export default App
