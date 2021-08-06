import router from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { UserAction } from "../../../redux/actions/user.action";
import MenulistContext from "../../Context/MenulistContext";
import MenuList from "../MenuList";
const CartSummary = (props) => {
  const { foodItems,
    SetFoodItems,
    loader,
    menuObject,
    setmenuObject,
    cart_item_objs_v1,
    setcart_item_objs_v1,
    cart_item_objs_v2,
    setcart_item_objs_v2,
    cartItem, 
    setCartItem} = useContext(MenulistContext);
  const [alert, setalert] = useState(false);
  const[count,setcount]=useState([])
  const { Menulist, Restaurant } = props;
 


  useEffect(() => { 


   }, [cartItem,cart_item_objs_v1,cart_item_objs_v2]);
  
  const findindex = (id) => { 
    var elementPos = cartItem.map(function (x) {
        return x.id;
      }).indexOf(id);
    return elementPos;
  };
  
  const handleIncrement = (data) => {
    let final = [
      {
        id: data.id,
        quantity: 1,
        name:data.name,
        menu_id: data.id,
        restaurant_id: data.restaurant_id,
        
      },
    ];

    handleCartinc(final);
  };
  const handleCartinc = (cartItemvalue) => {
    // handlecartV2(cartItemvalue)
    let CartV1={...cart_item_objs_v1}
    if (CartV1[cartItemvalue[0].id]) {
      CartV1[cartItemvalue[0].id]++;
    }
    setcart_item_objs_v1(CartV1 );
    localStorage.setItem('cart_item_objs_v1',JSON.stringify(CartV1))

    setcount((prevValue) => [...prevValue, count + 1]);
  };

  const handleDecrement = (data) => {
    let final = [{
        id: data.id,
        quantity: 1,
        name:data.name,
        menu_id: data.id,
        restaurant_id: data.restaurant_id,
      }];
    if (cart_item_objs_v1[data.id] === 1) {
      let index = findindex(data.id);
      if (index > -1) {
        let originlArray=[...cartItem]
        originlArray.filter((val)=>val!==originlArray[index])
        originlArray.splice(index, 1);
        setCartItem(originlArray);
        localStorage.setItem('cartItem',JSON.stringify(originlArray))

        setcount((prevValue) => [...prevValue, count + 1]);      
      }
    }
    handleCartRemove(final);
  };

  const handleCartRemove = (cartItemvalue) => {
    let CartV1={...cart_item_objs_v1}
    if (CartV1[cartItemvalue[0].id]) {
      CartV1[cartItemvalue[0].id]--;
    }
    setcart_item_objs_v1(CartV1);
    localStorage.setItem('cart_item_objs_v1',JSON.stringify(CartV1))

    setcount((prevValue) => [...prevValue, count + 1]);
  };

  //varient increment
  const handleVarientincrement = (data) => {
    handlecartSingleIncrement(data);
    let CartV1={...cart_item_objs_v1}
    if (CartV1[data.id]) {
      CartV1[data.id]++;
    }
    setcart_item_objs_v1(CartV1);
    localStorage.setItem('cart_item_objs_v1',JSON.stringify(CartV1))

    setcount((prv) => [...prv, count + 1]);
  };
  const handlecartSingleIncrement = (data) => {
    let CartV2={...cart_item_objs_v2}
    if (CartV2[data.menu_id]) {
      CartV2[data.menu_id]++ ;
    }
    setcart_item_objs_v2(CartV2);
    localStorage.setItem('cart_item_objs_v2',JSON.stringify(CartV2))

    setcount((prv) => [...prv, count+1]);
  };

  //varient decrement
  const handleVarientDecrement = (data) => {
    handlecartSingleDecrement(data);
    if (cart_item_objs_v1[data.id] === 1) {
      let index = findindex(data.id);
      if (index > -1) {
        let originlArray=[...cartItem]
        originlArray.filter((val)=>val!==originlArray[index])
        originlArray.splice(index, 1);
        setCartItem(originlArray);
        localStorage.setItem('cartItem',JSON.stringify(originlArray))
        setcount((prevValue) => [...prevValue, count + 1]);
        
      }
     
    }
    let CartV1={...cart_item_objs_v1}
    if (CartV1[data.id]) {
      CartV1[data.id]--;
    }
    setcart_item_objs_v1(CartV1);
    localStorage.setItem('cart_item_objs_v1',JSON.stringify(CartV1))

  };

  const handlecartSingleDecrement = (data) => {
    let cartV2={...cart_item_objs_v2}
    if (cartV2[data.menu_id]) {
      cartV2[data.menu_id]--;
    }
    setcart_item_objs_v2(cartV2);
    localStorage.setItem('cart_item_objs_v2',JSON.stringify(cartV2))
  };

  const [deliveryOption, setdeliveryOption] = useState();
  const handleDeliveryOption = (e) => {
    setdeliveryOption(e.target.name);
    setalert(false);
  };

  const handleproceed = () => {
    if (deliveryOption === undefined) {
      setalert(true);
    } else {
      router.push("/checkout");
    }
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
                <div class="payment-item delivery-item active">
                  <input
                    type="radio"
                    id="test1"
                    name="delivery"
                    checked={deliveryOption === "delivery" ? true : false}
                    onChange={(e) => handleDeliveryOption(e)}
                  />
                  <label for="test1" class="delivery">
                    Delivery<br></br>
                    <span>30-40 Mins</span>
                  </label>
                  <img
                    src="../../images/new-delivery-icon.svg"
                    alt="delivery-icon"
                  />
                </div>
                <div class="payment-item delivery-item">
                  <input
                    type="radio"
                    id="test2"
                    name="store-pickup"
                    checked={deliveryOption === "store-pickup" ? true : false}
                    onChange={(e) => handleDeliveryOption(e)}
                  />
                  <label for="test2" class="store-pick">
                    Store Pick up<br></br>
                    <span>15-20 Mins</span>
                  </label>
                  <img
                    src="../../images/new-store-pickup.svg"
                    alt="store-icon"
                  />
                </div>
              </div>
              <div class="service-not-available">
                {alert ? <p>Please choose your order type</p> : ""}
              </div>
            </div>
            <div className="added-items">
              <div className="added-restaurant">
                <h4>{Restaurant.name}</h4>
                <p>{Restaurant.area}</p>
              </div>
              {cartItem.length > 0
                ? cartItem.map((item, i) => (
                    <div className="added-food-box">
                      <div className={menuObject[item.id].veg?"summery-veg-item":"summery-food-item"}>
                        <div className="food-item-wrap">
                          <p>{menuObject[item.id].name}-{item.name}</p>
                          <p className="food-item-price">£{menuObject[item.id].le_price}</p>
                        </div>
                      </div>
                      <div className="quantity-change">
                       {item.variant===false?<>
                        <div className="new-counter quantity-block">
                          <div className="new-up">
                            <button
                              className="quantity-arrow-minus quantity"
                              onClick={() => handleDecrement(item)}
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
                            value={cart_item_objs_v1[item.id]}
                            id="quantity-one"
                          />
                          <div className="new-down">
                            <button
                              className="quantity-arrow-plus quantity"
                              onClick={() => handleIncrement(item)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                       </>:<>
                       <div className="new-counter quantity-block">
                          <div className="new-up">
                            <button
                              className="quantity-arrow-minus quantity"
                              onClick={() => handleVarientDecrement(item)}
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
                            value={cart_item_objs_v1[item.id]}
                            id="quantity-one"
                          />
                          <div className="new-down">
                            <button
                              className="quantity-arrow-plus quantity"
                              onClick={() => handleVarientincrement(item)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                       </>}
                        <p></p>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
            <div className="card-footer">
              {cartItem.length > 0 ? (
                <div className="proceed-btn" style={{cursor:"pointer"}}>
                  <a onClick={handleproceed}>Proceed to Checkout</a>
                </div>
              ) : (
                cartItem.length < 1 && (
                  <div class="empty-cart-summery">
                    <img src="/images/empty-bg.svg" alt="empty-cart" />
                    <p>your cart is currently empty</p>
                  </div>
                )
              )}
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