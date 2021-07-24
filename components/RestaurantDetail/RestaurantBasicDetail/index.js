import React from'react';
import { connect } from 'react-redux';
import { UserAction } from '../../../redux/actions/user.action';
const BasicDetail=(props)=>{
    
  // console.log(props.data.restaurant);
    return (
        <>
         <div className="restaurant-detail-outer">
                                <div className="restaurant-image">
                                    <img alt={props.alt_text} src={`https://development-cdn.letseat.co.uk/resize-image/170/${props.data.restaurant.image_url}`}/>
                                </div>
                                <div className="restaurant-header-info">
                                    <div className="restaurant-detail">
                                        <h3>{props.data.restaurant.name}</h3>
                                        <p>{props.data.restaurant.description}</p>
                                        <p className="restaurant-address">{props.data.restaurant.address}</p>
                                    </div>
                                    <div className="offer-delivery-detail">
                                        <ul>
                                            <li className="rating-box"><span><img alt="star-icon"
                                                                              src="../../images/Star-icon.svg"/>{props.data.restaurant.ratings < 2 ? props.data.restaurant.ratings + '.0' : props.data.restaurant.ratings}</span></li>
                                            <li>Delivery Fee <span>£{props.data.restaurant.delivery_charges}</span></li>
                                            <li>Min. Order <span>£{props.data.restaurant.min_order_value}</span></li>
                                            <li><span>Delivering Now</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
        </>
    )
}
export default BasicDetail;
