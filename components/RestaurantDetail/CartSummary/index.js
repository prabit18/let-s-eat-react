
import React from 'react';
const CartSummary=()=>{
    return(
        <>
         <div className="col-md-4 cart-summery-col">
                        <div className="order-summery card">
                            <div className="card-header">
                                <img alt="summery-title" src="../../images/summary_title.svg"/>
                            </div>
                            <div className="card-body">
                                <div className="instructions">
                                    <img alt="info-circle" src="../../images/info-circle.svg"/>
                                    <p>Click here if you or someone you are ordering for has a food allergy</p>
                                </div>
                                <div className="delivery-option">
                                    <div className="toggle-section">
                                        <div className="toggle-item">
                                            <input id="test3" name="radio-group" type="radio"/>
                                            <label className="delivery"
                                                   for="test3">Delivery<br/><span>30-40 Mins</span></label>
                                        </div>
                                        <div className="toggle-item">
                                            <input  id="test4" name="radio-group" type="radio"/>
                                            <label className="store-pick" for="test4">Store Pick
                                                up<br/><span>15-20 Mins</span></label>
                                        </div>
                                    </div>
                                </div>
                                <div className="added-items">
                                    <div className="added-restaurant">
                                        <h4>KFC</h4>
                                        <p>95 Linthorpe Road, Middlesbrough, TS1…</p>
                                    </div>
                                    <div className="added-food-box">
                                        <div className="summery-food-item">
                                            <div className="food-item-wrap">
                                                <p>Dream Team Bucket</p>
                                                <p className="food-item-price">£5.00</p>
                                            </div>
                                        </div>
                                        <div className="quantity-change">
                                            <div className="new-counter quantity-block">
                                                <div className="new-up">
                                                    <button className="quantity-arrow-minus quantity">-</button>
                                                </div>
                                                <label className="restaurant-list-label" for="quantity-one"></label>
                                                <input about="317" className="quantity-num form-control quantity qty"
                                                       type="number" value="3" id="quantity-one"/>
                                                <div className="new-down">
                                                    <button className="quantity-arrow-plus quantity">+</button>
                                                </div>
                                            </div>
                                            <p>£5.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                <div className="proceed-btn">
                                    <a href="checkout.html">Proceed</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
        </>
    )
}
export default CartSummary;





 