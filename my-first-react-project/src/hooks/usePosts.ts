import { useMemo } from "react";
import {Post} from '../API/post'

export type PostSortField = "title" | "body" | "";

export const useSortedPosts = (
  posts: Post[], 
  sort: PostSortField,
  ): Post[] => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return posts;
  }, [sort, posts]);
  return sortedPosts
};

export const usePosts = (
  posts: Post[], 
  sort: PostSortField, 
  query: string
  ): Post[] => {
  const sortedPosts = useSortedPosts(posts, sort);
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()));
  }, [query, sortedPosts]);

  return sortedAndSearchedPosts;
}