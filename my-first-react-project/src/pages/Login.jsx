import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { AuthContext } from "../context";
import AuthService from "../API/AuthService";
import classes from "./Login.module.css";

const Login = () => {
  const { setIsAuth, setUserData } = useContext(AuthContext);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const data = await AuthService.authorize(identifier, password);
      if (data?.jwt) {
        if (setUserData && data.user) {
          setUserData({ username: data.user.username, email: data.user.email });
        }
        setIsAuth(true);
      }
    } catch (err) {
      setError("Неверный логин/email или пароль");
    }
  };

  return (
    <div className="App">
      <div className={classes.authCard}>
        <h1 className={classes.title}>Вход в аккаунт</h1>
        <p className={classes.subtitle}>
          Введите логин или e-mail и пароль
        </p>

        <form className={classes.form} onSubmit={login}>
          <MyInput
            type="text"
            placeholder="Логин или E-mail"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <MyInput
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

          <div className={classes.btnWrapper}>
            <MyButton type="submit">Войти</MyButton>
          </div>
        </form>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Ещё нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
