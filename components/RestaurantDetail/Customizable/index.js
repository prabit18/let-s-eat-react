import React from 'react';
const Customizable=({show})=>{
    return(
        <>
        { true?
        <div className="customize-list-popup">  
        <div aria-hidden="true" aria-labelledby="exampleModalLabel2" className="modal fade" id="exampleModal2" role="dialog"
             tabIndex="-1">
            <div className="modal-dialog" role="document">
                <div className="modal-content" id="exampleModalLabel2">
                    <button aria-label="Close" className="close" data-dismiss="modal" type="button">
                        <img alt="close-icon" src="images/new-close.svg"/>
                    </button>
                    <div className="modal-header">
                        <h2>Cheese Burst Paneer Burger</h2>
                    </div>
                    <div className="modal-body">
                        <div className="quantity">
                            <p>Quantity</p>
                        </div>
                        <div className="customize-items-box">
                            <div className="customize-items">
                                <div className="customize-items-outer">
                                    <div className="customize-items-description">
                                        <h4>Medium Burger</h4>
                                        <p>Cheese Burst Paneer Medium Burger + 4 Pc Nuggets + Coke (S)</p>
                                    </div>
                                    <div className="customize-items-price">
                                        <h4>£2.80</h4>
                                    </div>
                                </div>
                                <div className="new-counter quantity-block">
                                    <div className="new-up">
                                        <button className="quantity-arrow-minus quantity">-</button>
                                    </div>
                                    <label className="restaurant-list-label" for="quantity-three"></label>
                                    <input about="317" className="quantity-num form-control quantity qty" type="number"
                                           value="1" id="quantity-three"/>
                                    <div className="new-down">
                                        <button className="quantity-arrow-plus quantity">+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="customize-items">
                                <div className="customize-items-outer">
                                    <div className="customize-items-description">
                                        <h4>Medium Burger</h4>
                                        <p>Cheese Burst Paneer Medium Burger + 4 Pc Nuggets + Coke (S)</p>
                                    </div>
                                    <div className="customize-items-price">
                                        <h4>£2.80</h4>
                                    </div>
                                </div>
                                <div className="customize-items-btn">
                                    <a href="#">Add</a>
                                </div>
                            </div>
                            <div className="customize-items">
                                <div className="customize-items-outer">
                                    <div className="customize-items-description">
                                        <h4>Medium Burger</h4>
                                        <p>Cheese Burst Paneer Medium Burger + 4 Pc Nuggets + Coke (S)</p>
                                    </div>
                                    <div className="customize-items-price">
                                        <h4>£2.80</h4>
                                    </div>
                                </div>
                                <div className="customize-items-btn">
                                    <a href="#">Add</a>
                                </div>
                            </div>
                        </div>
                        <div className="add-to-order enable">
                            <a href="#">Add to Order</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> :null}
    {/* {
        show?<div>
        <p>customizable is coming!</p>
    </div>:null} */}
        </>
    )
}
export default Customizable;