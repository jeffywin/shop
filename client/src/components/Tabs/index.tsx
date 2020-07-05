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
      <NavLink exact to="/detail">
        <ShoppingCartOutlined />
        <span>详情</span>
      </NavLink>
      <NavLink exact to="/profile">
        <ProfileOutlined />
        <span>个人中心</span>
      </NavLink>
    </footer>
  );
}

export default withRouter(Tabs);
