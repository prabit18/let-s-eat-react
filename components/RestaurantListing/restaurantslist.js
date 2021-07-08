import { event } from 'jquery';
import {React,useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { UserAction } from '../../redux/actions/user.action';
const RestaurantsList = (props) => {
    
	return (
		<> 
                                <div className="food-list row frame">
                                  {   props.restaurants && props.restaurants.map((item) => (        
                                    <div className="col-xl-3 col-lg-3 col-sm-6" key={item.id}>
                                            <div className="food-product hvr-shadow" >
                                                <a className="clickable" href="#"/>
                                            <div className="food-item">
                                                <img alt="food-item" src={`https://development-cdn.letseat.co.uk/${item.image_url}`}/>
                                                <div className="brand-logo">
                                                    <img alt="restaurant-logo" src={`https://development-cdn.letseat.co.uk/${item.logo}`}/>
                                                </div>
                                            </div>
                                            <div className="food-desc">
                                                <h4>{item.name}</h4>
                                                <p>{item.description}</p>
                                            </div>
                                            <div className="delivery-detail">
                                                <div className="delivery-time">
                                                    <img alt="deliver-icon" src="images/delivery-icon.svg"/>
                                                    <span>{item.delivery_time}</span>
                                                </div>
                                                <div className="bg-rating">
                                                    <img alt="bg-rating" src="images/bg-rating.svg"/>
                                                    <div className="rating-rank">
                                                        <img alt="star-icon" src="images/Star-icon.svg"/>
                                                        <p className={["rating-content", "m-0"].join(' ')}>{item.ratings.length < 2 ? item.ratings + '.0' : item.ratings}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
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
