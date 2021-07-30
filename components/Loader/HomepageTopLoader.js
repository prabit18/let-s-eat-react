import React from 'react'
import dynamic from "next/dynamic";
const OwlCarousel  = dynamic(import('react-owl-carousel'), {
    ssr: false
});
function HomepageTopLoader() {
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
<section className="offer-section">
            <div className="container custom-container">
                <div className="row">
                    <div className="col-md-12">
                        <OwlCarousel className="slider-items owl-carousel" id="offer-carousel" {...options}>
                        <div class="white-background ">
                            <div class="gray-background inter-crop-img"></div>
                        </div>
                                    <div class="white-background ">
                                        <div class="gray-background inter-crop-img"></div>
                                    </div>
                                    <div class="white-background ">
                                        <div class="gray-background inter-crop-img"></div>
                                    </div>
                                    <div class="white-background ">
                                        <div class="gray-background inter-crop-img"></div>
                                    </div>
                                    <div class="white-background ">
                                        <div class="gray-background inter-crop-img"></div>
                                    </div>
                                    <div class="white-background ">
                                        <div class="gray-background inter-crop-img"></div>
                                    </div>
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>

</>
    )
}

export default HomepageTopLoader
