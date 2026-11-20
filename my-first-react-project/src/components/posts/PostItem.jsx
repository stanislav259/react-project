import React from "react";
import MyButton from "../UI/button/MyButton";
import { useNavigate } from "react-router-dom";

const PostItem = ({props, remove, number}) => {
  const router = useNavigate()

  return (
    <div className="post">
      <div className="post__content">
        <strong>{props.id}. {props.title}</strong>
        <div>{props.body}</div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => router(`/posts/${props.id}`)}>Открыть</MyButton>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => remove(props)}>Удалить</MyButton>
      </div>
    </div>
  );
};

export default PostItem;
