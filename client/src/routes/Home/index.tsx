import React from "react";
import "./index.less";
import { CombinedState } from "@/types/state";
import { connect } from "react-redux";
import { HomeState } from "../../types/state";
import mapDispatchToProps from "@/store/actions/home";
import HomeHeader from "./components/HomeHeader";
interface Props {}

function Home(props: Props) {
  return (
    <>
      <HomeHeader />
    </>
  );
}

const mapStateToProps = (state: CombinedState): HomeState => state.home;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
