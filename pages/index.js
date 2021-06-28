import React, { useEffect } from "react";
import HomePage from "../components/HomePage";
import {UserAction} from "../redux/actions/user.action";
import { connect } from "react-redux";

const Home = (props) => {
  useEffect(() => {
    props.getCuisines();
  },[]);
const {Cuisines} = props
  return (
      <div>
        {Object.keys(Cuisines).length > 0 && <HomePage/>}
      </div>
  )
}

const mapStateToProps = (state) => {
  const {
    Cuisines
  } = state
  return {Cuisines}
}
const actionCreator = {
  getCuisines: UserAction.getCuisines
}

export default connect(mapStateToProps, actionCreator)(Home);
