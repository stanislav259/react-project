import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import PostList from '../components/PostList.jsx';
import MyButton from '../components/UI/button/MyButton.jsx';
import PostForm from '../components/PostForm.jsx';
import PostFilter from '../components/PostFilter.jsx';
import MyModal from '../components/UI/modal/MyModal.jsx';
import { usePosts } from '../components/hooks/usePosts.js';
import PostService from '../components/API/PostService.js';
import MyLoader from '../components/UI/loader/MyLoader.jsx';
import { useFetching } from '../components/hooks/useFetching.js';
import { getPagesCount } from '../components/utils/pages.js';
import Pagination from '../components/UI/pagination/Pagination.jsx';
import { useObser } from '../components/hooks/useObserver.js';
import MySelect from '../components/UI/select/MySelect.jsx';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ selectedSort: '', searchQuery: '' });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.selectedSort, filter.searchQuery);
  const lastElement = useRef();
  const observer = useRef();

  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isLoading, error] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPagesCount(totalCount, limit));
  });

  useObser(lastElement, page<totalPages, isLoading, () => {
    setPage(page + 1)
  })

  useEffect(() => {
    fetchPosts();
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className='App'>
      <MyButton style={{ margin: '15px 0' }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect value={limit} onChange={value => setLimit(value)} defaultValue={'Кол-во постов на странице'} 
        options={[
          {value: 5, name:"5"},
          {value: 10, name:"10"},
          {value: 25, name:"25"},
        ]}
        />

      {error && <h1>Произошла ошибка {error}</h1>}
      <PostList remove={removePost} posts={{ title: "Список постов", items: sortedAndSearchedPosts }} />
      <div ref={lastElement} style={{ height: 20, background: 'transparent' }} />

      {isLoading && (
        <div className='loader' style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <MyLoader />
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} changePage={changePage} />
    </div>
  );
};

export default Posts;
