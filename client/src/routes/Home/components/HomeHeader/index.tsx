import React from "react";
import "./index.less";
interface Props {}
function HomeHeader(props: Props) {
  return (
    <header className="home-header">
      <div className="logo-header">
        <img src="//mcdn.pinduoduo.com/home/static/images/logo.png" alt=""/>
      </div>
    </header>
  );
}
export default HomeHeader;
