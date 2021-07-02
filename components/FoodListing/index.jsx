import React from 'react';
import {foodCategoryName} from "../constants";
import dynamic from "next/dynamic";
const OwlCarousel  = dynamic(import('react-owl-carousel'), {
    ssr: false
});
const FoodListing = ({title}) => {
    const options = {
        loop:true,
        margin:5,
        nav:true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1.1,
                margin:5
            },
            400:{
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
            <div className="container custom-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-header">
                            <div className="removable"></div>
                            <h2 className="header-text">{title.preName} <span>{title.name}</span> {title.postName}</h2>
                                <div className="view-all-btn">
                                    <a href="/restaurants">View All</a>
                                </div>
                        </div>
                        <OwlCarousel className="slider-items owl-carousel custom-navigation home-slider" {...options}>
                            <div className="food-product hvr-shadow">
                                <a href="#" className="clickable"></a>
                                <div className="food-item">
                                    <img src="images/food-list2.jpg" alt="Food Image" className="banner-image"/>
                                        <div className="brand-logo">
                                            <img src="images/kfc.jpg" alt="Brand Logo"/>
                                        </div>
                                        <div className="diamond-pro">
                                            <img src="images/diamond-pro.svg" alt="Promoted"/>
                                        </div>
                                </div>
                                <div className="food-desc">
                                    <h4>KFC</h4>
                                    <p>Lorem ipsum dolor sit consetetur sadipscing elitr.</p>
                                </div>
                                <div className="delivery-detail">
                                    <div className="delivery-time">
                                        <img src="images/delivery-icon.svg" alt="deliver-icon"/>
                                            <span>44 min</span>
                                    </div>
                                    <div className="bg-rating">
                                        <img src="images/bg-rating.svg" alt="bg-rating"/>
                                            <div className="rating-rank">
                                                <img src="images/Star-icon.svg" alt="Star Icon"/>
                                                    <p className="rating-content">4.4</p>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div className="food-product hvr-shadow">
                                <a href="#" className="clickable"></a>
                                <div className="food-item">
                                    <img src="images/food-list3.jpg" alt="Food Image" className="banner-image"/>
                                        <div className="brand-logo">
                                            <img src="images/wimpy.jpg" alt="Brand Logo"/>
                                        </div>
                                </div>
                                <div className="food-desc">
                                    <h4>Wimpy</h4>
                                    <p>Lorem ipsum dolor sit consetetur sadipscing elitr.</p>
                                </div>
                                <div className="delivery-detail">
                                    <div className="delivery-time">
                                        <img src="images/delivery-icon.svg" alt="deliver-icon"/>
                                            <span>44 min</span>
                                    </div>
                                    <div className="bg-rating">
                                        <img src="images/bg-rating.svg" alt="bg-rating"/>
                                            <div className="rating-rank">
                                                <img src="images/Star-icon.svg" alt="Star Icon"/>
                                                    <p className="rating-content">4.4</p>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div className="food-product hvr-shadow">
                                <a href="#" className="clickable"/>
                                <div className="food-item">
                                    <img src="images/food-list4.jpg" alt="Food Image" className="banner-image"/>
                                        <div className="brand-logo">
                                            <img src="images/mcd.jpg" alt="Brand Logo"/>
                                        </div>
                                        <div className="diamond-pro">
                                            <img src="images/diamond-pro.svg" alt="Promoted"/>
                                        </div>
                                </div>
                                <div className="food-desc">
                                    <h4>McDonald’s</h4>
                                    <p>Lorem ipsum dolor sit consetetur sadipscing elitr.</p>
                                </div>
                                <div className="delivery-detail">
                                    <div className="delivery-time">
                                        <img src="images/delivery-icon.svg" alt="deliver-icon"/>
                                            <span>44 min</span>
                                    </div>
                                    <div className="bg-rating">
                                        <img src="images/bg-rating.svg" alt="bg-rating"/>
                                            <div className="rating-rank">
                                                <img src="images/Star-icon.svg" alt="Star Icon"/>
                                                    <p className="rating-content">4.4</p>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div className="food-product hvr-shadow">
                                <a href="#" className="clickable"/>
                                <div className="food-item">
                                    <img src="images/food-list5.jpg" alt="Food Image" className="banner-image"/>
                                        <div className="brand-logo">
                                            <img src="images/d.jpg" alt="Brand Logo"/>
                                        </div>
                                </div>
                                <div className="food-desc">
                                    <h4>Domino’s</h4>
                                    <p>Lorem ipsum dolor sit consetetur sadipscing elitr.</p>
                                </div>
                                <div className="delivery-detail">
                                    <div className="delivery-time">
                                        <img src="images/delivery-icon.svg" alt="deliver-icon"/>
                                            <span>44 min</span>
                                    </div>
                                    <div className="bg-rating">
                                        <img src="images/bg-rating.svg" alt="bg-rating"/>
                                            <div className="rating-rank">
                                                <img src="images/Star-icon.svg" alt="Star Icon"/>
                                                    <p className="rating-content">4.4</p>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div className="food-product hvr-shadow">
                                <a href="#" className="clickable"></a>
                                <div className="food-item">
                                    <img src="images/food-list6.jpg" alt="Food Image" className="banner-image"/>
                                        <div className="brand-logo">
                                            <img src="images/tb.jpg" alt="Brand Logo"/>
                                        </div>
                                </div>
                                <div className="food-desc">
                                    <h4>Taco Bell</h4>
                                    <p>Lorem ipsum dolor sit consetetur sadipscing elitr.</p>
                                </div>
                                <div className="delivery-detail">
                                    <div className="delivery-time">
                                        <img src="images/delivery-icon.svg" alt="deliver-icon"/>
                                            <span>44 min</span>
                                    </div>
                                    <div className="bg-rating">
                                        <img src="images/bg-rating.svg" alt="bg-rating"/>
                                            <div className="rating-rank">
                                                <img src="images/Star-icon.svg" alt="Star Icon"/>
                                                    <p className="rating-content">4.4</p>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FoodListing;
