import React from "react";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import "./index.less";
import { NavLink, withRouter } from "react-router-dom";

function Tabs() {
  return (
    <footer className="footer">
      <NavLink exact to="/">
        <HomeOutlined />
        <span>首页</span>
      </NavLink>
      <NavLink exact to="/profile">
        <ShoppingCartOutlined />
        <span>购物车</span>
      </NavLink>
      <NavLink exact to="/mine">
        <ProfileOutlined />
        <span>个人中心</span>
      </NavLink>
    </footer>
  );
}

export default withRouter(Tabs);
