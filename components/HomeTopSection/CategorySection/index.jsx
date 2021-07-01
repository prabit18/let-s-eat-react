import React from 'react';
import { connect } from 'react-redux'
import dynamic from "next/dynamic";
const OwlCarousel  = dynamic(import('react-owl-carousel'), {
    ssr: false
});
const CategorySection = (props) => {
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

    const {cuisines} = props
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
                            { cuisines && cuisines.map((item) =>
                                <a href="#" className="item hvr-shrink" key={item.id}>
                                    <img src={item.image} alt="Food Image"/>
                                    <span>{item.name}</span>
                                </a>
                            )}
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = (state) => {
    const { Cuisines, errors} = state
    return { cuisines: Cuisines, errors }
}

export default connect(mapStateToProps)(CategorySection);

