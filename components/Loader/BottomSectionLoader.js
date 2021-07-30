import React from 'react'
import dynamic from "next/dynamic";
const OwlCarousel  = dynamic(import('react-owl-carousel'), {
    ssr: false
});
function BottomSectionLoader() {
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
                },
                900:{
                    items:4.5,
                }
            }
    }
    return (
        <> 
        

        <section className="food-listing">
            <div className="container custom-container" >
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-header">
                            <div className="removable"></div>
                            <h2 className="header-text" ><span className="gray-background inter-crop-name">{} </span></h2>
                            
                                <div className="view-all-btn">
                                    <a >View All</a>
                                </div>
                        </div>
                        <OwlCarousel className="slider-items owl-carousel custom-navigation home-slider" {...options}>
                        <div class="white-background top-rated">
                            <div class="gray-background inter-crop-img"></div>
                            <div class="gray-background inter-crop-name"></div>
                            <div class="gray-background inter-crop-desc"></div>
                            <div class="gray-background inter-crop-distance"></div>
                            <div class="gray-background inter-crop-rating"></div>
                        </div>
                         
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}



export default BottomSectionLoader
