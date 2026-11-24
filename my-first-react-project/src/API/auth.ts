export interface User {
  id: number,
  username: string,
  email: string,
  confirmed?: boolean,
  blocked: boolean,
}

export interface  IAuthResponse{
  jwt: string,
  user: User
}