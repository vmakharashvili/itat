export interface User {
  id: number;
  username: string;
}

export interface LogIn {
  username: string;
  password: string;
}

export interface LoggedIn {
  user: User;
  token: string;
}
