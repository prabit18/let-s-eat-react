import React from 'react'

function RestaurantDetailLoader() {
    return (
        <div>
            {/* <section class="main-section restaurant-main">
        <div class="page-banner restaurant-page-banner"> */}
        <div class="offer-section-outer">
            <div class="container custom-container">
                <div class="restaurant-offer-detail">
                    <div class="row restaurant-row" style={{width:"100%"}}>
                        <div class="col-md-8 restaurant-col">
                            <div class="restaurant-detail-outer">
                                <div class="white-background restaurant-img-sec">
                                    <div class="gray-background inter-crop-img"></div>
                                </div>
                                <div class="white-background restaurant-detail-sec">
                                    <div class="gray-background inter-crop-img"></div>
                                    <div class="gray-background inter-crop-img food-type"></div>
                                    <div class="gray-background inter-crop-img restaurant-add"></div>
                                    <div class="gray-background inter-crop-img rating-sec"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 restaurant-col">
                            <div class="white-background offer-sec">
                                <div class="gray-background inter-crop-img"></div>
                                <div class="gray-background inter-crop-img food-type offers-list"></div>
                                <div class="gray-background inter-crop-img restaurant-add offers-list"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section class="restaurant-list">
            <div class="container custom-container restaurant-container">
                <div class="row restaurant-row">
                    <div class="col-md-8 restaurant-list-col">
                        <div class="menu-section">
                            <div class="header-border">
                                <div class="white-background restaurant-img-sec header-sec">
                                    <div class="gray-background inter-crop-img menu-nav"></div>
                                    <div class="gray-background inter-crop-img overview-nav"></div>
                                    <div class="gray-background inter-crop-img review-nav"></div>
                                    <div class="gray-background inter-crop-img search-sec"></div>
                                </div>
                            </div>
                            <div class="menu-body">
                                <div class="side-menu-list" id="sideFilter">
                                    <ul class="menu-feild frame white-background">
                                        <li class="gray-background inter-crop-img menu-item"></li>
                                        <li class="gray-background inter-crop-img menu-item first-item"></li>
                                        <li class="gray-background inter-crop-img menu-item second-item"></li>
                                        <li class="gray-background inter-crop-img menu-item third-item"></li>
                                        <li class="gray-background inter-crop-img menu-item fourth-item"></li>
                                        <li class="gray-background inter-crop-img menu-item fifth-item"></li>
                                        <li class="gray-background inter-crop-img menu-item sixth-item"></li>
                                    </ul>
                                </div>
                                <div class="menu-item-list">
                                    <div class="white-background restaurant-detail-sec recommended">
                                        <div class="gray-background inter-crop-img"></div>
                                    </div>

                                    <div class="menu-items">
                                        <div class="white-background restaurant-img-sec menu-image">
                                            <div class="gray-background inter-crop-img"></div>
                                        </div>
                                        <div class="menu-item-description white-background restaurant-img-sec">
                                            <div class="gray-background inter-crop-img menu-detail"></div>
                                            <div class="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div class="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div class="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>

                                    <div class="menu-items">
                                        <div class="white-background restaurant-img-sec menu-image">
                                            <div class="gray-background inter-crop-img"></div>
                                        </div>
                                        <div class="menu-item-description white-background restaurant-img-sec">
                                            <div class="gray-background inter-crop-img menu-detail"></div>
                                            <div class="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div class="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div class="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>

                                    <div class="menu-items">
                                        <div class="white-background restaurant-img-sec menu-image">
                                            <div class="gray-background inter-crop-img"></div>
                                        </div>
                                        <div class="menu-item-description white-background restaurant-img-sec">
                                            <div class="gray-background inter-crop-img menu-detail"></div>
                                            <div class="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div class="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div class="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>
                                    <div class="menu-items">
                                        <div class="white-background restaurant-img-sec menu-image">
                                            <div class="gray-background inter-crop-img"></div>
                                        </div>
                                        <div class="menu-item-description white-background restaurant-img-sec">
                                            <div class="gray-background inter-crop-img menu-detail"></div>
                                            <div class="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div class="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div class="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>
                                    <div class="menu-items">
                                        <div class="white-background restaurant-img-sec menu-image">
                                            <div class="gray-background inter-crop-img"></div>
                                        </div>
                                        <div class="menu-item-description white-background restaurant-img-sec">
                                            <div class="gray-background inter-crop-img menu-detail"></div>
                                            <div class="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div class="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div class="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>

                                    <div class="menu-items">
                                        <div class="white-background restaurant-img-sec menu-image">
                                            <div class="gray-background inter-crop-img"></div>
                                        </div>
                                        <div class="menu-item-description white-background restaurant-img-sec">
                                            <div class="gray-background inter-crop-img menu-detail"></div>
                                            <div class="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div class="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div class="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>
                                    <div class="menu-items">
                                        <div class="white-background restaurant-img-sec menu-image">
                                            <div class="gray-background inter-crop-img"></div>
                                        </div>
                                        <div class="menu-item-description white-background restaurant-img-sec">
                                            <div class="gray-background inter-crop-img menu-detail"></div>
                                            <div class="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div class="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div class="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>
                                    <div class="menu-items">
                                        <div class="white-background restaurant-img-sec menu-image">
                                            <div class="gray-background inter-crop-img"></div>
                                        </div>
                                        <div class="menu-item-description white-background restaurant-img-sec">
                                            <div class="gray-background inter-crop-img menu-detail"></div>
                                            <div class="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div class="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div class="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>

                                    <div class="menu-items">
                                        <div class="white-background restaurant-img-sec menu-image">
                                            <div class="gray-background inter-crop-img"></div>
                                        </div>
                                        <div class="menu-item-description white-background restaurant-img-sec">
                                            <div class="gray-background inter-crop-img menu-detail"></div>
                                            <div class="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div class="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div class="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>
                                    <div class="menu-items">
                                        <div class="white-background restaurant-img-sec menu-image">
                                            <div class="gray-background inter-crop-img"></div>
                                        </div>
                                        <div class="menu-item-description white-background restaurant-img-sec">
                                            <div class="gray-background inter-crop-img menu-detail"></div>
                                            <div class="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div class="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div class="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>
                                    <div class="menu-items">
                                        <div class="white-background restaurant-img-sec menu-image">
                                            <div class="gray-background inter-crop-img"></div>
                                        </div>
                                        <div class="menu-item-description white-background restaurant-img-sec">
                                            <div class="gray-background inter-crop-img menu-detail"></div>
                                            <div class="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div class="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div class="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>

                                    <div class="menu-items">
                                        <img alt="food-item" src="images/image_res002.jpg"/>
                                        <div class="menu-item-description">
                                            <div class="menu-name">
                                                <div class="menu-wrap">
                                                    <h4>Dream Team Bucket</h4>
                                                    <div class="customize-list">
                                                        <span class="veg-item">£5.00</span>
                                                    </div>

                                                </div>
                                                <div class="menu-add-btn">
                                                    <a href="#">Add</a>
                                                </div>
                                            </div>
                                            <div class="menu-description">
                                                <p>Lorem ipsum dolor sit amet, consetetur eirmod tempor invidunt ut
                                                    labore et dolore magna.</p>
                                            </div>
                                            <div class="menu-add-btn-small proceed-add">
                                                <a href="#">Add</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="filter-overlay sidemenu-overlay" onclick="closeNav()"></div>
                        </div>
                    </div>
                    <div class="col-md-4 cart-summery-col">
                        <div class="order-summery card">
                            <div class="white-background restaurant-img-sec">
                                <div class="gray-background inter-crop-img"></div>
                                <div class="gray-background inter-crop-img cart-body"></div>
                                <div class="gray-background inter-crop-img cart-body selected-restaurant"></div>
                                <div class="gray-background inter-crop-img cart-menu-name"></div>
                                <div class="gray-background inter-crop-img cart-cost"></div>
                                <div class="gray-background inter-crop-img cart-quantity"></div>
                                <div class="gray-background inter-crop-img cart-price"></div>
                                <div class="gray-background inter-crop-img proceed-button"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* </div>
    </section> */}
        </div>
    )
}

export default RestaurantDetailLoader;