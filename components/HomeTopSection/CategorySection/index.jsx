import React from 'react';
import dynamic from "next/dynamic";
const OwlCarousel  = dynamic(import('react-owl-carousel'), {
    ssr: false
});
const CategorySection = () => {
    const options = {
        loop:true,
        margin:10,
        nav:true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1.5,
                margin:10
            },
            400:{
                items:2.5,
                margin:15
            },
            600:{
                items:3.5,
                margin:15
            },
            900:{
                items:4.5,
                margin:15
            },
            1200:{
                items:5,
                margin:15
            }
        }
    }
    return (
        <section className="main-category">
            <div className="container custom-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-header">
                            <div className="removable"></div>
                            <img src="images/Inspiration.svg" alt="Inspiration For Your Order"/>
                                <div className="view-all-btn white-btn">
                                    <a href="#">View All</a>
                                </div>
                        </div>
                        <OwlCarousel className="slider-items owl-carousel custom-navigation" id="mainCategory" {...options}>
                            <a href="#" className="item hvr-shrink">
                                <img src="images/Cui-list4.jpg" alt="Food Image"/>
                                    <span>Pizzas</span>
                            </a>
                            <a href="#" className="item hvr-shrink">
                                <img src="images/Cui-list5.jpg" alt="Food Image"/>
                                    <span>Burger</span>
                            </a>
                            <a href="#" className="item hvr-shrink">
                                <img src="images/Cui-list6.jpg" alt="Food Image"/>
                                    <span>Wrap</span>
                            </a>
                            <a href="#" className="item hvr-shrink">
                                <img src="images/Cui-list7.jpg" alt="Food Image"/>
                                    <span>Garlic Bread</span>
                            </a>
                            <a href="#" className="item hvr-shrink">
                                <img src="images/Cui-list8.jpg" alt="Food Image"/>
                                    <span>Pasta</span>
                            </a>
                            <a href="#" className="item hvr-shrink">
                                <img src="images/Cui-list9.jpg" alt="Food Image"/>
                                    <span>Kebab</span>
                            </a>
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
