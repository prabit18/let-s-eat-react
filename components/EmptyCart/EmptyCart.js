import React from 'react'

function EmptyCart() {
    return (
        <section class="main-section">
            <section class="cart-section">
                <div class="container custom-container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="empty-cart">
                                <img src="images/empty_cart.svg" alt="Empty_cart"/>
                                <p>Your cart is currently empty</p>
                                <div class="back-button">
                                    <a href="/restaurants?Curated_type=best-in-city" class="hvr-icon-back"><img src="images/back_arrow.svg" alt="Back_Arrow" class="hvr-icon"/>Back to Restaurant</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}

export default EmptyCart
