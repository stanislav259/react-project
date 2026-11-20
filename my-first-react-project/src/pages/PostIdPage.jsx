import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";
import MyLoader from "../components/UI/loader/MyLoader";
import MyButton from "../components/UI/button/MyButton";
import classes from "./PostIdPage.module.css";

const PostIdPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });

  const [fetchComment, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostsId(id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchById(params.id);
    fetchComment(params.id);
  }, [params.id]);

  return (
    <div className="App">
      {error && (
        <div className={classes.errorBox}>Ошибка загрузки поста: {error}</div>
      )}

      {isLoading ? (
        <MyLoader />
      ) : (
        <>
          <article className={classes.postCardFull}>
            <span className={classes.postBadge}>Пост #{post.id}</span>
            <h1 className={classes.postTitle}>{post.title}</h1>
            <p className={classes.postBody}>{post.body}</p>
          </article>

          <div className={classes.backBtnWrapper}>
            <MyButton onClick={() => navigate(-1)}>← Назад</MyButton>
          </div>
        </>
      )}

      <h2 className={classes.commentsTitle}>
        Комментарии ({comments.length})
      </h2>

      {comError && (
        <div className={classes.errorBox}>
          Ошибка комментариев: {comError}
        </div>
      )}

      {isComLoading ? (
        <MyLoader />
      ) : (
        <div className={classes.commentsList}>
          {comments.map((comm) => (
            <div key={comm.id} className={classes.commentCard}>
              <div className={classes.commentCardAuthor}>{comm.email}</div>
              <div className={classes.commentCardBody}>{comm.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;