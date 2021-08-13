import router from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { UserAction } from "../../../redux/actions/user.action";
import { dataService } from "../../../services";
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
 const [menuObj, setmenuObj] = useState({})
 const [loading, setloading] = useState()

useEffect(() => {
  setdeliveryOption(localStorage.getItem('delivery_type'))
 if(!JSON.parse(localStorage.getItem('user'))){
   
   if(JSON.parse(localStorage.getItem('menuObject'))){
   setmenuObj(JSON.parse(localStorage.getItem('menuObject')))
   }
  // setCartItem( JSON.parse(localStorage.getItem('cartItem',cartItem)))
 }else{
   setmenuObj(props.menuObject)
 }
}, [])


  

  const findindex = (id) => { 
    
    var elementPos = cartItem.map(function (x) {
        return x.variant_id;
      }).indexOf(id);
    return elementPos;
  };
  
  const handleIncrement = (data) => {
    console.log("calling");
    if(!JSON.parse(localStorage.getItem('user'))){
      console.log("data",data)
      let final = [
        {
          variant_id: data.variant_id,
          quantity: 1,
          name:data.name,
          item_id: data.id,
          restaurant_id: data.restaurant_id,
          
        },
      ];
  
      handleCartinc(final);
    }else{
      console.log("data increment", data);
      var data_body={
        "rest_id": data.rest_id||Restaurant.id,
        "item_id": data.item_id,
        "quantity":"1",
        "variant_id":data.variant_id
    } 
      dataService.AddTocart(data_body).then((resp)=>{
console.log("data",resp.data);
        if(resp.data!==null){
          var response=resp.data
          console.log("resp",response);
          handleCartinc([response]);

        }
       
      })
    }
    
  };
  const handleCartinc = (cartItemvalue) => {
    var CartV1={...cart_item_objs_v1}

    if(!JSON.parse(localStorage.getItem('user'))){
      if (CartV1[cartItemvalue[0].variant_id]) {
        CartV1[cartItemvalue[0].variant_id]++;
      }
      props.getcartV1(CartV1)
      setcart_item_objs_v1(CartV1);
      localStorage.setItem('cart_item_objs_v1',JSON.stringify(CartV1))
      setcount((prevValue) => [...prevValue, count + 1]);

    }else{
      if (CartV1[cartItemvalue[0].variant_id]) {
        CartV1[cartItemvalue[0].variant_id]++;
      }
      props.getcartV1(CartV1)
      setcart_item_objs_v1(CartV1);

    }
   
  };

  const handleDecrement = (data) => {
    if(!JSON.parse(localStorage.getItem('user'))){
      let final = [
        {
          variant_id: data.variant_id,
          quantity: 1,
          name:data.name,
          item_id: data.id,
          restaurant_id: data.restaurant_id,
        },
      ];
    debugger
      if (cart_item_objs_v1[data.variant_id] === 1) {
        let index = findindex(data.variant_id);
        if (index > -1) {
          let originlArray=[...cartItem]
          originlArray.filter((val)=>val!==originlArray[index])
          originlArray.splice(index, 1);
          setCartItem(originlArray);
          if(!JSON.parse(localStorage.getItem('user'))){
                      localStorage.setItem('cartItem',JSON.stringify(originlArray))

          }
        }   
      }
      handleCartRemove(final);
    
    }else{
      debugger
      let data_body ={
        "rest_id":data.rest_id||Restaurant.id,
        "item_id": data.item_id,
        "variant_id":data.variant_id,
        "quantity":"-1"
    
    }
    
    dataService.AddTocart(data_body).then((resp)=>{
    
      if(resp){
        console.log('respdelet',data)

        if (parseInt(cart_item_objs_v1[data.variant_id]) === 1) {
          let index = findindex(data.variant_id);
          if (index > -1) {
            let originlArray=[...cartItem]
            originlArray.filter((val)=>val!==originlArray[index])
            console.log(originlArray);
            originlArray.splice(index, 1);
            setCartItem(originlArray);
            localStorage.setItem('cartItem',JSON.stringify(originlArray))
            setcount((prevValue) => [...prevValue, count + 1]);
          }   
        }
        handleCartRemove(data_body)
      }
    
    }) 
    }
        
      };

      const handleCartRemove = (cartItemvalue) => {
        
        var CartV1={...cart_item_objs_v1}
        if(!JSON.parse(localStorage.getItem('user'))){
          if (CartV1[cartItemvalue[0].variant_id]) {
            CartV1[cartItemvalue[0].variant_id]--;
            props.getcartV1(CartV1)
            setcart_item_objs_v1(CartV1);
    
          }
        }else{
          if (CartV1[cartItemvalue.variant_id]) {
            CartV1[cartItemvalue.variant_id]--;
          }
          props.getcartV1(CartV1)
          setcart_item_objs_v1(CartV1);  
        }      
        localStorage.setItem('cart_item_objs_v1',JSON.stringify(CartV1))
        setcount((prevValue) => [...prevValue, count + 1]);
      };

  //varient increment
  const handleVarientincrement = (data) => {
    console.log("data",data);
    let CartV1={...cart_item_objs_v1}

    if(!localStorage.getItem('user')){
      handlecartSingleIncrement(data);
    let CartV1={...cart_item_objs_v1}
    if (CartV1[data.variant_id]) {
      CartV1[data.variant_id]++;
    }
    props.getcartV1(CartV1)
    setcart_item_objs_v1(CartV1);
    localStorage.setItem('cart_item_objs_v1',JSON.stringify(CartV1))

    }else{
      let data_body ={
        "rest_id":data.rest_id||Restaurant.id,
        "item_id": data.item_id,
        "variant_id":data.variant_id,
        "quantity":"1"
    
    }
      console.log("data--->inc",data_body);
      dataService.AddTocart(data_body).then((resp)=>{
        console.log("response",resp)
        if(resp){
          handlecartSingleIncrement(resp.data);    
        if (CartV1[resp.data.variant_id]) {
        CartV1[resp.data.variant_id]++;
        }
        }
        props.getcartV1(CartV1)
        setcart_item_objs_v1(CartV1);
        })
  
      }
  };
  const handlecartSingleIncrement = (data) => {
    let CartV2={...cart_item_objs_v2}
    if(!JSON.parse(localStorage.getItem('user'))){
      if (CartV2[data.item_id]) {
        CartV2[data.item_id]++ ;
      }
      props.getcartV2(CartV2)
      setcart_item_objs_v2(CartV2);
      localStorage.setItem('cart_item_objs_v2',JSON.stringify(CartV2))
    }else{
      console.log("data-->menu",data.item_id);
      if (CartV2[data.item_id]) {
        CartV2[data.item_id]++ ;
      }
      props.getcartV2(CartV2)
      setcart_item_objs_v2(CartV2);
      console.log("cartV2-->",CartV2);
    }
    
  };

  //varient decrement
  const handleVarientDecrement = (data) => {
    console.log("calling varient");

    if(!JSON.parse(localStorage.getItem('user'))){
      handlecartSingleDecrement(data);
    if (cart_item_objs_v1[data.variant_id] === 1) {
      let index = findindex(data.variant_id);
      if (index > -1) {
        let originlArray=[...cartItem]
        originlArray.filter((val)=>val!==originlArray[index])
        originlArray.splice(index, 1);
        localStorage.setItem('cartItem',JSON.stringify(originlArray))
        setCartItem(originlArray);
        setcount((prevValue) => [...prevValue, count + 1]);
      }
    }
    let CartV1={...cart_item_objs_v1}
    if (CartV1[data.variant_id]) {
      CartV1[data.variant_id]--;
    }
    props.getcartV1(CartV1)
    setcart_item_objs_v1(CartV1);
    localStorage.setItem('cart_item_objs_v1',JSON.stringify(CartV1))
    }
    else{
      let data_body ={
        "rest_id":data.rest_id||Restaurant.id,
        "item_id": data.item_id,
        "variant_id":data.variant_id,
        "quantity":"-1"
    }
    console.log("dec data",data);
      dataService.AddTocart(data_body).then((resp)=>{
        console.log("response--->",resp.data);
        debugger
        if(resp){
          handlecartSingleDecrement(data);
            if (parseInt(cart_item_objs_v1[data.variant_id]) === 1) {
      let index = findindex(data.variant_id);
              if (index > -1) {
                let originlArray=[...cartItem]
                originlArray.filter((val)=>val!==originlArray[index])
                originlArray.splice(index, 1);
                localStorage.setItem('cartItem',JSON.stringify(originlArray))
                setCartItem(originlArray);
              }
    }
        let CartV1={...cart_item_objs_v1}
        if (CartV1[data.variant_id]) {
          CartV1[data.variant_id]--;
        }
        props.getcartV1(CartV1)
        setcart_item_objs_v1(CartV1);
        }
      })
    }

  };

  const handlecartSingleDecrement = (data) => {
    let cartV2={...cart_item_objs_v2}
    console.log("data--->",data.item_id,cartV2);

    if(!JSON.parse(localStorage.getItem('user'))){
      if (cartV2[data.item_id]) {
        cartV2[data.item_id]--;
      }
      props.getcartV1(cartV2)
      setcart_item_objs_v2(cartV2);
    localStorage.setItem('cart_item_objs_v2',JSON.stringify(cartV2))

    }else{
      console.log("decrement",data);
      if (cartV2[data.item_id]) {
        
        cartV2[data.item_id]--;
      }
      props.getcartV2(cartV2)
      setcart_item_objs_v2(cartV2);
    }
    


  };

  const [deliveryOption, setdeliveryOption] = useState(null);
  const handleDeliveryOption = (e) => {
    setdeliveryOption(e.target.name);
    setalert(false);
    localStorage.setItem('delivery_type',e.target.name)
  };

  const handleproceed = () => {
    console.log("delivery-->",deliveryOption);
    if (deliveryOption === null) {
      setalert(true);
    } else {
      router.push("/checkout");
    }
  };
//   if(Object.keys(menuObj).length>0){
//     debugger
// console.log("menu",menuObj);
//   }
  console.log("menuObjectCart",cartItem)
var newdelivery="new-delivery"
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
                <div className={deliveryOption==='delivery'?"payment-item delivery-item active delivery-box":"payment-item delivery-item delivery-box"}>
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
                    src={`../../images/${deliveryOption!=="delivery"?"new-delivery-icon":"act_delivery_icon"}.svg`}
                    alt="delivery-icon"
                  />
                </div>
                <div className={deliveryOption==="store-pickup"?"payment-item delivery-item store-box active":"payment-item delivery-item store-box"}>
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
                    src={`../../images/${deliveryOption!=="store-pickup"?"new-store-pickup":"act_store_pickup"}.svg`}
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
              {cartItem.length>0
                && cartItem.map((item, i) => (
                  <>{cart_item_objs_v1[item.variant_id]!==0?
                    <div className="added-food-box">
                      <div className={item.veg?"summery-veg-item":"summery-food-item"}>
                        <div className="food-item-wrap">
                          <p>{item.name}</p>
                          <p className="food-item-price">£{item.le_price}</p>
                        </div>
                      </div>
                      <div className="quantity-change">
                       {item.isVariant===false ?<>{cart_item_objs_v1[item.variant_id]!==0 &&
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
                            value={cart_item_objs_v1[item.variant_id]}
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
                        </div>}
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
                            value={cart_item_objs_v1[item.variant_id]}
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
:""}</>
) 
)}
            </div>
            <div className="card-footer">
              {cartItem&&cartItem.length > 0 ? (
                <div className="proceed-btn" style={{cursor:"pointer"}}>
                  <a onClick={handleproceed}>Proceed to Checkout</a>
                </div>
              ) : (
                cartItem&&cartItem.length < 1 && (
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
  const { Menulist, Restaurant,menuObject } = state;
  return { Menulist, Restaurant ,menuObject};
};
const actionCreator = {
  getMenulist: UserAction.getMenulist,
  getcart: UserAction.getcart,
  getcartV1:UserAction.getcartV1,
  getcartV2:UserAction.getcartV2,
  getMenuObject:UserAction.getMenuObject
};
export default connect(mapStateToProps, actionCreator)(CartSummary);