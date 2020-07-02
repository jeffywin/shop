import React, {PropsWithChildren} from "react";
import "./index.less";
import { RouteComponentProps } from 'react-router-dom';
import { CombinedState } from "@/types/state";
import { connect } from "react-redux";
import { HomeState } from "../../types/state";
import mapDispatchToProps from "@/store/actions/home";
import HomeHeader from "./components/HomeHeader";
type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & mapDispatchToProps>
// Props有三个属性组成，RouteComponentProps 路由属性，ReturnType<typeof mapStateToProps> 相当于 HomeState

function Home(props: Props) {
  return (
    <>
      <HomeHeader 
        currentCategory = {props.currentCategory}
        setCurrentCatgory = {props.setCurrentCategory}
      />
    </>
  );
}

// 传入老状态  state: CombinedState  =》 返回新状态 state.home
const mapStateToProps = (state: CombinedState): HomeState => state.home;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
