import React from 'react'

function RestaurantDetailLoader() {
    return (
        <div>
            {/* <section className="main-section restaurant-main">
        <div className="page-banner restaurant-page-banner"> */}
        <div className="offer-section-outer">
            <div className="container custom-container">
                <div className="restaurant-offer-detail">
                    <div className="row restaurant-row" style={{width:"100%"}}>
                        <div className="col-md-8 restaurant-col">
                            <div className="restaurant-detail-outer">
                                <div className="white-background restaurant-img-sec">
                                    <div className="gray-background inter-crop-img"></div>
                                </div>
                                <div className="white-background restaurant-detail-sec">
                                    <div className="gray-background inter-crop-img"></div>
                                    <div className="gray-background inter-crop-img food-type"></div>
                                    <div className="gray-background inter-crop-img restaurant-add"></div>
                                    <div className="gray-background inter-crop-img rating-sec"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 restaurant-col">
                            <div className="white-background offer-sec">
                                <div className="gray-background inter-crop-img"></div>
                                <div className="gray-background inter-crop-img food-type offers-list"></div>
                                <div className="gray-background inter-crop-img restaurant-add offers-list"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section className="restaurant-list">
            <div className="container custom-container restaurant-container">
                <div className="row restaurant-row">
                    <div className="col-md-8 restaurant-list-col">
                        <div className="menu-section">
                            <div className="header-border">
                                <div className="white-background restaurant-img-sec header-sec">
                                    <div className="gray-background inter-crop-img menu-nav"></div>
                                    <div className="gray-background inter-crop-img overview-nav"></div>
                                    <div className="gray-background inter-crop-img review-nav"></div>
                                    <div className="gray-background inter-crop-img search-sec"></div>
                                </div>
                            </div>
                            <div className="menu-body">
                                <div className="side-menu-list" id="sideFilter">
                                    <ul className="menu-feild frame white-background">
                                        <li className="gray-background inter-crop-img menu-item"></li>
                                        <li className="gray-background inter-crop-img menu-item first-item"></li>
                                        <li className="gray-background inter-crop-img menu-item second-item"></li>
                                        <li className="gray-background inter-crop-img menu-item third-item"></li>
                                        <li className="gray-background inter-crop-img menu-item fourth-item"></li>
                                        <li className="gray-background inter-crop-img menu-item fifth-item"></li>
                                        <li className="gray-background inter-crop-img menu-item sixth-item"></li>
                                    </ul>
                                </div>
                                <div className="menu-item-list">
                                    <div className="white-background restaurant-detail-sec recommended">
                                        <div className="gray-background inter-crop-img"></div>
                                    </div>

                                    <div className="menu-items">
                                        <div className="white-background restaurant-img-sec menu-image">
                                            <div className="gray-background inter-crop-img"></div>
                                        </div>
                                        <div className="menu-item-description white-background restaurant-img-sec">
                                            <div className="gray-background inter-crop-img menu-detail"></div>
                                            <div className="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div className="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div className="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>

                                    <div className="menu-items">
                                        <div className="white-background restaurant-img-sec menu-image">
                                            <div className="gray-background inter-crop-img"></div>
                                        </div>
                                        <div className="menu-item-description white-background restaurant-img-sec">
                                            <div className="gray-background inter-crop-img menu-detail"></div>
                                            <div className="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div className="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div className="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>

                                    <div className="menu-items">
                                        <div className="white-background restaurant-img-sec menu-image">
                                            <div className="gray-background inter-crop-img"></div>
                                        </div>
                                        <div className="menu-item-description white-background restaurant-img-sec">
                                            <div className="gray-background inter-crop-img menu-detail"></div>
                                            <div className="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div className="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div className="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>
                                    <div className="menu-items">
                                        <div className="white-background restaurant-img-sec menu-image">
                                            <div className="gray-background inter-crop-img"></div>
                                        </div>
                                        <div className="menu-item-description white-background restaurant-img-sec">
                                            <div className="gray-background inter-crop-img menu-detail"></div>
                                            <div className="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div className="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div className="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>
                                    <div className="menu-items">
                                        <div className="white-background restaurant-img-sec menu-image">
                                            <div className="gray-background inter-crop-img"></div>
                                        </div>
                                        <div className="menu-item-description white-background restaurant-img-sec">
                                            <div className="gray-background inter-crop-img menu-detail"></div>
                                            <div className="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div className="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div className="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>

                                    <div className="menu-items">
                                        <div className="white-background restaurant-img-sec menu-image">
                                            <div className="gray-background inter-crop-img"></div>
                                        </div>
                                        <div className="menu-item-description white-background restaurant-img-sec">
                                            <div className="gray-background inter-crop-img menu-detail"></div>
                                            <div className="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div className="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div className="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>
                                    <div className="menu-items">
                                        <div className="white-background restaurant-img-sec menu-image">
                                            <div className="gray-background inter-crop-img"></div>
                                        </div>
                                        <div className="menu-item-description white-background restaurant-img-sec">
                                            <div className="gray-background inter-crop-img menu-detail"></div>
                                            <div className="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div className="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div className="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>
                                    <div className="menu-items">
                                        <div className="white-background restaurant-img-sec menu-image">
                                            <div className="gray-background inter-crop-img"></div>
                                        </div>
                                        <div className="menu-item-description white-background restaurant-img-sec">
                                            <div className="gray-background inter-crop-img menu-detail"></div>
                                            <div className="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div className="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div className="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>

                                    <div className="menu-items">
                                        <div className="white-background restaurant-img-sec menu-image">
                                            <div className="gray-background inter-crop-img"></div>
                                        </div>
                                        <div className="menu-item-description white-background restaurant-img-sec">
                                            <div className="gray-background inter-crop-img menu-detail"></div>
                                            <div className="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div className="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div className="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>
                                    <div className="menu-items">
                                        <div className="white-background restaurant-img-sec menu-image">
                                            <div className="gray-background inter-crop-img"></div>
                                        </div>
                                        <div className="menu-item-description white-background restaurant-img-sec">
                                            <div className="gray-background inter-crop-img menu-detail"></div>
                                            <div className="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div className="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div className="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>
                                    <div className="menu-items">
                                        <div className="white-background restaurant-img-sec menu-image">
                                            <div className="gray-background inter-crop-img"></div>
                                        </div>
                                        <div className="menu-item-description white-background restaurant-img-sec">
                                            <div className="gray-background inter-crop-img menu-detail"></div>
                                            <div className="gray-background inter-crop-img menu-detail cost-sec"></div>
                                            <div className="gray-background inter-crop-img menu-detail add-button"></div>
                                            <div className="gray-background inter-crop-img menu-detail menu-desc"></div>
                                        </div>
                                    </div>

                                    <div className="menu-items">
                                        <img alt="food-item" src="images/image_res002.jpg"/>
                                        <div className="menu-item-description">
                                            <div className="menu-name">
                                                <div className="menu-wrap">
                                                    <h4>Dream Team Bucket</h4>
                                                    <div className="customize-list">
                                                        <span className="veg-item">£5.00</span>
                                                    </div>

                                                </div>
                                                <div className="menu-add-btn">
                                                    <a href="#">Add</a>
                                                </div>
                                            </div>
                                            <div className="menu-description">
                                                <p>Lorem ipsum dolor sit amet, consetetur eirmod tempor invidunt ut
                                                    labore et dolore magna.</p>
                                            </div>
                                            <div className="menu-add-btn-small proceed-add">
                                                <a href="#">Add</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="filter-overlay sidemenu-overlay" onclick="closeNav()"></div>
                        </div>
                    </div>
                    <div className="col-md-4 cart-summery-col">
                        <div className="order-summery card">
                            <div className="white-background restaurant-img-sec">
                                <div className="gray-background inter-crop-img"></div>
                                <div className="gray-background inter-crop-img cart-body"></div>
                                <div className="gray-background inter-crop-img cart-body selected-restaurant"></div>
                                <div className="gray-background inter-crop-img cart-menu-name"></div>
                                <div className="gray-background inter-crop-img cart-cost"></div>
                                <div className="gray-background inter-crop-img cart-quantity"></div>
                                <div className="gray-background inter-crop-img cart-price"></div>
                                <div className="gray-background inter-crop-img proceed-button"></div>
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