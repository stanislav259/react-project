import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from '../components/UI/button/MyButton'
import classes from "./Error.module.css";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className={classes.errorCard}>
        <span className={classes.code}>404</span>
        <h1 className={classes.title}>Страница не найдена</h1>
        <p className={classes.description}>
          Похоже, вы перешли по несуществующему адресу или страница была удалена.
        </p>
        <MyButton onClick={() => navigate("/posts")}>
          Вернуться к постам
        </MyButton>
      </div>
    </div>
  );
};

export default Error;