import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/UI/button/MyButton";
import classes from "./About.module.css";

const techStack = [
  "React",
  "React Router",
  "Context API",
  "REST API / JWT",
  "CSS Modules",
  "Vite",
];

const features = [
  "Регистрация и авторизация пользователей с сохранением и проверкой JWT-токена",
  "Защищённые и публичные маршруты с управлением доступом через AuthContext",
  "Загрузка списка постов и комментариев с внешнего API",
  "Поиск, фильтрация и сортировка публикаций в реальном времени",
  "Пагинация с выбором количества постов на странице",
  "Создание и удаление постов через модальное окно",
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="App">
      <section className={classes.aboutCard}>
        <span className={classes.badge}>О проекте</span>
        <h1 className={classes.title}>ReactPosts - SPA-приложение на React</h1>
        <p className={classes.description}>
          Одностраничное веб-приложение с полноценной системой регистрации,
          авторизации по JWT-токену и управлением публикациями. Проект создан
          для практики компонентной архитектуры, защищённой маршрутизации,
          кастомных хуков и работы с внешними REST API.
        </p>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>Стек технологий</h2>
          <div className={classes.stackList}>
            {techStack.map((tech) => (
              <span key={tech} className={classes.stackTag}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>Реализованный функционал</h2>
          <ul className={classes.featureList}>
            {features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={classes.actions}>
          <MyButton onClick={() => navigate("/posts")}>
            Перейти к постам →
          </MyButton>
          <a
            href="https://github.com/stanislav259/react-project"
            target="_blank"
            rel="noreferrer"
            className={classes.githubLink}
          >
            Код на GitHub
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
