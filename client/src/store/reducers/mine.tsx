import { MineState } from "@/types/state";
import { AnyAction } from "redux";
const initialState = {};

export default function (
  state: MineState = initialState,
  action: AnyAction
): MineState {
  return state;
}
