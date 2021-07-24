import React from 'react';
import { connect } from 'react-redux'
import dynamic from "next/dynamic";
import router, { useRouter } from 'next/router';
const OwlCarousel  = dynamic(import('react-owl-carousel'), {
    ssr: false
});
const CategorySection = (props) => {
    const router=useRouter();

    const options = {
        loop:true,
        margin:15,
        nav:true,
        responsiveClass:true,
            responsive:{
                0:{
                    items:1.5,
                    margin:15
                },
                400:{
                    items:1.8,
                    margin:15
                },
                480:{
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
                                <a href="/view-all-cuisines">View All</a>
                                </div>
                        </div>
                        <OwlCarousel className="slider-items owl-carousel custom-navigation" id="mainCategory" {...options}>
                            { cuisines.data && cuisines.data.map((item) =>
                                <a onClick={()=>router.push({pathname:"/restaurants/",query:{Cuisine_type:item.name}})} className="item hvr-shrink" key={item.id}>
                                    <img src={`https://development-cdn.letseat.co.uk/resize-image/175x280/${item.image}`} alt="Food Image"/>
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

