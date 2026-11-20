import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import MyButton from "../button/MyButton";
import { AuthContext } from "../../../context";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logOut = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/posts" className="navbar__brand">
          ReactPosts
        </Link>

        <nav className="navbar__links">
          <NavLink to="/posts">Посты</NavLink>
          <NavLink to="/about">О сайте</NavLink>
          {isAuth && <MyButton onClick={logOut}>Выйти</MyButton>}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;