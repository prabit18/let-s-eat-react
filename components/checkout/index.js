import React from 'react';
const Checkout=()=>{
return(
  <>
 <div className="page-banner">
    <section className="main-section">
        <section className="cart-section">
            <div className="container custom-container">
                <div className="cart-body">
                    <div className="row custom-row custom-scrollbar">
                        <div className="col-lg-6">
                            <div className="cart-left">
                                <a className="back-to-restaurant" href="#"></a>
                                <h2>Order Summary</h2>
                                <div className="cart-left-content">
                                    <div className="cart-details">
                                        <div className="cart-details-header">
                                            <h3>KFC</h3>
                                            <p>95 Linthorpe Road, Middlesbrough, TS1 5DD</p>
                                        </div>
                                        <div className="toggle-section">
                                            <div className="toggle-item">
                                                <input type="radio" id="test1" name="radio-group"/>
                                                <label for="test1" className="delivery">Delivery<br/><span>30-40 Mins</span></label>
                                            </div>
                                            <div className="toggle-item">
                                                <input type="radio" id="test2" name="radio-group"/>
                                                <label for="test2" className="store-pick">Store Pick up<br/><span>15-20 Mins</span></label>
                                            </div>
                                        </div>
                                        <div className="preferred-time">
                                            <p>Select preferred delivery time</p>
                                            <div className="time-list-outer">
                                                <div className="time-list-inner">
                                                    <ul className="time-list custom-scrollbar">
                                                        <li>
                                                            <div className="time-item">
                                                                <input type="radio" id="time1" name="time-group"/>
                                                                <label for="time1" className="time-item-label">As soon as possible</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time2" name="time-group"/>
                                                                <label for="time2" className="time-item-label">Saturday 10:30</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time3" name="time-group"/>
                                                                <label for="time3" className="time-item-label">Saturday 11:00</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time4" name="time-group"/>
                                                                <label for="time4" className="time-item-label">Saturday 11:30</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time5" name="time-group"/>
                                                                <label for="time5" className="time-item-label">Saturday 12:00</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time6" name="time-group"/>
                                                                <label for="time6" className="time-item-label">Saturday 12:30</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time7" name="time-group"/>
                                                                <label for="time7" className="time-item-label">Saturday 01:00</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time8" name="time-group"/>
                                                                <label for="time8" className="time-item-label">Saturday 01:30</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time9" name="time-group"/>
                                                                <label for="time9" className="time-item-label">Saturday 01:00</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time10" name="time-group"/>
                                                                <label for="time10" className="time-item-label">Saturday 01:30</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time11" name="time-group"/>
                                                                <label for="time11" className="time-item-label">Saturday 01:00</label>
                                                            </div>
                                                            <div className="time-item">
                                                                <input type="radio" id="time12" name="time-group"/>
                                                                <label for="time12" className="time-item-label">Saturday 01:30</label>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="selected-items">
                                            <div className="select-item">
                                                <div className="select-item-inner">
                                                    <div className="selected-item-left veg">
                                                        <h4>Dream Team Bucket</h4>
                                                        <p>£5.00</p>
                                                    </div>
                                                    <div className="selected-item-right">
                                                        <div className="new-counter quantity-block">
                                                            <div className="new-up">
                                                                <button className="quantity-arrow-minus quantity">-</button>
                                                            </div>
                                                            <label className="label-input">
                                                                <input className="quantity-num form-control quantity qty" type="text" value="1"/>
                                                            </label>
                                                            <div className="new-down">
                                                                <button className="quantity-arrow-plus quantity">+</button>
                                                            </div>
                                                        </div>
                                                        <h4>£5.00</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="select-item">
                                                <div className="select-item-inner">
                                                    <div className="selected-item-left non-veg">
                                                        <h4>Dream Team Bucket</h4>
                                                        <p>£5.00</p>
                                                    </div>
                                                    <div className="selected-item-right">
                                                        <div className="new-counter quantity-block">
                                                            <div className="new-up">
                                                                <button className="quantity-arrow-minus quantity">-</button>
                                                            </div>
                                                            <label className="label-input">
                                                                <input className="quantity-num form-control quantity qty" type="text" value="1"/>
                                                            </label>
                                                            <div className="new-down">
                                                                <button className="quantity-arrow-plus quantity">+</button>
                                                            </div>
                                                        </div>
                                                        <h4>£5.00</h4>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="select-item">
                                                <div className="not-available-text">
                                                    <p>Below Item not available</p>
                                                    <a href="#">Remove</a>
                                                </div>
                                                <div className="select-item-inner not-available">
                                                    <div className="selected-item-left veg">
                                                        <h4>Cheese Burst Paneer Burger - Medium</h4>
                                                        <p>£6.20</p>
                                                    </div>
                                                    <div className="selected-item-right">
                                                        <div className="new-counter quantity-block">
                                                            <div className="new-up">
                                                                <button className="quantity-arrow-minus quantity">-</button>
                                                            </div>
                                                            <label className="label-input">
                                                                <input className="quantity-num form-control quantity qty" type="text" value="2"/>
                                                            </label>
                                                            <div className="new-down">
                                                                <button className="quantity-arrow-plus quantity">+</button>
                                                            </div>
                                                        </div>
                                                        <h4>£12.40</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="apply-offers">
                                        <div className="apply-offer-header">
                                            <img src="images/offers.svg" alt="Offers"/>
                                            <h3>APPLY offer</h3>
                                        </div>
                                        <form>
                                            <div className="form-group">
                                                <label for="apply-code"></label>
                                                <input type="text" id="apply-code" className="form-control" placeholder="Enter coupon code if you have"/>
                                                <button type="button" className="form-control" disabled>Apply</button>
                                            </div>
                                        </form>
                                        <div className="pricing">
                                            <h4>Subtotal <span>£17:40</span></h4>
                                            <p>Taxes and other Charges <span>0.40</span></p>
                                            <p>delivery charges <span>0.40</span></p>
                                            <p>Offers/Coupons Discount <span>0.00</span></p>
                                            <h3>Grand Total <span>£18:20</span></h3>
                                        </div>
                                        <div className="suggestion">
                                            <h4>Suggestions</h4>
                                            <form>
                                                <div className="form-group">
                                                    <label for="exampleFormControlTextarea1"></label>
                                                    <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Any Suggestions?"></textarea>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="disclaimer-section">
                                        <div className="disclaimer-content">
                                            <img src="images/Icon-info.svg" alt="Info_Icon"/>
                                            <div className="disclaimer-text">
                                                <p><span className="text-bold">Loremipsum dolor sit amet, consetet</span><br/>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sediam noneirteminv iduntut labore et dolore magna aliquyam erat.</p>
                                                <p className="text-red">consetetur sadipscing elitr, sed diam noneir teminviduntutlabore</p>
                                            </div>
                                        </div>
                                        <div className="proceed-button">
                                            <a href="#" data-toggle="modal" data-target="#loginModal">Proceed to Checkout</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="delivery-address">
                                <div className="address-header">
                                    <div className="address-left">
                                        <img src="images/address_icon.svg" alt="Address_Icon"/>
                                        <div className="address-text">
                                            <h2>Delivery Address</h2>
                                            <p>Set your delivery address or add new</p>
                                        </div>
                                    </div>
                                    <div className="add-button">
                                        <a href="#" data-toggle="modal" data-target="#setDeliveryLocation">Add New</a>
                                    </div>
                                </div>
                                <div className="address-outer custom-scrollbar">
                                    <div className="address-item">
                                        <div className="">
                                            <input type="radio" id="address1" name="address-group" />
                                            <label for="address1">Unit 223, Sea View Cottages, 82, Wood St<br/> Liverpool, L1 4DQ, UK</label>
                                        </div>
                                        <div className="address-actions">
                                            <a href="#" data-toggle="modal" data-target="#editAddress" className="edit">Edit</a>
                                            <a href="#" data-toggle="modal" data-target="#deleteAddress" className="delete">Delete</a>
                                        </div>
                                    </div>
                                    <div className="address-item">
                                        <div className="">
                                            <input type="radio" id="address2" name="address-group"/>
                                            <label for="address2">23 Southgyle Crescent, Colquitt Street<br/> Liverpool, L1 4DE</label>
                                        </div>
                                        <div className="address-actions">
                                            <a href="#" data-toggle="modal" data-target="#editAddress" className="edit">Edit</a>
                                            <a href="#" data-toggle="modal" data-target="#deleteAddress" className="delete">Delete</a>
                                        </div>
                                    </div>
                                    <div className="address-item">
                                        <div className="">
                                            <input type="radio" id="address3" name="address-group"/>
                                            <label for="address3">23 Southgyle Crescent, Colquitt Street<br/> Liverpool, L1 4DE</label>
                                        </div>
                                        <div className="address-actions">
                                            <a href="#" data-toggle="modal" data-target="#editAddress" className="edit">Edit</a>
                                            <a href="#" data-toggle="modal" data-target="#deleteAddress" className="delete">Delete</a>
                                        </div>
                                    </div>
                                    <div className="address-item">
                                        <div className="">
                                            <input type="radio" id="address4" name="address-group"/>
                                            <label for="address4">23 Southgyle Crescent, Colquitt Street<br/> Liverpool, L1 4DE</label>
                                        </div>
                                        <div className="address-actions">
                                            <a href="#" data-toggle="modal" data-target="#editAddress" className="edit">Edit</a>
                                            <a href="#" data-toggle="modal" data-target="#deleteAddress" className="delete">Delete</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="payment">
                                <div className="address-header">
                                    <div className="address-left">
                                        <img src="images/payment_icon.svg" alt="Payment_Icon"/>
                                        <div className="address-text">
                                            <h2>Payment</h2>
                                            <p>You can select a payment method from your listed options</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="payment-options">
                                    <div className="payment-item">
                                        <div className="payment-select">
                                            <input type="radio" id="payment1" name="payment-group" />
                                            <label for="payment1">Pay with Debit or Credit Card</label>
                                        </div>
                                        <label for="payment1" className="label-img"><img src="images/cc_icon.svg" alt="Card_Payment"/></label>
                                    </div>
                                    <div className="payment-item">
                                        <div className="payment-select">
                                            <input type="radio" id="payment2" name="payment-group"/>
                                            <label for="payment2">Pay with PayPal</label>
                                        </div>
                                        <label for="payment2" className="label-img"><img src="images/paypal.svg" alt="Paypal"/></label>
                                    </div>
                                    <div className="payment-item">
                                        <div className="payment-select">
                                            <input type="radio" id="payment3" name="payment-group"/>
                                            <label for="payment3">Visa Check Out</label>
                                        </div>
                                        <label for="payment3" className="label-img"><img src="images/visa_icon.svg" alt="Visa"/></label>
                                    </div>
                                    <div className="payment-item">
                                        <div className="payment-select">
                                            <input type="radio" id="payment4" name="payment-group"/>
                                            <label for="payment4">Cash on Delivery</label>
                                        </div>
                                        <label for="payment4" className="label-img"><img src="images/cash_icon.svg" alt="Cash_on_delivery"/></label>
                                    </div>
                                </div>
                                <div className="proceed-button">
                                    <a href="#">Place your Order</a>
                                </div>
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
export default Checkout;