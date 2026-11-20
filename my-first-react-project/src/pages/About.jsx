import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/UI/button/MyButton";
import classes from "./About.module.css";

const techStack = [
  "React",
  "React Router",
  "CSS Modules",
  "JSONPlaceholder API",
  "Vite",
];

const features = [
  "Загрузка постов и комментариев с внешнего API",
  "Поиск и сортировка списка постов в реальном времени",
  "Пагинация с выбором количества постов на странице",
  "Создание и удаление постов через модальное окно",
  "Приватные и публичные маршруты с авторизацией через Context и localStorage",
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="App">
      <section className={classes.aboutCard}>
        <span className={classes.badge}>О проекте</span>
        <h1 className={classes.title}>ReactPosts — мини-блог на React</h1>
        <p className={classes.description}>
          Небольшое SPA-приложение для работы со списком публикаций. Проект
          создан для практики компонентной архитектуры, маршрутизации,
          кастомных хуков и работы с асинхронными запросами.
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