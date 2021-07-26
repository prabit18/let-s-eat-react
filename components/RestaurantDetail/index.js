import React from'react';
import BasicDetail from './RestaurantBasicDetail';
import { useRouter } from 'next/router';
import { UserAction } from '../../redux/actions/user.action';
import Offers from './Offer';
import { connect } from 'react-redux';
import MenuItems from './MenuList';
import Customizable from './Customizable';
import CartSummary from './CartSummary';
const RestaurantDetail=(props)=>{
  // console.log("qw",props);
   const{query}=useRouter();
    return(
        <>      
  <section className="main-section restaurant-main">
     <div className="page-banner restaurant-page-banner">
        <div className="offer-section-outer">
            <div className="container custom-container">
                <div className="restaurant-offer-detail">
                    <div className="row restaurant-row">
                        <div className="col-md-8 restaurant-col">
                            <BasicDetail  data={props}/>
                        </div> 
                        <div className="col-md-4 restaurant-col">
                            <Offers/>
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
                                    <MenuItems />
                        </div>
                    </div>
                    <CartSummary/>
                    </div>
            </div>
        </section>
        
 <div className="filter-overlay header-overlay"></div>
     <div className="search-popup">
        <div aria-hidden="true" aria-labelledby="exampleModalLabel" className="modal fade search-modal" id="exampleModal"
             role="dialog" tabIndex="-1">
            <div className="modal-dialog" role="document">
                <div className="modal-content" id="exampleModalLabel1">
                    <button aria-label="Close" className="close" data-dismiss="modal" type="button">
                        <img alt="close-icon" src="../../images/new-close.svg"/>
                    </button>
                    <div className="modal-header">
                        <div className="location-guide">
                            <a aria-label="Close" data-dismiss="modal" data-target="#exampleModal1" data-toggle="modal"
                               href="#">Sugnall Street, Liverpool, UK</a>
                        </div>
                    </div>
                    <div className="modal-body">
                        <form className="search-form" method="post">
                            <div className="form-group material-textfield">
                                <div><img alt="search" className="search-icon" src="../../images/search.svg"/></div>
                                <input  className="form-control" id="first-name"
                                       name="first-name" placeholder="Search for restaurant, cuisine or a dish"
                                       type="text"/>
                                <label className="text-label" for="first-name">Search for restaurant, cuisine or a
                                    dish</label>
                            </div>
                        </form>
                        <div className="resto-list">
                            <div className="card">
                                <div className="card-body">
                                    <div className="restaurant-info">
                                        <img alt="food-item" className="search-list-img" src="../../images/food-list2.jpg"/>
                                        <div className="resto-detail">
                                            <div className="food-desc">
                                                <h4>KFC</h4>
                                                <p>Lorem ipsum dolor sit consetetur sadipscing elitr.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="restaurant-info">
                                        <img alt="food-item" className="search-list-img" src="../../images/food-list4.jpg"/>
                                        <div className="resto-detail">
                                            <div className="food-desc">
                                                <h4>KFC</h4>
                                                <p>Lorem ipsum dolor sit consetetur sadipscing elitr.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="restaurant-info">
                                        <img alt="food-item" className="search-list-img" src="../../images/food-list6.jpg"/>
                                        <div className="resto-detail">
                                            <div className="food-desc">
                                                <h4>KFC</h4>
                                                <p>Lorem ipsum dolor sit consetetur sadipscing elitr.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </section>
      </>
    )
}  
  export default RestaurantDetail;