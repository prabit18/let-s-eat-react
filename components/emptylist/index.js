import React from 'react';
import router from 'next/router';
const Emptylist=()=>{
    let path=router.asPath;
return(
<>
   <div class="page-banner">
        <section className="main-section">
            <section className="restaurant-list">
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="listing-box favourite-listing-box">
                                    <div className="col-lg-2 col-md-2" id="profile-menu">
                                    </div>
                                    <div className="col-lg-10 right-favourite-col">
                                        <section className="cart-section">
                                                <div className="container custom-container">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="empty-cart">
                                                                <img src="../../images/empty_cart.svg" alt="Empty_cart"/>
                                                                <p>No Restaurants Found </p>
                                                                <div className="back-button">
                                                                    <a href={path} className="hvr-icon-back"><img src="../../images/back_arrow.svg" alt="Back_Arrow" class="hvr-icon" />Back to Restaurant</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </section>
        </section>
    </div> 
 </>
    )
}
export default Emptylist;