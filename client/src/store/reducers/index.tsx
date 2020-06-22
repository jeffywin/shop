import { combineReducers } from "redux";
import home from "./home";
import profile from "./profile";
import mine from "./mine";
import { connectRouter } from "connected-react-router";
import history from "@/history";

const rootReducer = combineReducers({
  home,
  profile,
  mine,
  router: connectRouter(history),
});

export default rootReducer;
