import axios from 'axios';

export default class PostService {
  static async getAll(limit = 10, page = 1) {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
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

  static async getById(id) {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
      return response;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  }

  static async getCommentsByPostsId(id) {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      return response;
    } catch (error) {
      console.error('Error fetching comments post:', error);
      throw error;
    }
  }
}