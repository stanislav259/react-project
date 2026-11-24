import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import { AuthContext } from "../context";
import AuthService from "../API/AuthService";
import classes from "./Register.module.css";

const Register = () => {
  const { setIsAuth, setUserData } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const data = await AuthService.register(username, password, email);
      if (data?.jwt) {
        if (setUserData && data.user) {
          setUserData({ username: data.user.username, email: data.user.email });
        }
        setIsAuth(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <div className={classes.authCard}>
        <h1 className={classes.title}>Регистрация</h1>
        <p className={classes.subtitle}>Создайте новый аккаунт</p>

        <form className={classes.form} onSubmit={handleRegister}>
          <MyInput
            type="text"
            placeholder="Имя пользователя (логин)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={3}
            required
          />
          <MyInput
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <MyInput
            type="password"
            placeholder="Пароль (минимум 6 символов)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          {error && <div className={classes.errorBox}>{error}</div>}

          <div className={classes.btnWrapper}>
            <MyButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
            </MyButton>
          </div>
        </form>

        <p className={classes.switchAuth}>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
