import React, { useContext } from "react";
import {Link} from 'react-router-dom'
import MyButton from "../button/MyButton";
import { AuthContext } from "../../../context";


const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  const logOut = () => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }

  return (
    <div className="navbar">
      <div className="navbar__links">
        <Link to="/posts">Посты</Link>
        <Link to="/about">О сайте</Link>
        <MyButton onClick={() => 
          logOut()
        }>Выйти</MyButton>
      </div>
    </div>
  )
}

export default Navbar;