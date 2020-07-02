import { HomeState } from "@/types/state";
import { AnyAction } from "redux";
import * as TYPES from '../action-types';
const initialState = {
  currentCategory: 'all'
};

export default function (state: HomeState = initialState, action: AnyAction): HomeState {
  switch (action.type) {
    case TYPES.SET_CURRENT_CATEGORY: 
      return {...state, currentCategory: action.payload}  
    default:
      return state;
  }
}
