import { RouterState } from "connected-react-router";

export interface HomeState {
  currentCategory: string
}

export interface MineState {}

export enum LOGIN_TYPES {
  UN_VALIDATE = 'UN_VALIDATE',
  LOGINED = 'LOGINED',
  UN_LOGINED = 'UN_LOGINED'
}
interface User {
  username: string,
  email: string,
  avatar: string
}

export interface ProfileState {
  loginState: LOGIN_TYPES,
  user: User | null,
  error: string | null
}

export interface LoginPayload {
  username: string,
  password: string,
}

export interface LoginResult {
  data: { token: string }
  success: boolean,
  message?: any
}

export interface CombinedState {
  home: HomeState;
  mine: MineState;
  profile: ProfileState;
  router: RouterState;
}
