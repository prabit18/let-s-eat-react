import { useRouter } from "next/router";
import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";
import OtpInput from "react-otp-input";
import { connect } from "react-redux";
import restaurants from "../../pages/restaurants";
import LoginContext from "../Context/LoginContext";
import SignupContext from "../Context/SignupContext";
import { UserAction } from "../../redux/actions/user.action";
import { cartV1 } from "../../redux/reducer/cartV1.reducer";
import { menuObject } from "../../redux/reducer/menuObject.reducer";
import { dataService } from "../../services";
import MenulistContext from "../Context/MenulistContext";
import Login from "../login";
import MenuList from "../RestaurantDetail/MenuList";
import Signup from "../signup";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import EmptyCart from "../EmptyCart/EmptyCart";
import MapContext from "../Context/MapContext";
import LocationSearchInput from "./Map/AutoComplete";
import Map from "./Map/Map";
import { RadioGroup, Radio } from "react-radio-group";
import AddAddress from "./AddAddress";
import ModalPopup from "../Modal";
import UpdateAddress from "./UpdateAddress";
import CheckoutLoader from "../Loader/CheckoutLoader";
import LoadingSpinner from "../Loader";
import Geocode from "react-geocode";
import { GooleMapApiKey } from "../../config/env";
import PaymentGateway from "../PaymentGateway";
import { useElements } from "@stripe/react-stripe-js";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const Checkout = (props) => {
  const API_Key = GooleMapApiKey;
  const [isPayment, setIspayment] = useState(false);
  const [Spinner, setSpinner] = useState(false);
  const Type = useRef("");

  // const {menuObject}=props
  const { loadingContent, setloadingContent } = useContext(MapContext);
  const mapRef = useContext(MapContext);
  const [dis, setdis] = useState(false);
  const [dis1, setdis1] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [loadingState, setloadingState] = useState(false);
  const history = useRouter();
  const [restaurantdetail, setrestaurantdetail] = useState([]);
  const [deliveryOption, setdeliveryOption] = useState();
  const [menuObject, setmenuObject] = useState({});
  const [cart_item_objs_v1, setcart_item_objs_v1] = useState({});
  const [cart_item_objs_v2, setcart_item_objs_v2] = useState({});
  const [deactivatedCart, setdeactivatedCart] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const handleSuggestion = (e) => {
    setSuggestion(e.target.value);
    localStorage.setItem("suggestion", e.target.value);
  };
  const [user, setuser] = useState(false);
  const [userinfo, setuserinfo] = useState({
    email: "",
    name: "",
    phone_number: "",
    mobile_verified: false,
    last_name: "",
  });
  const [show, setShow] = useState(false);
  const [popup, setpopup] = useState(null);
  const [session, setSession] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [otp, setOtp] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [loading, setloading] = useState(false);
  const [Mobile_Number, setmobilenumber] = useState("");
  const [veri, setVeri] = useState(false);
  const [Error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [verifynow, setverifynow] = useState(false);
  const [verify, setverify] = useState(false);
  const [verified, setverified] = useState(false);
  const [phone_number, setphone_number] = useState();
  const [restDetail, setrestDetail] = useState([]);
  const [modalType, setmodalType] = useState("");
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const onOpenModal = () => setOpen(true);
  const [flate_number, setflate_number] = useState("");
  const [addressType, setaddressType] = useState("");
  const [landmark, setlandmark] = useState("");
  const [location, setlocation] = useState({ lat: "", lang: "" });
  const [error, seterror] = useState(false);
  const [editModal, seteditModal] = useState(false);
  const [editData, setEditData] = useState([]);
  const [profileData, setprofileData] = useState([]);
  const [orderId, setorderId] = useState("");
  const [StripSecrete, setStripSecrete] = useState("");
  const [savedCardList, setsavedCardList] = useState([])
  useEffect(() => {
    if (localStorage.getItem("suggestion")) {
      setSuggestion(localStorage.getItem("suggestion"));
    }
    if (JSON.parse(localStorage.getItem("user"))) {
      getCurrentLoaction()
      const User = JSON.parse(localStorage.getItem("user"));
      setSuccess(true);
      setEmail(User.info.email);
      setfirstname(User.info.first_name);
      setlastname(User.info.last_name);
      if (User.info.phone_number === "0") {
        setverify(true);
      } else {
        setverified(true);
        setphone_number(User.info.phone_number);
      }
      setuser(JSON.parse(localStorage.getItem("user")));
      let userdata = JSON.parse(localStorage.getItem("user"));
      setuserinfo({
        email: userdata.info.email,
        name: userdata.info.first_name,
        phone_number: userdata.info.phone_number,
        mobile_verified: userdata.info.mobile_verified,
        last_name: userdata.info.last_name,
      });
      dataService.cartItems().then((response) => {
        dataService
          .getIndividualRestuarant(response.data[0].rest_id)
          .then((res) => {
            if (res.error === false) {
              setrestDetail(res.data.data.data);
              if (res.data.data.data.deliverable === false) {
                setdeliveryOption("store-pickup");
                localStorage.setItem("delivery_type", "store-pickup");
              } else if (res.data.data.data.store_pickup === false) {
                setdeliveryOption("delivery");
                localStorage.setItem("delivery_type", "delivery");
              } else {
                setdeliveryOption(localStorage.getItem("delivery_type"));
              }
            }
            dataService
              .getMenuListbyRestID(response.data[0].rest_id)
              .then((resp) => {
                let responseData = resp.data.data.data;
                let Menu = { ...menuObject };
                responseData.forEach((item) => {
                  item.variants.forEach((child_item) => {
                    Menu[child_item.id] = child_item;
                    Menu[child_item.id].image_url = item.image_url;
                    Menu[child_item.id].name = item.name;
                    Menu[child_item.id].veg = item.veg;
                    Menu[child_item.id].description = item.description;
                    Menu[child_item.id].menu_id = item.id;
                    Menu[child_item.id].isVariant =
                      item.variants.length > 1 ? true : false;
                    Menu[child_item.id].status = item.status;
                    Menu[child_item.id].restaurant_id = item.restaurant_id;
                  });
                });
                setmenuObject(Menu);
                let cartV1 = { ...cart_item_objs_v1 };
                let cartV2 = { ...cart_item_objs_v2 };
                var result = [];
                response.data.length > 0 &&
                  response.data.map((value) => {
                    if (
                      Object.keys(Menu).length > 0 &&
                      Menu[value.variant_id].status === false
                    ) {
                      result.push(value);
                    }
                  });
                let cartDetails = response.data.filter(
                  (val) => !result.includes(val)
                );
                setCartItem(cartDetails);
                setdeactivatedCart(result);
                response.data.forEach((value) => {
                  if (cartV1[value.variant_id]) {
                    cartV1[value.variant_id]++;
                  } else {
                    cartV1[value.variant_id] = value.quantity;
                  }
                });
                response.data.forEach((value) => {
                  value["le_price"] = value["price"];
                  delete value["price"];
                });
                handleMainvariant(response.data);
                setcart_item_objs_v1(cartV1);
                props.getcartV1(cartV1);
                dataService
                  .ListAddress()
                  .then((result) => {
                    props.getAddressList(result.data.data.data);
                    setaddressList(result.data.data.data);
                  })
                  .catch((e) => {});
                dataService.GetProfile().then((responseData) => {
                  if (responseData) {
                    let profile=responseData.data.data.data
                    setprofileData(profile);
                    if(profile.stripe_account_id!==""){
                      dataService.SavedCards(profile.stripe_account_id).then((stripeCards)=>{
                        console.log("stripe cards",stripeCards)
                        let card=stripeCards.data.data.data.data
                        setsavedCardList(card)
                      })
                    }
                  }
                });
              });
          });
      });
      setrestaurantdetail(props.Restaurant);
    } else {
      setdeliveryOption(localStorage.getItem("delivery_type"));
      setcart_item_objs_v1(
        JSON.parse(localStorage.getItem("cart_item_objs_v1"))
      );
      setcart_item_objs_v2(
        JSON.parse(localStorage.getItem("cart_item_objs_v2"))
      );
      handleMainvariant(JSON.parse(localStorage.getItem("cartItem")));
      let restId = JSON.parse(localStorage.getItem("cartItem"))[0]
        .restaurant_id;
      dataService
        .getIndividualRestuarant(restId)
        .then((res) => {
          if (res) {
            setrestDetail(res.data.data.data);
            if (res.data.data.data.deliverable === false) {
              setdeliveryOption("store-pickup");
              localStorage.setItem("delivery_type", "store-pickup");
            } else if (res.data.data.data.store_pickup === false) {
              setdeliveryOption("delivery");
              localStorage.setItem("delivery_type", "delivery");
            } else {
              setdeliveryOption(localStorage.getItem("delivery_type"));
            }
            
            if(restId!==JSON.parse(localStorage.getItem("menuItems"))[0].restaurant_id){
              dataService.getMenuListbyRestID(restId).then((menuResponse)=>{
                
                let responseData = menuResponse.data.data.data;
                localStorage.setItem('menuItems',JSON.stringify(responseData))
                let MenuObjectData=ObjectMaker(responseData)
                setmenuObject(MenuObjectData);
            var result = [];
            let new_cart = [];
            JSON.parse(localStorage.getItem("cartItem")).map((value) => {
              if (
                Object.keys(MenuObjectData).length > 0 &&
                MenuObjectData[value.variant_id].status === false
              ) {
                result.push(value);
              } else {
                new_cart.push(value);
              }
            });

            setCartItem(new_cart);
            localStorage.setItem("cartItem", JSON.stringify(new_cart));
            setdeactivatedCart(result);
              }).catch((e)=>{
                console.log(e);
              })
            }else{
              dataService.getMenuListbyRestID(restId).then((Itemresp)=>{
              let MenuItemList=Itemresp.data.data.data
              debugger
              let Menu = ObjectMaker(MenuItemList )
              setmenuObject(Menu);
              var result = [];
              let new_cart = [];
            JSON.parse(localStorage.getItem("cartItem")).map((value) => {
              if (
                Object.keys(Menu).length > 0 &&
                Menu[value.variant_id].status === false
              ) {
                result.push(value);
              } else {
                new_cart.push(value);
              }
            });

            setCartItem(new_cart);
            localStorage.setItem("cartItem", JSON.stringify(new_cart));
            setdeactivatedCart(result);
          

            // })
          })
            
        }
      }
        
        })
        .catch((e) => {
          console.log(e);
        });
        
    }
    
  }, []);

  const ObjectMaker=(response)=>{
    let Menu = { ...menuObject };
            response.forEach((item) => {
              item.variants.forEach((child_item) => {
                Menu[child_item.id] = child_item;
                Menu[child_item.id].image_url = item.image_url;
                Menu[child_item.id].name = item.name;
                Menu[child_item.id].veg = item.veg;
                Menu[child_item.id].description = item.description;
                Menu[child_item.id].menu_id = item.id;
                Menu[child_item.id].isVariant =item.variants.length > 1 ? true : false;
                Menu[child_item.id].status = item.status;
                Menu[child_item.id].restaurant_id = item.restaurant_id;
              });
            });
            return Menu
  }

  useEffect(() => {}, [open]);

  const handleNewMenuItems=(id)=>{
    return dataService.getMenuListbyRestID(id)
  }

  const Otpverification = async () => {
    let currentAttempt = attempt + 1;
    setAttempt(currentAttempt);
    if (currentAttempt > 5) {
      setshow(true);
      setpopup("mobilenuber");
      setAttempt(0);
      handleMobileOtp();
    } else {
      const user = JSON.parse(localStorage.getItem("user"));
      let Email = user.info.email;
      dataService.verifyMobileNumber(session, otp, Email).then((res) => {
        setloading(false);
        if (res.data.data.error_status) {
          if (res.data.data.attempts != undefined) {
            setSession(res.data.data.data.session);
            setErrorMessage(res.data.data.message);
            setError(true);
            setOtp("");
            setVeri(false);
          } else {
            setShow(true);
            setOtp("");
            setpopup("otp");
            setVeri(false);
            handleMobileOtp();
          }
        } else {
          //localStorage.setItem("user", JSON.stringify(res.data.data.data));
          setverify(false);
          setverifynow(false);
          setverified(true);
          setSuccessMessage("Your Mobile number has successfully verified!");
          setVeri(false);
          window.location.reload();
        }
      });
    }
  };
  const handleResendOtp = async () => {
    dataService.ResendOtp(Email).then((response) => {
      setError(true);
      setErrorMessage(response.data.data.message);
      setSession(response.data.data.data.session);
    });
  };
  const handleMobileOtp = async () => {
    dataService.Mobileupadte(Mobile_Number).then((response) => {
      setloading(false);
      if (response.error_status) {
        setError(true);
        setErrorMessage(response.message);
      } else {
        setError(false);
        setpopup("otp");
        setSession(response.data.session);
      }
    });
  };
  const MobileNumberhandler = (type) => {
    // setErrorMessage('')
    setShow(true);
    if (type === "mobilenumber") {
      setpopup(type);
    }
    if (type === "otp") {
      if (!validatemobilenumber(Mobile_Number)) {
        setError(true);
        return;
      } else {
        setloading(true);
        setpopup(type);
        handleMobileOtp();
      }
    } else if (type === "resend") {
      handleResendOtp();
    } else if (type == "otpverification") {
      setloading(true);
      Otpverification();
    } else if (type === "change") {
      setpopup(type);
    }
  };
  const validatemobilenumber = (Mobile_Number) => {
    if (!Mobile_Number) {
      setErrorMessage("Please Put Your Mobile Number");
      return false;
    } else if (Mobile_Number.length < 10 || Mobile_Number.length > 10) {
      setErrorMessage("Please put a Valid Mobile Number");
      return false;
    }
    return true;
  };
  const takeMobileNumber = (e) => {
    setErrorMessage("");
    setmobilenumber(e.target.value);
    // setverified(false)
  };
  const handleotpchange = (otp) => {
    setOtp(otp);
    if (otp.length === 6) setVeri(true);
    else setVeri(false);
  };

  const findindex = (id) => {
    var elementPos = cartItem
      .map(function (x) {
        return x.variant_id;
      })
      .indexOf(id);
    return elementPos;
  };
  const findindexDeactivate = (id) => {
    var elementPos = deactivatedCart
      .map(function (x) {
        return x.variant_id;
      })
      .indexOf(id);
    return elementPos;
  };
  const handleMainvariant = (value) => {
    var cartV2 = { ...cart_item_objs_v2 };
    value &&
      value.map((item, i) => {
        if (
          menuObject.length > 0 &&
          cartV2[item.item_id] === undefined &&
          menuObject[item.variant_id].isVariant === true
        ) {
          cartV2[item.item_id] = parseInt(item.quantity);
        }
        // else{
        //   cartV2[item.item_id]+=parseInt(item.quantity)
        // }
      });
    props.getcartV2(cartV2);
    setcart_item_objs_v2(cartV2);
  };

  const handleIncrement = (data) => {
    if (!JSON.parse(localStorage.getItem("user"))) {
      let final = [
        {
          variant_id: data.variant_id,
          quantity: 1,
          name: data.name,
          item_id: data.id,
          restaurant_id: data.restaurant_id,
        },
      ];

      handleCartinc(final);
    } else {
      var data_body = {
        rest_id: data.rest_id || Restaurant.id,
        item_id: data.item_id,
        quantity: "1",
        variant_id: data.variant_id,
      };
      dataService.AddTocart(data_body).then((resp) => {
        if (resp.data !== null) {
          var response = resp.data;
          handleCartinc([response]);
        }
      });
    }
  };
  const handleCartinc = (cartItemvalue) => {
    var CartV1 = { ...cart_item_objs_v1 };

    if (!JSON.parse(localStorage.getItem("user"))) {
      if (CartV1[cartItemvalue[0].variant_id]) {
        CartV1[cartItemvalue[0].variant_id]++;
      }
      props.getcartV1(CartV1);
      setcart_item_objs_v1(CartV1);
      localStorage.setItem("cart_item_objs_v1", JSON.stringify(CartV1));
    } else {
      if (CartV1[cartItemvalue[0].variant_id]) {
        CartV1[cartItemvalue[0].variant_id]++;
      }
      props.getcartV1(CartV1);
      setcart_item_objs_v1(CartV1);
    }
  };

  const handleDecrement = (data) => {
    if (!JSON.parse(localStorage.getItem("user"))) {
      let final = [
        {
          variant_id: data.variant_id,
          quantity: 1,
          name: data.name,
          item_id: data.id,
          restaurant_id: data.restaurant_id,
        },
      ];
      if (cart_item_objs_v1[data.variant_id] === 1) {
        let index = findindex(data.variant_id);
        if (index > -1) {
          let originlArray = [...cartItem];
          originlArray.filter((val) => val !== originlArray[index]);
          originlArray.splice(index, 1);
          setCartItem(originlArray);
          localStorage.setItem("cartItem", JSON.stringify(originlArray));
          if (originlArray.length === 0) {
            window.location.reload();
          }
        }
      }
      handleCartRemove(final);
    } else {
      let data_body = {
        rest_id: data.rest_id || Restaurant.id,
        item_id: data.item_id,
        variant_id: data.variant_id,
        quantity: "-1",
      };

      dataService.AddTocart(data_body).then((resp) => {
        if (resp) {
          if (parseInt(cart_item_objs_v1[data.variant_id]) === 1) {
            let index = findindex(data.variant_id);
            if (index > -1) {
              let originlArray = [...cartItem];
              originlArray.filter((val) => val !== originlArray[index]);
              originlArray.splice(index, 1);
              setCartItem(originlArray);
              // localStorage.setItem('cartItem',JSON.stringify(originlArray))
              if (originlArray.length === 0) {
                window.location.reload();
              }
            }
          }
          handleCartRemove(data_body);
        }
      });
    }
  };

  const handleCartRemove = (cartItemvalue) => {
    var CartV1 = { ...cart_item_objs_v1 };
    if (!JSON.parse(localStorage.getItem("user"))) {
      if (CartV1[cartItemvalue[0].variant_id]) {
        CartV1[cartItemvalue[0].variant_id]--;
        props.getcartV1(CartV1);
        setcart_item_objs_v1(CartV1);
      }
    } else {
      if (CartV1[cartItemvalue.variant_id]) {
        CartV1[cartItemvalue.variant_id]--;
      }
      props.getcartV1(CartV1);
      setcart_item_objs_v1(CartV1);
    }
    localStorage.setItem("cart_item_objs_v1", JSON.stringify(CartV1));
  };

  //varient increment
  const handleVarientincrement = (data) => {
    let CartV1 = { ...cart_item_objs_v1 };

    if (!localStorage.getItem("user")) {
      handlecartSingleIncrement(data);
      if (CartV1[data.variant_id]) {
        CartV1[data.variant_id]++;
      }
      props.getcartV1(CartV1);
      setcart_item_objs_v1(CartV1);
      localStorage.setItem("cart_item_objs_v1", JSON.stringify(CartV1));
    } else {
      let data_body = {
        rest_id: data.rest_id || Restaurant.id,
        item_id: data.item_id,
        variant_id: data.variant_id,
        quantity: "1",
      };
      dataService.AddTocart(data_body).then((resp) => {
        if (resp) {
          handlecartSingleIncrement(resp.data);
          if (CartV1[resp.data.variant_id]) {
            CartV1[resp.data.variant_id]++;
          }
        }
        props.getcartV1(CartV1);
        setcart_item_objs_v1(CartV1);
      });
    }
  };
  const handlecartSingleIncrement = (data) => {
    let CartV2 = { ...cart_item_objs_v2 };
    if (!JSON.parse(localStorage.getItem("user"))) {
      if (CartV2[data.item_id]) {
        CartV2[data.item_id]++;
      }
      props.getcartV2(CartV2);
      setcart_item_objs_v2(CartV2);
      localStorage.setItem("cart_item_objs_v2", JSON.stringify(CartV2));
    } else {
      if (CartV2[data.item_id]) {
        CartV2[data.item_id]++;
      }
      props.getcartV2(CartV2);
      setcart_item_objs_v2(CartV2);
    }
  };

  //varient decrement
  const handleVarientDecrement = (data) => {
    if (!JSON.parse(localStorage.getItem("user"))) {
      handlecartSingleDecrement(data);
      if (cart_item_objs_v1[data.variant_id] === 1) {
        let index = findindex(data.variant_id);
        if (index > -1) {
          let originlArray = [...cartItem];
          originlArray.filter((val) => val !== originlArray[index]);
          originlArray.splice(index, 1);
          localStorage.setItem("cartItem", JSON.stringify(originlArray));
          setCartItem(originlArray);
          if (originlArray.length === 0) {
            window.location.reload();
          }
        }
      }
      let CartV1 = { ...cart_item_objs_v1 };
      if (CartV1[data.variant_id]) {
        CartV1[data.variant_id]--;
      }
      props.getcartV1(CartV1);
      setcart_item_objs_v1(CartV1);
      localStorage.setItem("cart_item_objs_v1", JSON.stringify(CartV1));
    } else {
      let data_body = {
        rest_id: data.rest_id || Restaurant.id,
        item_id: data.item_id,
        variant_id: data.variant_id,
        quantity: "-1",
      };
      dataService.AddTocart(data_body).then((resp) => {
        if (resp) {
          handlecartSingleDecrement(data);
          if (parseInt(cart_item_objs_v1[data.variant_id]) === 1) {
            let index = findindex(data.variant_id);
            if (index > -1) {
              let originlArray = [...cartItem];
              originlArray.filter((val) => val !== originlArray[index]);
              originlArray.splice(index, 1);
              localStorage.setItem("cartItem", JSON.stringify(originlArray));
              setCartItem(originlArray);
              if (originlArray.length === 0) {
                window.location.reload();
              }
            }
          }
          let CartV1 = { ...cart_item_objs_v1 };
          if (CartV1[data.variant_id]) {
            CartV1[data.variant_id]--;
          }
          props.getcartV1(CartV1);
          setcart_item_objs_v1(CartV1);
        }
      });
    }
  };

  const handlecartSingleDecrement = (data) => {
    let cartV2 = { ...cart_item_objs_v2 };

    if (!JSON.parse(localStorage.getItem("user"))) {
      if (cartV2[data.item_id]) {
        cartV2[data.item_id]--;
      }
      props.getcartV1(cartV2);
      setcart_item_objs_v2(cartV2);
      localStorage.setItem("cart_item_objs_v2", JSON.stringify(cartV2));
    } else {
      if (cartV2[data.item_id]) {
        cartV2[data.item_id]--;
      }
      props.getcartV2(cartV2);
      setcart_item_objs_v2(cartV2);
    }
  };
  const RemoveDisabledItem = (data) => {
    var Originalcart = [...deactivatedCart];
    let cartV1 = { ...cart_item_objs_v1 };
    let cartV2 = { ...cart_item_objs_v2 };
    if (JSON.parse(localStorage.getItem("user"))) {
      let index = findindexDeactivate(data.variant_id);
      Originalcart.filter((val) => val !== Originalcart[index]);
      Originalcart.splice(index, 1);
      setdeactivatedCart(Originalcart);
      // setCartItem(OriginalCartItem)
      let body = {
        rest_id: data.rest_id,
        item_id: data.item_id,
        variant_id: data.variant_id,
      };
      dataService.RemoveItemFromcart(body).then((resp) => {
        if (resp) {
          if (cartV1[data.variant_id]) {
            cartV1[data.variant_id] = 0;
          }
          if (cartV2[data.item_id]) {
            cartV2[data.item_id] = 0;
          }
          setcart_item_objs_v1(cartV1);
          setcart_item_objs_v2(cartV2);
          props.getcartV1(cartV1);
          props.getcartV2(cartV2);
        }
      });
    } else {
      let index = findindexDeactivate(data.variant_id);
      Originalcart.filter((val) => val !== Originalcart[index]);
      Originalcart.splice(index, 1);
      setdeactivatedCart(Originalcart);
      if (cartV1[data.variant_id]) {
        cartV1[data.variant_id] = 0;
      }
      if (cartV2[data.item_id]) {
        cartV2[data.item_id] = 0;
      }
      setcart_item_objs_v1(cartV1);
      setcart_item_objs_v2(cartV2);
      localStorage.setItem("cart_item_objs_v1", JSON.stringify(cartV1));
      localStorage.setItem("cart_item_objs_v2", JSON.stringify(cartV2));
    }
  };
  const handleDeliveryOption = (e) => {
    localStorage.setItem("delivery_type", e.target.name);
    setdeliveryOption(e.target.name);
  }; 
  const handleback = () => {
    window.location = localStorage.getItem("pathname");
  };
  const handleTotalPrice = () => {
    return cartItem.reduce(
      (total, item) =>
        item.le_price * cart_item_objs_v1[item.variant_id] + total,
      0
    );
  };

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);

  const getCurrentLoaction = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => successPosition(pos),
        (err) => deniedPosition(err)
      );
    } else {
      alert("Your Browser doesn't support location service !");
    }
  };
  const [address, setaddress] = useState("");
  const handleMapaddress = (val) => {
    setaddress(val);
    localStorage.setItem("address", val);
  };

  const successPosition = (position) => {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    localStorage.setItem("latlong", JSON.stringify({ lat, lng }));

    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
    Geocode.setApiKey(API_Key);

    // set response language. Defaults to english.
    Geocode.setLanguage("en");

    // set response region. Its optional.
    // A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion("es");

    // Enable or disable logs. Its optional.
    Geocode.enableDebug();

    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const formatted_address = response.results[0].formatted_address;
        localStorage.setItem("address", formatted_address);
        setaddress(formatted_address);
      },
      (error) => {
        console.error(error);
      }
    );
  };
  const deniedPosition = (error) => {
    alert(
      "You denied to location permission,\nAllow the permission from browser's settings or add you address manually."
    );
  };

  const handleAddress = (data) => {
    if (
      document.getElementById("landmark").value !== "" &&
      document.getElementById("flatnumber").value !== "" &&
      document.getElementById("add-field1").value !== ""
    ) {
      let payload = {
        address: localStorage.getItem("address"),
        flat_number: flate_number,
        type: addressType,
        landmark: landmark,
        location: {
          latitude: JSON.stringify(
            JSON.parse(localStorage.getItem("latlong")).lat
          ),
          longitude: JSON.stringify(
            JSON.parse(localStorage.getItem("latlong")).lng
          ),
        },
        default: true,
      };

      // setloadingContent(true)
      dataService.addAddress(payload).then((response) => {
        if (response.error === false) {
          setisChange(false);
          setaddressList(response.data.data.customer.address);
          setOpen(false);
          setSpinner(true);
          setTimeout(() => {
            setSpinner(false);
          }, 3000);

          // setloadingContent(false)
          // history.reload(window.location.href)
        }
      });
    } else {
      alert("please fill all fields");
    }
  };
  const handleType = (e) => {
    // e.preventDefault()
    setaddressType(e.target.name);
  };

  const handleEditModal = (item) => {
    setmodalType("Update");
    setflate_number(item.flat_number);
    setlandmark(item.landmark);
    setaddressType(item.type);
    setaddress(item.address);
    let lat = item.location["latitude"];
    let lng = item.location["longitude"];
    let address = localStorage.setItem("address", item.address);
    var latlong = { lat: lat, lng: lng };
    localStorage.setItem("latlong", JSON.stringify(latlong));

    setEditData(item);

    setOpen(true);
  };
  const handleFlatChange = (val) => {
    setflate_number(val);
  };
  const handleLandmark = (val) => {
    setlandmark(val);
  };

  const handleAddressModal = () => {
    setmodalType("Add");
    setaddressType(null);
    setflate_number(null);
    setlandmark(null);
    // getCurrentLoaction();

    setOpen(true);
  };
  const [isChange, setisChange] = useState(false);
  const [addressList, setaddressList] = useState([props.addressList]);
  const handleAddressChange = () => {
    setisChange(true);
  };

  const handleAddressUpdate = (id) => {
    if (id) {
      dataService.UpdateAddress(id).then((res) => {
        var responseData = [res.data.data.data.address];
        let respdata = responseData;
        if (responseData) {
          setaddressList(res.data.data.data.address);
          props.getAddressList(res.data.data.data.address);
          //  setaddressList(originalList)
          setisChange(false);
          setSpinner(true);
          setTimeout(() => {
            setSpinner(false);
          }, 2000);
        }
      });
    }
  };
  const handleUpdate = (item) => {
    // let flatnumber=flate_number
    // let landmark =landmark
    let lat = JSON.parse(localStorage.getItem("latlong")).lat;
    let lng = JSON.parse(localStorage.getItem("latlong")).lng;
    if (typeof lat === "string") {
      lat = parseFloat(lat.replace(/\"/g, ""));
      lng = parseFloat(lng.replace(/\"/g, ""));
    }
    let fLat = JSON.stringify();
    let payload = [
      {
        addresses: localStorage.getItem("address"),
        flat_number: flate_number,
        type: addressType,
        landmark: landmark,
        location: {
          latitude: JSON.stringify(lat),
          longitude: JSON.stringify(lng),
        },
      },
    ];

    // setloadingContent(true)
    dataService
      .UpdateAllAddress(item.id, payload)
      .then((resp) => {
        seteditModal(resp.data.data.data.address);

        // history.reload(window.location.pathname)
        // setloadingContent(false)
        setaddressList(resp.data.data.data.address);
        setOpen(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const HandleAddressList = () => {
    let addressvalue = [];
    addressList.map((val) => {
      if (val.default === true) {
        addressvalue.push(val);
      }
    });
    return addressvalue;
  };
  const handleOrderCart = () => {
    let myCart = [];
    cartItem.map((val) => {
      myCart.push({
        item_id: val.item_id,
        quantity: val.quantity,
        variant_id: val.variant_id,
      });
    });
    return myCart;
  };

  const [StripPublicKey, setStripPublicKey] = useState();
  const [paymentIntent, setpaymentIntent] = useState();
  const PlaceNewOrder = () => {
    let payload = {
      restaurant_id: cartItem[0].rest_id,
      customer_name: firstname,
      customer_address: HandleAddressList()[0].address,
      customer_mobile_number: phone_number,
      customer_flat_number: HandleAddressList()[0].flat_number,
      customer_address_type: HandleAddressList()[0].type,
      items: handleOrderCart(),
      tasty_point_discount: "",
      note: suggestion,
      order_type: deliveryOption,
    };
    dataService
      .PlaceOrder(payload)
      .then((resp) => {
        setorderId(resp.data.data.data.order_id);
        dataService
          .PaymentIntent(resp.data.data.data.order_id)
          .then((response) => {
            let key = response.data.data.data.client_secret;
            let stripkey = response.data.data.data.client_public_key;
            let intent = response.data.data.data.payment_intent_id;
            console.log("response", response);
            if (key) {
              setStripSecrete(key);
              setStripPublicKey(stripkey);
              setIspayment(true);
              setpaymentIntent(intent);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  const [paymentName, setPaymentName] = useState();
  const HandePayemnt = (val) => {
    setPaymentName(val);
  };
  const LoadingSkeleton = () => {
    return (
      <>
        <div>
          <SkeletonTheme color="#ced0d454 " highlightColor="#ffff">
            <h6>
              <Skeleton />
            </h6>
            <p>
              <Skeleton count={3} />
            </p>
          </SkeletonTheme>
        </div>
      </>
    );
  };
  return (
    <>
      {cartItem.length > 0 ? (
        <div className="page-banner">
          <section className="main-section">
            <section className="cart-section">
              <div className="container custom-container">
                <div className="cart-body">
                  <div className="row custom-row custom-scrollbar">
                    <div className="col-lg-6">
                      <div class="cart-left">
                        <a
                          class="back-to-restaurant"
                          onClick={() => handleback()}
                        ></a>
                        <h2>Order Summary </h2>
                        <div class="cart-left-content">
                          <div class="cart-details">
                            <div class="cart-details-header">
                              <h3>{restDetail.name}</h3>
                              <p>{restDetail.address}</p>
                            </div>
                            <div class="toggle-section">
                              {restDetail.deliverable ? (
                                <div
                                  class={
                                    deliveryOption === "delivery"
                                      ? "payment-item delivery-item active delivery-box"
                                      : "payment-item delivery-item delivery-box"
                                  }
                                >
                                  <input
                                    type="radio"
                                    id="test1"
                                    name="delivery"
                                    checked={
                                      deliveryOption === "delivery"
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => handleDeliveryOption(e)}
                                  />
                                  <label for="test1" class="delivery">
                                    Delivery
                                    <br />
                                    <span>30-40 Mins</span>
                                  </label>
                                  <img
                                    src={`/images/${
                                      deliveryOption !== "delivery"
                                        ? "new-delivery-icon"
                                        : "act_delivery_icon"
                                    }.svg`}
                                    alt="delivery-icon"
                                    class="black-img"
                                  />
                                  {/* <img
                                src="images/new-delivery-icon.svg"
                                alt="delivery-icon"
                                class="hide-img"
                              /> */}
                                </div>
                              ) : (
                                <div class="delivery-deactivate payment-item delivery-item delivery-box">
                                  <input
                                    type="radio"
                                    id="test1"
                                    name="delivery"
                                    onChange={(e) => handleDeliveryOption(e)}
                                  />
                                  <label for="test1" class="delivery">
                                    Delivery
                                    <br />
                                    <span>30-40 Mins</span>
                                  </label>
                                  <img
                                    src={`/images/act_delivery_icon.svg`}
                                    alt="delivery-icon"
                                    class="black-img"
                                  />
                                  {/* <img
                                src="images/new-delivery-icon.svg"
                                alt="delivery-icon"
                                class="hide-img"
                              /> */}
                                </div>
                              )}
                              {restDetail.store_pickup ? (
                                <div
                                  class={
                                    deliveryOption === "store-pickup"
                                      ? "payment-item delivery-item  store-box active"
                                      : "payment-item delivery-item delivery-box"
                                  }
                                >
                                  <input
                                    type="radio"
                                    id="test2"
                                    name="store-pickup"
                                    checked={
                                      deliveryOption === "store-pickup"
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => handleDeliveryOption(e)}
                                  />
                                  <label for="test2" class="store-pick">
                                    Store Pick up
                                    <br />
                                    <span>15-20 Mins</span>
                                  </label>
                                  <img
                                    src={`/images/${
                                      deliveryOption !== "store-pickup"
                                        ? "new-store-pickup"
                                        : "act_store_pickup"
                                    }.svg`}
                                    alt="store-icon"
                                    class="black-img"
                                  />
                                  {/* <img
                                src="images/act_store_pickup.svg"
                                alt="store-icon"
                                class="hide-img"
                              /> */}
                                </div>
                              ) : (
                                <div class="delivery-deactivate payment-item delivery-item delivery-box">
                                  <input
                                    type="radio"
                                    id="test2"
                                    name="store-pickup"
                                    checked={
                                      deliveryOption === "store-pickup"
                                        ? true
                                        : false
                                    }
                                    onChange={(e) => handleDeliveryOption(e)}
                                  />
                                  <label for="test2" class="store-pick">
                                    Store Pick up
                                    <br />
                                    <span>15-20 Mins</span>
                                  </label>
                                  <img
                                    src={`/images/act_store_pickup.svg`}
                                    alt="store-icon"
                                    class="black-img"
                                  />
                                  {/* <img
                                src="images/act_store_pickup.svg"
                                alt="store-icon"
                                class="hide-img"
                              /> */}
                                </div>
                              )}
                            </div>
                            <div class="preferred-time">
                              <p>Select preferred delivery time</p>
                              <div class="time-list-outer">
                                <div class="time-list-inner">
                                  <ul class="time-list custom-scrollbar">
                                    <li>
                                      <div class="time-item">
                                        <input
                                          type="radio"
                                          id="time1"
                                          name="time-group"
                                          checked
                                        />
                                        <label
                                          for="time1"
                                          class="time-item-label"
                                        >
                                          As soon as possible
                                        </label>
                                      </div>
                                      <div class="time-item">
                                        <input
                                          type="radio"
                                          id="time2"
                                          name="time-group"
                                        />
                                        <label
                                          for="time2"
                                          class="time-item-label"
                                        >
                                          Saturday 10:30
                                        </label>
                                      </div>
                                      <div class="time-item">
                                        <input
                                          type="radio"
                                          id="time3"
                                          name="time-group"
                                        />
                                        <label
                                          for="time3"
                                          class="time-item-label"
                                        >
                                          Saturday 11:00
                                        </label>
                                      </div>
                                      <div class="time-item">
                                        <input
                                          type="radio"
                                          id="time4"
                                          name="time-group"
                                        />
                                        <label
                                          for="time4"
                                          class="time-item-label"
                                        >
                                          Saturday 11:30
                                        </label>
                                      </div>
                                      <div class="time-item">
                                        <input
                                          type="radio"
                                          id="time5"
                                          name="time-group"
                                        />
                                        <label
                                          for="time5"
                                          class="time-item-label"
                                        >
                                          Saturday 12:00
                                        </label>
                                      </div>
                                      <div class="time-item">
                                        <input
                                          type="radio"
                                          id="time6"
                                          name="time-group"
                                        />
                                        <label
                                          for="time6"
                                          class="time-item-label"
                                        >
                                          Saturday 12:30
                                        </label>
                                      </div>
                                      <div class="time-item">
                                        <input
                                          type="radio"
                                          id="time7"
                                          name="time-group"
                                        />
                                        <label
                                          for="time7"
                                          class="time-item-label"
                                        >
                                          Saturday 01:00
                                        </label>
                                      </div>
                                      <div class="time-item">
                                        <input
                                          type="radio"
                                          id="time8"
                                          name="time-group"
                                        />
                                        <label
                                          for="time8"
                                          class="time-item-label"
                                        >
                                          Saturday 01:30
                                        </label>
                                      </div>
                                      <div class="time-item">
                                        <input
                                          type="radio"
                                          id="time9"
                                          name="time-group"
                                        />
                                        <label
                                          for="time9"
                                          class="time-item-label"
                                        >
                                          Saturday 01:00
                                        </label>
                                      </div>
                                      <div class="time-item">
                                        <input
                                          type="radio"
                                          id="time10"
                                          name="time-group"
                                        />
                                        <label
                                          for="time10"
                                          class="time-item-label"
                                        >
                                          Saturday 01:30
                                        </label>
                                      </div>
                                      <div class="time-item">
                                        <input
                                          type="radio"
                                          id="time11"
                                          name="time-group"
                                        />
                                        <label
                                          for="time11"
                                          class="time-item-label"
                                        >
                                          Saturday 01:00
                                        </label>
                                      </div>
                                      <div class="time-item">
                                        <input
                                          type="radio"
                                          id="time12"
                                          name="time-group"
                                        />
                                        <label
                                          for="time12"
                                          class="time-item-label"
                                        >
                                          Saturday 01:30
                                        </label>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div class="selected-items">
                              <div class="select-item">
                                {cartItem.length > 0 ? (
                                  cartItem.map((item, i) => (
                                    <div class="select-item-inner">
                                      <div
                                        className={
                                          item.veg === true
                                            ? "selected-item-left veg"
                                            : "selected-item-left non-veg"
                                        }
                                      >
                                        <h4>
                                          {item.name}-
                                          {item.variant_id.split("#")[1]}
                                        </h4>
                                        <p>£{item.le_price}</p>
                                      </div>
                                      <div class="selected-item-right">
                                        {item.isVariant === false ? (
                                          <>
                                            <div class="new-counter quantity-block">
                                              <div class="new-up">
                                                <button
                                                  class="quantity-arrow-minus quantity"
                                                  onClick={() =>
                                                    handleDecrement(item)
                                                  }
                                                >
                                                  -
                                                </button>
                                              </div>
                                              <label class="label-input">
                                                <input
                                                  class="quantity-num form-control quantity qty"
                                                  type="text"
                                                  value={
                                                    cart_item_objs_v1[
                                                      item.variant_id
                                                    ]
                                                  }
                                                />
                                              </label>
                                              <div class="new-down">
                                                <button
                                                  class="quantity-arrow-plus quantity"
                                                  onClick={() =>
                                                    handleIncrement(item)
                                                  }
                                                >
                                                  +
                                                </button>
                                              </div>
                                            </div>
                                            <h4>
                                              £
                                              {item.le_price *
                                                cart_item_objs_v1[
                                                  item.variant_id
                                                ]}
                                            </h4>
                                          </>
                                        ) : (
                                          <>
                                            <div class="new-counter quantity-block">
                                              <div class="new-up">
                                                <button
                                                  class="quantity-arrow-minus quantity"
                                                  onClick={() =>
                                                    handleVarientDecrement(item)
                                                  }
                                                >
                                                  -
                                                </button>
                                              </div>
                                              <label class="label-input">
                                                <input
                                                  class="quantity-num form-control quantity qty"
                                                  type="text"
                                                  value={
                                                    cart_item_objs_v1[
                                                      item.variant_id
                                                    ]
                                                  }
                                                />
                                              </label>
                                              <div class="new-down">
                                                <button
                                                  class="quantity-arrow-plus quantity"
                                                  onClick={() =>
                                                    handleVarientincrement(item)
                                                  }
                                                >
                                                  +
                                                </button>
                                              </div>
                                            </div>
                                            <h4>
                                              £
                                              {item.le_price *
                                                cart_item_objs_v1[
                                                  item.variant_id
                                                ]}
                                            </h4>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <>
                                    {deactivatedCart.length === 0 && (
                                      <div class="empty-cart-summery">
                                        <img
                                          src="/images/empty-bg.svg"
                                          alt="empty-cart"
                                        />
                                        <p>your cart is currently empty</p>
                                        <div className="proceed-button">
                                          <a
                                            href="#"
                                            data-toggle="modal"
                                            data-target="#loginModal"
                                            onClick={handleback}
                                          >
                                            Go Back to Restaurant
                                          </a>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                              <>
                                {deactivatedCart.length > 0 &&
                                  deactivatedCart.map((val) => (
                                    <div class="select-item">
                                      <div class="not-available-text">
                                        <p>Below Item not available</p>
                                        <a
                                          onClick={() =>
                                            RemoveDisabledItem(val)
                                          }
                                          style={{ cursor: "pointer" }}
                                        >
                                          Remove
                                        </a>
                                      </div>
                                      <div class="select-item-inner not-available">
                                        <div
                                          className={
                                            val.veg === true
                                              ? "selected-item-left veg"
                                              : "selected-item-left"
                                          }
                                        >
                                          <h4>
                                            {val.name}-
                                            {val.variant_id.split("#")[1]}
                                          </h4>
                                          <p>£{val.le_price}</p>
                                        </div>
                                        <div class="selected-item-right">
                                          <div class="new-counter quantity-block">
                                            <div class="new-up">
                                              <button class="quantity-arrow-minus quantity">
                                                -
                                              </button>
                                            </div>
                                            <label class="label-input">
                                              <input
                                                class="quantity-num form-control quantity qty"
                                                type="text"
                                                value={
                                                  cart_item_objs_v1[
                                                    val.variant_id
                                                  ]
                                                }
                                              />
                                            </label>
                                            <div class="new-down">
                                              <button class="quantity-arrow-plus quantity">
                                                +
                                              </button>
                                            </div>
                                          </div>
                                          <h4>
                                            £
                                            {val.le_price *
                                              cart_item_objs_v1[val.variant_id]}
                                          </h4>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </>
                            </div>
                          </div>
                          <div class="apply-offers">
                            <div class="apply-offer-header">
                              <img src="images/offers.svg" alt="Offers" />
                              <h3>APPLY offer</h3>
                            </div>
                            <form>
                              <div class="form-group">
                                <label for="apply-code"></label>
                                <input
                                  type="text"
                                  id="apply-code"
                                  class="form-control"
                                  placeholder="Enter coupon code if you have"
                                />
                                <button
                                  type="button"
                                  class="form-control"
                                  disabled
                                >
                                  Apply
                                </button>
                              </div>
                            </form>
                            <div class="pricing">
                              <h4>
                                Subtotal <span>£{handleTotalPrice()}</span>
                              </h4>
                              <p>
                                Taxes and other Charges <span>0.40</span>
                              </p>
                              <p>
                                delivery charges <span>0.40</span>
                              </p>
                              <p>
                                Offers/Coupons Discount <span>0.00</span>
                              </p>
                              <h3>
                                Grand Total <span>£{handleTotalPrice()}</span>
                              </h3>
                            </div>
                            <div class="suggestion">
                              <h4>Suggestions</h4>
                              <form>
                                <div class="form-group">
                                  <label for="exampleFormControlTextarea1"></label>
                                  <textarea
                                    class="form-control"
                                    id="exampleFormControlTextarea1"
                                    value={suggestion}
                                    onChange={(e) => handleSuggestion(e)}
                                    placeholder="Any Suggestions?"
                                  ></textarea>
                                </div>
                              </form>
                            </div>
                          </div>
                          <div class="disclaimer-section">
                            <div class="disclaimer-content">
                              <img src="images/Icon-info.svg" alt="Info_Icon" />
                              <div class="disclaimer-text">
                                <p>
                                  <span class="text-bold">
                                    Loremipsum dolor sit amet, consetet
                                  </span>
                                  <br />
                                  Lorem ipsum dolor sit amet, consetetur
                                  sadipscing elitr, sediam noneirteminv iduntut
                                  labore et dolore magna aliquyam erat.
                                </p>
                                <p class="text-red">
                                  consetetur sadipscing elitr, sed diam noneir
                                  teminviduntutlabore
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="checkout-header">
                        <h2>Checkout</h2>
                      </div>
                      {/* <EditModal item={editData}/> */}
                      <div class="cart-details personal-cart-detail">
                        <div class="delivery-address post-login-address">
                          {user ? (
                            <div className="cart-details personal-cart-detail">
                              <div className="delivery-address">
                                <div className="address-header">
                                  <div className="address-left personal-detail">
                                    <img
                                      src="images/Group 6593.svg"
                                      alt="Address_Icon"
                                    />
                                    <div className="address-text">
                                      <h2>Personal Details</h2>
                                      <h3>
                                        {firstname} {lastname}
                                      </h3>
                                      {success && (
                                        <p>
                                          Email Address:<span> {email}</span>
                                        </p>
                                      )}
                                      <div className="verify-no">
                                        {profileData.phone_number !== "" && (
                                          <p className="verified-no">
                                            Phone Number:
                                            <span>
                                              {" "}
                                              +{profileData.phone_number}
                                            </span>
                                          </p>
                                        )}
                                        {profileData.mobile_verified && (
                                          <p className="verified-content">
                                            Verified
                                          </p>
                                        )}
                                        {profileData.phone_number !== "" &&
                                          profileData.mobile_verified ===
                                            false && (
                                            <div className="add-button verify-now">
                                              <a
                                                href="#"
                                                data-toggle="modal"
                                                data-target="#emailOtpModal"
                                                onClick={() =>
                                                  MobileNumberhandler("otp")
                                                }
                                              >
                                                Verify Now
                                              </a>
                                            </div>
                                          )}
                                      </div>
                                      <div className="not-verified">
                                        {profileData.phone_number !== "" &&
                                          profileData.mobile_verified ===
                                            false && (
                                            <p>
                                              your Phone Number is not verified
                                            </p>
                                          )}
                                      </div>
                                      {profileData.mobile_verified ===
                                        false && (
                                        <div className="verify-btn">
                                          <a
                                            href="#"
                                            data-toggle="modal"
                                            data-target="#phoneModal"
                                            onClick={() =>
                                              MobileNumberhandler(
                                                "mobilenumber"
                                              )
                                            }
                                          >
                                            {profileData.phone_number === ""
                                              ? "Add "
                                              : "Verify "}
                                            Phone Number
                                          </a>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div class="address-left personal-detail">
                              <img
                                src="images/Group 6593.svg"
                                alt="Address_Icon"
                                class="address-icon"
                              />
                              <div class="address-text">
                                <h2>Account</h2>
                                <p>
                                  Log in to your existing account or sign up.
                                </p>
                                <div class="authorization-btn">
                                  <button
                                    type="button"
                                    class="login-botton"
                                    data-toggle="modal"
                                    data-target="#loginModal"
                                    onClick={() => setdis(!dis)}
                                  >
                                    Log in
                                  </button>
                                  <LoginContext.Provider
                                    value={{ dis, setdis }}
                                  >
                                    {dis && <Login />}
                                  </LoginContext.Provider>
                                  <button
                                    type="button"
                                    class="signup-botton"
                                    data-toggle="modal"
                                    data-target="#signupModal"
                                    onClick={() => setdis1(!dis1)}
                                  >
                                    Sign up
                                  </button>
                                  <SignupContext.Provider
                                    value={{ dis1, setdis1 }}
                                  >
                                    {dis1 && <Signup />}
                                  </SignupContext.Provider>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {deliveryOption === "delivery" && (
                        <div class="apply-offers personal-offer-detail">
                          <div
                            className={
                              profileData.mobile_verified
                                ? "delivery-address"
                                : "delivery-address deactivate-tab"
                            }
                          >
                            <div class="address-header delivery-address-head">
                              <div class="address-left">
                                <img
                                  src="images/address_icon.svg"
                                  alt="Address_Icon"
                                />
                                <div class="address-text">
                                  <h2>Delivery Address</h2>
                                  <p>Set your delivery address or add new</p>
                                </div>
                              </div>
                              {profileData.mobile_verified && isChange === false
                                ? addressList !== null &&
                                  addressList.length > 0 && (
                                    <div
                                      class="add-button change-btn"
                                      style={{ display: "block" }}
                                    >
                                      <a
                                        href="#"
                                        data-toggle="modal"
                                        data-target="#addAddress"
                                        onClick={() => handleAddressChange()}
                                      >
                                        Change
                                      </a>
                                    </div>
                                  )
                                : ""}
                            </div>
                            <>
                              {Spinner === false ? (
                                <>
                                  {profileData.mobile_verified &&
                                    isChange === false && (
                                      <div class="address-outer custom-scrollbar">
                                        {addressList !== null &&
                                          addressList.map((address, i) => (
                                            <>
                                              {address.default && (
                                                <div class="address-item add-new-item">
                                                  <div
                                                    class="address-element"
                                                    style={{
                                                      display: "block",
                                                      display: "flex",
                                                      justifyContent:
                                                        "space-between",
                                                      alignItems: "center",
                                                      border: "none",
                                                    }}
                                                  >
                                                    <div>
                                                      <h6>{address.type}</h6>
                                                      <p>
                                                        {address.flat_number},
                                                      </p>
                                                      <p>{address.address}</p>
                                                      <p> {address.landmark}</p>
                                                    </div>
                                                    <img
                                                      alt="success-check"
                                                      src="images/success-checkmark-circle.svg"
                                                    />
                                                  </div>
                                                </div>
                                              )}
                                            </>
                                          ))}
                                      </div>
                                    )}
                                </>
                              ) : (
                                <LoadingSkeleton />
                              )}
                            </>

                            {isChange && (
                              <div class="address-outer custom-scrollbar">
                                <div class="address-item add-new-item">
                                  {isChange &&
                                    addressList !== null &&
                                    addressList.map((alladress, i) => (
                                      <div
                                        class="address-element"
                                        style={{ display: "block" }}
                                        key={i}
                                      >
                                        <div class="">
                                          <h6>{alladress.type}</h6>
                                          <p>{alladress.flat_number}</p>
                                          <p>{alladress.address}</p>
                                          <p>{alladress.landmark}</p>
                                        </div>
                                        <div class="address-actions">
                                          <a
                                            href="#"
                                            class="deliver-here"
                                            onClick={() =>
                                              handleAddressUpdate(alladress.id)
                                            }
                                          >
                                            Deliver Here
                                          </a>
                                          <a
                                            href="#"
                                            data-toggle="modal"
                                            data-target="#editAddress"
                                            class="edit"
                                            onClick={() =>
                                              handleEditModal(alladress)
                                            }
                                          >
                                            Edit
                                          </a>
                                        </div>
                                      </div>
                                    ))}

                                  {addressList.length > 0 &&
                                  isChange === true ? (
                                    <div class="add-new-address-box">
                                      <button
                                        type="button"
                                        data-toggle="modal"
                                        data-target="#addAddress"
                                        onClick={handleAddressModal}
                                      >
                                        + Add New Address
                                      </button>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            )}
                            {profileData.mobile_verified === true &&
                            addressList.length === 0 &&
                            isChange === false ? (
                              <div class="add-new-address-box">
                                <button
                                  type="button"
                                  data-toggle="modal"
                                  data-target="#addAddress"
                                  onClick={handleAddressModal}
                                >
                                  + Add New Address
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      )}
                      <div
                        className={
                          profileData.mobile_verified && addressList.length > 0
                            ? "disclaimer-section personal-desclaimer-detail"
                            : "disclaimer-section personal-desclaimer-detail deactivate-tab"
                        }
                      >
                        <div class="payment">
                          <div class="address-header">
                            <div class="address-left">
                              <img
                                src="images/payment_icon.svg"
                                alt="Payment_Icon"
                              />
                              <div class="address-text">
                                <h2>Payment</h2>
                                <p>
                                  You can select a payment method from your
                                  listed options
                                </p>
                              </div>
                            </div>
                          </div>
                          {profileData.mobile_verified &&
                            addressList.length > 0 && (
                              <div className="payment-options">
                                <div class="payment-item">
                                  <div class="payment-select">
                                    <img
                                      src="images/cc_icon.svg"
                                      alt="Card_Payment"
                                    />
                                    <input
                                      type="radio"
                                      id="payment1"
                                      name="PayOnline"
                                      onChange={(e) =>
                                        HandePayemnt(e.target.name)
                                      }
                                      checked={
                                        paymentName === "PayOnline"
                                          ? true
                                          : false
                                      }
                                    />
                                    <label for="payment1">
                                      Pay with Debit or Credit Card
                                    </label>
                                  </div>
                                </div>
                                <div class="payment-item">
                                  <div class="payment-select">
                                    <img
                                      src="images/cash_icon.svg"
                                      alt="Cash_on_delivery"
                                    />
                                    <input
                                      type="radio"
                                      id="payment4"
                                      name="cod"
                                      onChange={(e) =>
                                        HandePayemnt(e.target.name)
                                      }
                                      checked={
                                        paymentName === "cod" ? true : false
                                      }
                                    />
                                    <label for="payment4">
                                      Cash on Delivery
                                    </label>
                                  </div>
                                </div>
                                {isPayment && (
                <PaymentGateway
                  StripPublicKey={StripPublicKey}
                  orderId={orderId}
                  StripSecrete={StripSecrete}
                  paymentIntent={paymentIntent}
                  cards={savedCardList}
                />
              )}
                              </div>
                            )}
                          <div
                            class="proceed-button"
                            onClick={() => PlaceNewOrder()}
                          >
                            {paymentName === "cod" && (
                              <a href="javascript:void(0)">Place your Order</a>
                            )}
                            {paymentName === "PayOnline" && (
                              <a href="javascript:void(0)">
                                Confirm to pay £ {handleTotalPrice()}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </section>
          </section>
          <ModalPopup open={open} onCloseModal={onCloseModal}>
        {modalType === "Add" ? (
          <AddAddress
            addressType={addressType}
            handleAddress={handleAddress}
            handleFlatChange={handleFlatChange}
            handleType={handleType}
            lat={lat}
            lng={lng}
            flatnumber={flate_number}
            landmark={landmark}
            handleLandmark={handleLandmark}
            currentLocation={getCurrentLoaction}
            address={address}
            handleMapaddress={handleMapaddress}
          />
        ) : (
          <UpdateAddress
            handleAddressUpdate={handleUpdate}
            item={editData}
            editModal={modalType}
            handleType={handleType}
            addressType={addressType}
            flatnumber={flate_number}
            landmark={landmark}
            handleLandmark={handleLandmark}
            handleFlatChange={handleFlatChange}
            currentLocation={getCurrentLoaction}
            handleMapaddress={handleMapaddress}
            address={address}
          />
        )}
      </ModalPopup>
        </div>

      ) : (
        <CheckoutLoader />
      )}
      <div
        className={[
          "modal fade login-modal phone-modal",
          show && (popup === "mobilenumber" || popup === "change")
            ? "show display-popup"
            : "",
        ].join(" ")}
        id="phoneModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="phoneModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" id="phoneModalLabel">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img
                src="images/close.svg"
                alt="close-icon"
                onClick={() => setShow(false)}
              />
            </button>
            <div className="modal-header"></div>
            <div className="modal-body">
              <h2>Enter Your Phone Number</h2>
              <form autoComplete="off">
                <div className="form-group mobile-no-field">
                  <input
                    type="text"
                    id="mob-email"
                    name="mob-email"
                    className="form-control"
                    placeholder="Mobile Number"
                    onChange={(e) => takeMobileNumber(e)}
                  />
                  <label for="mob-email" className="input-label"></label>
                </div>
                {Error && (
                  <>
                    <p className="error">{ErrorMessage}</p>
                  </>
                )}
                <div className="form-group">
                  {/* {!activatebutton?
                            (<button type ="button"className="form-control login-buttons" id="otp-fade-btn" value="Send OTP" data-toggle="modal" data-target={activatebutton?"#mobileOtpModal":""} data-dismiss="modal" aria-label="Close" >Send OTP</button>)
                            : */}
                  <button
                    type="button"
                    className="form-control login-buttons"
                    value="Send OTP"
                    data-toggle="modal"
                    data-target="#mobileOtpModal"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => MobileNumberhandler("otp")}
                    disabled={loading}
                  >
                    Send OTP
                    {loading && (
                      <span
                        className="spinner-border custom-spinner "
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className={[
          "modal fade login-modal",
          show && popup === "otp" ? "show display-popup" : "",
        ].join(" ")}
        id="mobileOtpModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="mobileOtpModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" id="mobileOtpModalLabel">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <img
                src="../../images/close.svg"
                alt="close-icon"
                onClick={() => setShow(false)}
              />
            </button>
            <div className="modal-header">
              <h2>Enter OTP</h2>
            </div>
            <div className="modal-body">
              <div className="mobile-otp">
                <p>
                  6 digit OTP has been sent to your Mobile Number,
                  {Mobile_Number}, please enter to Log in{" "}
                  <span>OTP valid for 10 minutes.</span>
                </p>
                <a
                  href="#"
                  data-toggle="modal"
                  data-target="#loginModal"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => MobileNumberhandler("change")}
                >
                  Change Mobile Number
                </a>
              </div>
              {Error && (
                <>
                  <p className="error">{ErrorMessage}</p>
                </>
              )}
              <OtpInput
                className="otp-input"
                value={otp}
                onChange={handleotpchange}
                numInputs={6}
                clearInputs={true}
                separator={<span> </span>}
              />
              <form autoComplete="off">
                <div className="form-group">
                  {!veri ? (
                    <button
                      type="reset"
                      className="form-control login-buttons"
                      id="otp-fade-btn"
                      value="check OTP"
                      data-toggle="modal"
                      data-target="#successModal"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      Verify OTP
                    </button>
                  ) : (
                    <button
                      type="reset"
                      className="form-control login-buttons"
                      value="check OTP"
                      data-toggle="modal"
                      data-target="#successModal"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => MobileNumberhandler("otpverification")}
                      disabled={loading}
                    >
                      Verify OTP
                      {loading && (
                        <span
                          className="spinner-border custom-spinner "
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                    </button>
                  )}
                </div>
              </form>
              <div className="remain-timer">
                <h2 id="timer"></h2>
                <div className="resend-otp">
                  <p>
                    Did not receive?{" "}
                    <a href="#" onClick={() => MobileNumberhandler("resend")}>
                      Resend
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
    
  );
};
const mapStateToProps = (state) => {
  const { Menulist, Restaurant, menuObject, cartV1, cartV2, addressList } =
    state;
  return { Menulist, Restaurant, menuObject, Menulist, addressList };
};
const actionCreator = {
  getMenulist: UserAction.getMenulist,
  getcart: UserAction.getcart,
  getcartV1: UserAction.getcartV1,
  getcartV2: UserAction.getcartV2,
  getMenuObject: UserAction.getMenuObject,
  getAddressList: UserAction.addressList,
};
export default connect(mapStateToProps, actionCreator)(Checkout);
