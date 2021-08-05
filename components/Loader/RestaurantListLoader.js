import React from 'react'

function RestaurantListLoader() {
    const Skeleton=(
        <div style={{display:"flex"}}>
                                <div class="white-background top-rated listing-placeholder">
                                            <div class="gray-background inter-crop-img"></div>
                                            <div class="gray-background inter-crop-name"></div>
                                            <div class="gray-background inter-crop-desc"></div>
                                            <div class="gray-background inter-crop-distance"></div>
                                            <div class="gray-background inter-crop-rating"></div>
                                        </div>
                                        <div class="white-background top-rated listing-placeholder">
                                            <div class="gray-background inter-crop-img"></div>
                                            <div class="gray-background inter-crop-name"></div>
                                            <div class="gray-background inter-crop-desc"></div>
                                            <div class="gray-background inter-crop-distance"></div>
                                            <div class="gray-background inter-crop-rating"></div>
                                        </div>
                                        <div class="white-background top-rated listing-placeholder">
                                            <div class="gray-background inter-crop-img"></div>
                                            <div class="gray-background inter-crop-name"></div>
                                            <div class="gray-background inter-crop-desc"></div>
                                            <div class="gray-background inter-crop-distance"></div>
                                            <div class="gray-background inter-crop-rating"></div>
                                        </div>
                                        <div class="white-background top-rated listing-placeholder">
                                            <div class="gray-background inter-crop-img"></div>
                                            <div class="gray-background inter-crop-name"></div>
                                            <div class="gray-background inter-crop-desc"></div>
                                            <div class="gray-background inter-crop-distance"></div>
                                            <div class="gray-background inter-crop-rating"></div>
                                        </div>
                                       
                                </div>
    )
    return (<>
    <section className="restaurant-list">
                <div className="container custom-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="listing-box">
                                <div className="filter-section">
                                    <div className="resto-count">
                                        <h2>{} Restaurants</h2>
                                    </div>
                                    <div className="filter-box custom-scroll">
                                        <ul>
                                            <li value="rating"><a href="#"onClick={()=> handleFilter('ratings')}>Rating</a></li>
                                            <li value="deliverytime"><a href="#" onClick={()=> handleFilter('delivery_time')}>Delivery Time</a></li>
                                            <li value="pureVeg"><a href="#"onClick={()=> handleFilter('pure_veg')}>Pure Veg</a></li>
                                            <li value="offers"><a href="#" onClick={()=> handleFilter('offers')}>Offers</a></li>
                                            <li className="filter"><a href="#">Filters
                                                <span>
                                        <img alt="filter-icon" src="images/filter.svg"/>
                                    </span></a></li>
                                        </ul>
                                    </div>
                                </div>
                                {Skeleton}
                                {Skeleton}
                                        
                                        </div>
                        </div>
                    </div>
                </div>
            </section>
                                        
</>    )
}

export default RestaurantListLoader
