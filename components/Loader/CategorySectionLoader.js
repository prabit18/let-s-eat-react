import React from 'react'
import dynamic from "next/dynamic";
const OwlCarousel  = dynamic(import('react-owl-carousel'), {
    ssr: false
});
function CategorySectionLoader() {
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
             <section className="main-category" >
            <div className="container custom-container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-header">
                            <div className="removable"></div>
                            {/* <img src="" alt="Inspiration For Your Order"/> */}
                                <div className="view-all-btn white-btn">
                                <a href="/view-all-cuisines">View All</a>
                                </div>
                        </div>
                        <OwlCarousel className="slider-items owl-carousel custom-navigation" id="mainCategory" {...options}>
                        <div class="white-background inspirational-background">
                                        <div class="gray-background inter-crop-img" style={{width:"225px"}}></div>
                                        <div class="gray-background inter-crop-name" style={{width:"145px",left:"42%"}}></div>
                                    </div>
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default CategorySectionLoader
