import { ProfileState } from "@/types/state";
import * as TYPES from '../action-types';
import { AnyAction } from "redux";
import { LOGIN_TYPES } from "../../types/state";
export interface ProfileState {
  loginState: LOGIN_TYPES;
  user: any;
  error: string | null;
}
let initialState: ProfileState = {
  loginState: LOGIN_TYPES.UN_VALIDATE,
  user: null,
  error: null,
};

export default function (state: ProfileState = initialState, action: AnyAction): ProfileState {
  switch (action.type) {
    case TYPES.VALIDATE: 
      if (action.payload.success) {
        return {
          loginState: LOGIN_TYPES.LOGINED,
          user: action.payload
        }
      } else {
        return {
          loginState: LOGIN_TYPES.UN_LOGINED,
          user: null,
          error: action.payload
        }
      }
    case TYPES.LOGOUT:
      return {
        loginState: LOGIN_TYPES.UN_LOGINED,
        user: null,
        error: null
      }
    default:
      return state;
  }
}
