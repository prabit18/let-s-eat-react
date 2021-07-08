import { event } from 'jquery';
import {React,useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { UserAction } from '../../redux/actions/user.action';
import RestaurantsList from './restaurantslist';


const RestaurantListingPage = (props) => {
  const  handleFilter = (type) => {
      props.getRestaurants(type)
  }
	return (
		<>
        <section className="restaurant-list">
                <div className="container custom-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="listing-box">
                                <div className="filter-section">
                                    <div className="resto-count">
                                        <h2>680 Restaurants</h2>
                                    </div>
                                    <div className="filter-box custom-scroll">
                                        <ul>
                                            <li value="rating"><a href="#" onClick={()=> handleFilter('ratings')}>Rating</a></li>
                                            <li value="deliverytime"><a href="#" onClick={()=> handleFilter('delivery_time')}>Delivery Time</a></li>
                                            <li value="pureVeg"><a href="#"onClick={()=> handleFilter('pure_veg')}>Pure Veg</a></li>
                                            <li value="offers"><a href="#" onClick={()=> handleFilter('offers')}>Offers</a></li>
                                            <li className="filter"><a href="#">Filters
                                                <span>
                                        <img alt="filter-icon" src="images/filter.svg"/>
                                    </span></a></li>
                                        </ul>
                                    </div>
                                </div>
                            <RestaurantsList/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
				   

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
export default connect(mapStateToProps, actionCreator)(RestaurantListingPage);
