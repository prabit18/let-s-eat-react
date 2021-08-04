import React, { useState ,useEffect} from 'react';
import {foodCategoryName} from "../constants";
import dynamic from "next/dynamic";
import { connect } from 'react-redux';
import RestaurantsList from '../RestaurantListing/restaurantslist';
import router, { useRouter } from 'next/router';
import { UserAction } from '../../redux/actions/user.action';
import Restaurant from '../RestaurantListing/1restaurant';
const OwlCarousel  = dynamic(import('react-owl-carousel'), {
    ssr: false
});
const FoodListing = (props) => {
   // console.log(props)
    const router = useRouter()
    const handleroute=(type)=>{
        router.push({pathname:"/restaurants/",query:{Curated_type:type}})
        props.getRestaurants("curated_list");
    }
    const options = {
        loop:true,
        margin:15,
        nav:true,
         responsiveClass:true,
            responsive:{
                0:{
                    items:1.2,
                    margin:15
                },
                480:{
                    items:1.5,
                    margin:15
                },
                576:{
                    items:1.8,
                    margin:5
                },
                600:{
                    items:2.5,
                    margin:10
                },
                900:{
                    items:3.2,
                    margin:20
                },
                1200:{
                    items:3.9,
                    margin:25
                }
            }
    }
    return (
        <section className="food-listing">
            <div className="container custom-container" >
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-header">
                            <div className="removable"></div>
                            <h2 className="header-text" ><span>{props.data.name} </span></h2>
                            
                                <div className="view-all-btn">
                                    <a onClick={()=>handleroute(props.data.name)}>View All</a>
                                </div>
                        </div>
                        <OwlCarousel className="slider-items owl-carousel custom-navigation home-slider" {...options}>
                         { props.restaurants.data && props.restaurants.data.map((item)=>(
                             //<RestaurantsList item={elem}/>
                            <div className="food-product hvr-shadow" key={item.id}>
                                <a onClick={()=>handleroute(item.url)} className="clickable"></a>
                                <div className="food-item" >
                                    <img src={`https://development-cdn.letseat.co.uk/${item.image_url}`} alt="Food Image" className="banner-image"/>
                                        <div className="brand-logo">
                                            <img src={`https://development-cdn.letseat.co.uk/${item.logo}`} alt="Brand Logo"/>
                                        </div>
                                        <div className="diamond-pro">
                                            <img src="images/diamond-pro.svg" alt="Promoted"/>
                                        </div>
                                </div>
                                <div className="food-desc">
                                    <h4>{item.name}</h4>
                                    <p>{item.description}</p>
                                </div>
                                <div className="delivery-detail">
                                    <div className="delivery-time">
                                        <img src="images/delivery-icon.svg" alt="deliver-icon"/>
                                            <span>{item.delivery_time}</span>
                                    </div>
                                    <div className="bg-rating">
                                        <img src="images/bg-rating.svg" alt="bg-rating"/>
                                            <div className="rating-rank">
                                                <img src="images/Star-icon.svg" alt="Star Icon"/>
                                                    <p className="rating-content">{item.ratings.length < 2 ? item.ratings + '.0' : item.ratings}</p>
                                            </div>
                                    </div>
                                </div>
                            </div>
                         ))}
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
    );
};
const mapStateToProps = (state) => {
    const {Restaurants, Curatedlist,errors} = state
   return {restaurants: Restaurants,curatedlist:Curatedlist, errors}
}
const actionCreator = {
    getCuratedlist: UserAction.getCuratedlist ,
       getRestaurants: UserAction.getRestaurants
  }

export default connect(mapStateToProps,actionCreator)(FoodListing);

