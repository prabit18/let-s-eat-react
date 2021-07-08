import {React,useEffect, useState} from 'react';
import HomeTopSection from "../HomeTopSection";
import FoodListing from "../FoodListing";
import {foodCategoryName} from "../constants";
import {UserAction} from "../../redux/actions/user.action";
import { connect } from "react-redux";

const HomePage = (props) => {
    useEffect(() => {
    props.getCuratedlist();
    props.getRestaurants();
  },[]);

const {Curatedlist,Restaurants} = props
    return (
        <>
            <HomeTopSection/>
            {Curatedlist.length > 0 && Curatedlist.map((item) => <FoodListing data={item} /> )}
        </>
    );
};

const mapStateToProps = (state) => {
  const {
    Curatedlist,Restaurant
  } = state
  return {Curatedlist,Restaurant}
}
const actionCreator = {
  getCuratedlist: UserAction.getCuratedlist ,
     getRestaurants: UserAction.getRestaurants
}
  
export default connect(mapStateToProps, actionCreator)(HomePage);
