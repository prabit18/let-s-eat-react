import React from 'react'
const Emptypage=()=>{
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
                                        <div className="favourite-menu-section">
                                           <ul className="menu-feild frame favourite-menu">
                                                <li className="food-filter active"><a href="#">Profile</a></li>
                                                <li className="food-filter"><a href="#">Orders</a></li>
                                                <li className="food-filter"><a href="#">Manage Address</a></li>
                                                <li className="food-filter"><a href="#">Favorite Restaurants</a></li>
                                                <li className="food-filter"><a href="#">My Tasty Points</a></li>
                                                <li className="food-filter"><a href="#">Invite a User</a></li>
                                                <li className="food-filter"><a href="#">Help</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-10 right-favourite-col">
                                        <div className="filter-section">
                                            <div className="resto-count favourite-menu-header">
                                                <h2>Favourites</h2>
                                            </div>
                                        </div>
                                        <section className="cart-section">
                                                <div className="container custom-container">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="empty-cart">
                                                                <img src="../../images/empty_cart.svg" alt="Empty_cart"/>
                                                                <p>No Favourite Restaurants</p>
                                                                <div className="back-button">
                                                                    <a href="/restaurants" className="hvr-icon-back"><img src="../../images/back_arrow.svg" alt="Back_Arrow" class="hvr-icon"/>Back to Restaurant</a>
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
export default Emptypage;