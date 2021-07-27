import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { UserAction } from "../../../redux/actions/user.action";
import MenuList from "../MenuList";
const CartSummary = (props) => {
  const { Menulist, Restaurant } = props;
  const [menuListDetails, setMenuListDetails] = useState(JSON.parse(localStorage.getItem('menuItems'))
  );
  var localData = JSON.parse(localStorage.getItem("menuItems"));
  useEffect(() => {
      // When local storage changes, dump the list to
      // the console.
      setMenuListDetails(JSON.parse(localStorage.getItem("menuItems")));
    
  }, [menuListDetails]);

  const doEmptyAction = localData && localData.some((o) => o.count === 0);
  
  var cartArray = [];
  if (doEmptyAction) {
    menuListDetails.filter((val) => {
      if (val.count !== 0) {
        cartArray.push({
          id: val.cart[0].id,
          name: val.cart[0].name,
          count: val.count,
          price: val.cart[0].price,
          veg:val.cart[0].veg,
        });
      }
    });
  }
  const findindex = (id) => {
    var elementPos = menuListDetails
      .map(function (x) {
        return x.id;
      })
      .indexOf(id);
    return elementPos;
  };
  const decrement = (id) => {
    let food = [...menuListDetails];
    let index = findindex(id);
    let product = food[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      product.cart = [];
      localStorage.setItem('menuItems',JSON.stringify(food))
      setMenuListDetails(food);
    } else {
      localStorage.setItem('menuItems',JSON.stringify(food))
      setMenuListDetails(food);
    }
  };
  
  const increment = (id) => {
    let food = [...menuListDetails]
    let index = findindex(id);
    let product = food[index];

    product.count = product.count + 1;
    localStorage.setItem("menuItems", JSON.stringify(food));

    setMenuListDetails(localStorage.setItem("menuItems", JSON.stringify(food)));
  };

  return (
    <>
      <div className="col-md-4 cart-summery-col">
        <div className="order-summery card">
          <div className="card-header">
            <img alt="summery-title" src="../../images/summary_title.svg" />
          </div>
          <div className="card-body">
            <div className="instructions">
              <img alt="info-circle" src="../../images/info-circle.svg" />
              <p>
                Click here if you or someone you are ordering for has a food
                allergy
              </p>
            </div>
            <div className="delivery-option">
              <div className="toggle-section">
                <div className="toggle-item">
                  <input id="test3" name="radio-group" type="radio" />
                  <label className="delivery" for="test3">
                    Delivery
                    <br />
                    <span>{Restaurant.delivery_time}</span>
                  </label>
                </div>
                <div className="toggle-item">
                  <input id="test4" name="radio-group" type="radio" />
                  <label className="store-pick" for="test4">
                    Store Pick up
                    <br />
                    <span>{Restaurant.store_pickup_time}</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="added-items">
              <div className="added-restaurant">
                <h4>{Restaurant.name}</h4>
                <p>{Restaurant.area}</p>
              </div>
              {cartArray.length > 0
                ? cartArray.map((item, i) => (
                    <div className="added-food-box">
                      <div className="summery-food-item">
                        <div className="food-item-wrap">
                          <p>{item.name}</p>
                          <p className="food-item-price">£{item.price}</p>
                        </div>
                      </div>
                      <div className="quantity-change">
                        <div className="new-counter quantity-block">
                          <div className="new-up">
                            <button
                              className="quantity-arrow-minus quantity"
                              onClick={() => decrement(item.id)}
                            >
                              -
                            </button>
                          </div>
                          <label
                            className="restaurant-list-label"
                            for="quantity-one"
                          ></label>
                          <input
                            about="317"
                            className="quantity-num form-control quantity qty"
                            type="number"
                            value={item.count}
                            id="quantity-one"
                          />
                          <div className="new-down">
                            <button
                              className="quantity-arrow-plus quantity"
                              onClick={() => increment(item.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <p>£{item.price}</p>
                      </div>
                    </div>
                )) : (
                <div style={{ textAlign: "center" }}></div>
              )
                }
                </div>
            <div className="card-footer">
              <div className="proceed-btn">
                {cartArray.length > 0 ? (
                  <a href="/checkout" className={"disbled"}>
                    Proceed to checkout
                  </a>
                ) : (
                  <a href="#" style={{ opacity: 0.4, cursor: "default" }}>
                    Proceed to checkout
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  const { Menulist, Restaurant } = state;
  return { Menulist, Restaurant };
};
const actionCreator = {
  getMenulist: UserAction.getMenulist,
  getcart: UserAction.getcart,
};
export default connect(mapStateToProps, actionCreator)(CartSummary);
