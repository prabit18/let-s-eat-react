import { event } from 'jquery';
import {React,useEffect, useState} from 'react';
import {Router,Switch,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserAction } from '../../redux/actions/user.action';
import InfiniteScroll from 'react-infinite-scroll-component';
import RestaurantDetail from '../RestaurantDetail';
import Restaurant from './1restaurant';
const RestaurantsList = (props) => {    
	return (
		<> 
                                <div className="food-list row frame">
                                    
                                  {   props.restaurants.data && props.restaurants.data.map((item) => (
                                      
                                      <Restaurant item={item} key={item.id}/>
                                      )) }    
                                  </div>
        </>
);  
};

const mapStateToProps = (state) => {
    const {Restaurants, errors} = state
   return {restaurants: Restaurants, errors}
}
const actionCreator = {
    getRestaurants: UserAction.getRestaurants
}
export default connect(mapStateToProps,actionCreator)(RestaurantsList);
