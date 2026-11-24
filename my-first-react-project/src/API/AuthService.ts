export const BASE_URL = 'https://api.nomoreparties.co';
import {User, IAuthResponse} from './auth';


export default class AuthService {

  static async register(
    username: string,
    password: string,
    email: string,
  ): Promise<IAuthResponse> {
    const response = await fetch(`${BASE_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, email }),
    });
    const data: Partial<IAuthResponse> = await response.json();
    if (response.ok && data.jwt && data.user) {
      localStorage.setItem("jwt", data.jwt);
      return data as IAuthResponse;
    }
    throw new Error('Ошибка при регистрации (логин или e-mail уже заняты)');
  }

  static async authorize(
    identifier: string, 
    password: string)
    :Promise<AuthService> {
    const response = await fetch(`${BASE_URL}/auth/local`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    });
    const data: Partial<IAuthResponse> = await response.json();
    if (response.ok && data.jwt && data.user) {
      localStorage.setItem("jwt", data.jwt);
      return data as IAuthResponse;
    }
    throw new Error('Неверный логин или пароль');
  }

  static async getContent(token: string): Promise<User> {
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
    return response.json() as Promise<User>;
  }
}
