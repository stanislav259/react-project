import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import MyButton from "../button/MyButton";
import { AuthContext } from "../../../context";

const Navbar = () => {
  const { isAuth, setIsAuth, userData, setUserData } = useContext(AuthContext);

  const logOut = () => {
    setIsAuth(false);
    setUserData({ username: "", email: "" });
    localStorage.removeItem("jwt");
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
          {isAuth && userData?.username && <span>{userData.username}</span>}
          {isAuth && <MyButton onClick={logOut}>Выйти</MyButton>}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;