import React, {PropsWithChildren} from "react";
import "./index.less";
import {RouteComponentProps} from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {History} from 'history';
type Props = PropsWithChildren<{
  history: History
}>
function Nav(props: Props) {
  // ReactComponentProps 路由属性，history，location，match
  return (
    <header className="nav-header">
      <ArrowLeftOutlined onClick={() => props.history.goBack()}/>
      {props.children}
    </header>
  );
}

export default Nav;
