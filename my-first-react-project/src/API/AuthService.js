export const BASE_URL = 'https://api.nomoreparties.co';

export default class AuthService {
  static async register(username, password, email) {
    const response = await fetch(`${BASE_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    });
    const data = await response.json();
    if (data.jwt) {
      localStorage.setItem('jwt', data.jwt);
      return data;
    }
    throw new Error('Ошибка при регистрации (логин или e-mail уже заняты)');
  }

  static async authorize(identifier, password) {
    const response = await fetch(`${BASE_URL}/auth/local`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    });
    const data = await response.json();
    if (data.jwt) {
      localStorage.setItem('jwt', data.jwt);
      return data;
    }
    throw new Error('Неверный логин или пароль');
  }

  static async getContent(token) {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Токен невалиден');
    }
    return response.json();
  }
}
