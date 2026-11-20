import React from "react";
import PostItem from "./PostItem.jsx";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const PostList = ({ posts, remove}) => {
  if (!posts.items.length) {
    return (
      <h1 style={{textAlign: 'center'}}>Посты не найдены!</h1>
    );
  }
  
  return (
  <div>
    <h1 style={{textAlign: 'center'}}>{posts.title}</h1>
    <TransitionGroup>
      {posts.items.map((post, index) => {
        const nodeRef = React.createRef(null);
        return (
          <CSSTransition
            key={post.id}
            nodeRef={nodeRef}
            timeout={500}
            classNames="post"
          >
            <div ref={nodeRef}>
              <PostItem remove={remove} number={index + 1} props={post} />
            </div>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  </div>
);
};

export default PostList;
