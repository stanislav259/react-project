import React, { useContext } from "react";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { AuthContext } from "../context";
import classes from "./Login.module.css";

const Login = () => {
  const { setIsAuth } = useContext(AuthContext);

  const login = (event) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem("auth", "true");
  };

  return (
    <div className="App">
      <div className={classes.authCard}>
        <h1 className={classes.title}>Вход в аккаунт</h1>
        <p className={classes.subtitle}>
          Введите любые данные для входа в демо-режим
        </p>

        <form className={classes.form} onSubmit={login}>
          <MyInput type="text" placeholder="Логин" required />
          <MyInput type="password" placeholder="Пароль" required />
          <div className={classes.btnWrapper}>
            <MyButton>Войти</MyButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;