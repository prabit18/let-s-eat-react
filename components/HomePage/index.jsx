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
// console.log(Restaurants);
    return (
        <>
            <HomeTopSection/>
            {Curatedlist.length > 0 && Curatedlist.map((item) => <FoodListing data={item} key={item.id} {...props} /> )}
        </>
    );
};

const mapStateToProps = (state) => {
  const {
    Curatedlist,Restaurants
  } = state
  return {Curatedlist,Restaurants}
}
const actionCreator = {
  getCuratedlist: UserAction.getCuratedlist ,
     getRestaurants: UserAction.getRestaurants
}
  
export default connect(mapStateToProps, actionCreator)(HomePage);
