import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider, DatePicker, message } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import { ConnectedRouter } from "connected-react-router";
import store from "./store/index";
import history from "./history";
import Home from "./routes/Home/index";
import Login from "./routes/Login";
// import Register from "./routes/Register";
import Mine from "./routes/Mine/index";
import Profile from "./routes/Profile/index";
import Tabs from "@/components/Tabs";
import "./assets/style/common.less";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ConfigProvider locale={zh_CN}>
        <main className="main-container">
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/home" exact component={Home}></Route>
            <Route path="/detail" exact component={Mine}></Route>
            <Route path="/profile" exact component={Profile}></Route>
            <Route path="/login" exact component={Login}></Route>
            {/* <Route path="/register" exact component={Register}></Route> */}
          </Switch>
        </main>
        <Tabs />
      </ConfigProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
