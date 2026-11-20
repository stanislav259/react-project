import React, { useState, useEffect } from "react";
import PostList from "../components/posts/PostList.jsx";
import PostFilter from "../components/posts/PostFilter.jsx";
import MyLoader from "../components/UI/loader/MyLoader.jsx";
import Pagination from "../components/UI/pagination/Pagination.jsx";
import MySelect from "../components/UI/select/MySelect.jsx";
import { usePosts } from "../hooks/usePosts.js";
import { useFetching } from "../hooks/useFetching.js";
import PostService from "../API/PostService.js";
import { getPagesCount } from "../utils/pages.js";
import classes from "./Posts.module.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ selectedSort: "", searchQuery: "" });

  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const sortedAndSearchedPosts = usePosts(
    posts,
    filter.selectedSort,
    filter.searchQuery
  );

  const [fetchPosts, isLoading, error] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPagesCount(totalCount, limit));
  });

  useEffect(() => {
    fetchPosts();
  }, [page, limit]);

  const removePost = (post) => {
    setPosts((prev) => prev.filter((p) => p.id !== post.id));
  };

  const changePage = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLimitChange = (value) => {
    setLimit(Number(value));
    setPage(1);
  };

  return (
    <div className="App">
      <div className={classes.postsHeader}>
        <h1>Лента постов</h1>
      </div>

      <div className={classes.postsToolbar}>
        <PostFilter filter={filter} setFilter={setFilter} />
        <MySelect
          value={limit}
          onChange={handleLimitChange}
          defaultValue="Постов на странице"
          options={[
            { value: 5, name: "По 5" },
            { value: 10, name: "По 10" },
            { value: 25, name: "По 25" },
          ]}
        />
      </div>

      {error && (
        <div className={classes.errorBox}>Произошла ошибка: {error}</div>
      )}

      {isLoading ? (
        <MyLoader />
      ) : (
        <PostList
          remove={removePost}
          posts={{ title: "Список постов", items: sortedAndSearchedPosts }}
        />
      )}

      <Pagination page={page} totalPages={totalPages} changePage={changePage} />
    </div>
  );
};

export default Posts;