import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../components/hooks/useFetching";
import PostService from "../components/API/PostService";
import MyLoader from "../components/UI/loader/MyLoader";


const PostIdPage = () => {
  const params = useParams()
  const [post, setPost] = useState({})
  const [comments, setComments] = useState([]) 
  const [fetchById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(params.id)
    setPost(response.data)
  }) 

  const [fetchComment, isComLoading, comError] = useFetching(async (id) => {
    const response = await PostService.getCommentsByPostsId(params.id)
    setComments(response.data)
  })

  useEffect(() => {
    fetchById(params.id)
    fetchComment(params.id)
  }, [])

  return (
    <div>
      <h1>Страница поста с ID №{params.id}</h1>
      {isLoading
        ? <MyLoader />
        : <div>{post.id}. {post.title}</div>
      }
      <h1>Комментарии</h1>
      {isComLoading
        ? <MyLoader />
        : <div>{comments.map(comm => 
          <div key={comm.id} className="comment" style={{marginTop: "15px"}}>
            <h4>{comm.email}</h4>
            <div>{comm.body}</div>
          </div>
        )}</div>
      }
    </div>
  );
};

export default PostIdPage;