import { ProfileState } from "@/types/state";
import { AnyAction } from "redux";
const initialState = {};

export default function (
  state: ProfileState = initialState,
  action: AnyAction
): ProfileState {
  return state;
}
