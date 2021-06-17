import React from 'react';
import dynamic from "next/dynamic";
const OwlCarousel  = dynamic(import('react-owl-carousel'), {
    ssr: false
});

const OffersSection = () => {
    const options = {
        loop:true,
        margin:15,
        nav:true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1.5,
                margin:10
            },
            400:{
                items:2.5,
            },
            600:{
                items:3.5,
            },
            900:{
                items:4.5,
            }
        }
    }
    return (
        <section className="offer-section">
            <div className="container custom-container">
                <div className="row">
                    <div className="col-md-12">
                        <OwlCarousel className="slider-items owl-carousel" id="offer-carousel" {...options}>
                            <a href="#" className="item hvr-shrink">
                                <img src="images/new-offers1.jpg" alt="Offer Image"/>
                            </a>
                            <a href="#" className="item hvr-shrink">
                                <img src="images/new-offers2.jpg" alt="Offer Image"/>
                            </a>
                            <a href="#" className="item hvr-shrink">
                                <img src="images/new-offers3.jpg" alt="Offer Image"/>
                            </a>
                            <a href="#" className="item hvr-shrink">
                                <img src="images/new-offers4.jpg" alt="Offer Image"/>
                            </a>
                            <a href="#" className="item hvr-shrink">
                                <img src="images/new-offers5.jpg" alt="Offer Image"/>
                            </a>
                            <a href="#" className="item hvr-shrink">
                                <img src="images/new-offers6.jpg" alt="Offer Image"/>
                            </a>
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OffersSection;
