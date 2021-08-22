import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Checkout from "../../components/checkout";
import MapContext from "../../components/Context/MapContext";
import EmptyCart from "../../components/EmptyCart/EmptyCart";
import CheckoutLoader from "../../components/Loader/CheckoutLoader";
import Metadata from "../../components/Metadata";
import { UserAction } from "../../redux/actions/user.action";
import { dataService } from "../../services";
const Checkoutpage = (props) => {
  console.log("listcheckout", props.cartV1);
  const metacontent = {
    title: "Checkout | Let's Eat",
    description: "Letseat Checkout",
  };
  const [loadingContent, setloadingContent] = useState(false);
  const [cartItem, setcartItem] = useState([]);

  useEffect(() => {
    
    if (JSON.parse(localStorage.getItem("user"))) {
      setloadingContent(true);
      dataService.cartItems().then((res) => {
        if (res.data) {
          setloadingContent(false);
          setcartItem(res.data);
        }
      });
    } else {
      setloadingContent(true);
      setcartItem(JSON.parse(localStorage.getItem("cartItem")));
      setloadingContent(false);
    }
  }, []);
  return (
    <>
      <Metadata metacontent={metacontent} />
      <MapContext.Provider value={{ loadingContent, setloadingContent }}>
        <>
          {!loadingContent ? (
            <>
              {cartItem !== null && cartItem.length !== 0 ? (
                <Checkout cartItem={cartItem} />
              ) : (
                <EmptyCart />
              )}
            </>
          ) : (
            <CheckoutLoader />
          )}
        </>
      </MapContext.Provider>
    </>
  );
};
const mapStateToProps = (state) => {
  const { Menulist, Restaurant, cartV1 } = state;
  return { Menulist, Restaurant, cartV1 };
};
const actionCreator = {
  getMenulist: UserAction.getMenulist,
  getRestaurant: UserAction.getRestaurant,
};

export default connect(mapStateToProps, actionCreator)(Checkoutpage);
