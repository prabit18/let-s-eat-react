import { event } from 'jquery';
import {React,useEffect, useState} from 'react';
import { connect } from 'react-redux';




const RestaurantListingPage = (props) => {
	
const {restaurants}=props;

	return (
		<>
        <section className="restaurant-list">
                <div className="container custom-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="listing-box">
                                <div className="filter-section">
                                    <div className="resto-count">
                                        <h2>680 Restaurents</h2>
                                    </div>
                                    <div className="filter-box custom-scroll">
                                        <ul>
                                            <li value="rating"><a href="#">Rating</a></li>
                                            <li value="deliverytime"><a href="#">Delivery Time</a></li>
                                            <li value="pureVeg"><a href="#">Pure Veg</a></li>
                                            <li value="offers"><a href="#">Offers</a></li>
                                            <li className="filter"><a href="#">Filters
                                                <span>
                                        <img alt="filter-icon" src="images/filter.svg"/>
                                    </span></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="food-list row frame">
                                    {restaurants.data && restaurants.data.map((item) => (
                                        <div className="col-xl-3 col-lg-3 col-sm-6" key={item.id}>
                                            <div className="food-product hvr-shadow" >
                                                <a className="clickable" href="#"/>
                                            <div className="food-item">
                                                <img alt="food-item" src={item.image_url}/>
                                                <div className="brand-logo">
                                                    <img alt="restaurant-logo" src={item.logoImgurl}/>
                                                </div>
                                            </div>
                                            <div className="food-desc">
                                                <h4>{item.name}</h4>
                                                <p>{item.description}</p>
                                            </div>
                                            <div className="delivery-detail">
                                                <div className="delivery-time">
                                                    <img alt="deliver-icon" src="images/delivery-icon.svg"/>
                                                    <span>{item.deliverytime} min</span>
                                                </div>
                                                <div className="bg-rating">
                                                    <img alt="bg-rating" src="images/bg-rating.svg"/>
                                                    <div className="rating-rank">
                                                        <img alt="star-icon" src="images/Star-icon.svg"/>
                                                        <p className={["rating-content", "m-2"].join(' ')}>{item.rating}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    ))}
							    </div>
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
export default connect(mapStateToProps)(RestaurantListingPage);
