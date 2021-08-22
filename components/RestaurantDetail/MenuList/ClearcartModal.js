import React from 'react'

function ClearcartModal({handleClearCart,handleOpenClose}) {
    return (
        <div class="exist-item-popup">
            <div class="exist-cart-inner">
              <h3>Items already in cart</h3>
              <p>
                Your cart contains items from other restaurant.
                <br />
                Would you like to reset your cart for adding items
                <br /> from this restaurant?
              </p>
              <div class="exist-cart-btn">
                <button type="button" onClick={() =>handleOpenClose() }>
                  No
                </button>
                <button
                  type="button"
                  class="start-fresh"
                  onClick={() => handleClearCart()}
                >
                  Yes, Start afresh
                </button>
              </div>
            </div>
          </div>
    )
}

export default ClearcartModal
