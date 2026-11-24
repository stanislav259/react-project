import axios, {AxiosResponse} from 'axios';
import {Post, Comment} from './post'

const POST_URL = 'https://jsonplaceholder.typicode.com/posts'

export default class PostService {
  static async getAll(
    limit = 10, page = 1): Promise<AxiosResponse<Post[]>> {
    try {
      const response = await axios.get<Post[]>(POST_URL, {
        params: {
          _limit: limit,
          _page: page
        }
      });
      return response;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  static async getById(id: number | string)
  : Promise<AxiosResponse<Post[]>> {
    try {
      const response = await axios.get<Post[]>(`${POST_URL}/${id}`)
      return response;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  }

  static async getCommentsByPostsId(id: number | string) 
  : Promise<AxiosResponse<Comment[]>>{
    try {
      const response = await axios.get<Comment[]>(`${POST_URL}/${id}/comments`)
      return response;
    } catch (error) {
      console.error('Error fetching comments post:', error);
      throw error;
    }
  }
}