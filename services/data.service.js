import axios from "axios";
import { useState } from "react";
import { apiURL } from "../config/env";
import { authHeader } from "../redux/helper/authHeader";

export const dataService = {
    getCuisines,
    getCuisineslist,
    getRestaurants,
    getCuratedList,
    getMenuList,
    getRestaurant,
    getSignup,
    verifyOtp,
    getLogin,
    ResendOtp,
    socialLogin,
    Mobileupadte,
    verifyMobileNumber,
    getRestaurantsInfinite,
    AddFavouriteRestaurant,
    RemoveFavouriteRestaurant,
    FavouriteList,
    AddTocart,
    RemoveItemFromcart,
    cartItems,
    bulkUpdate,
    clearCart,
    getProfile,
    UpdateProfile,
    getMenuListbyRestID,
    getIndividualRestuarant,
    addAddress,
    ListAddress,
    UpdateAddress,
    UpdateAllAddress,
    PlaceOrder,
    GetProfile,
    PaymentIntent
}

const handlecart=()=>{
    
        // if(JSON.parse(localStorage.getItem('cartItem'))!==null){
            let localCart=JSON.parse(localStorage.getItem('cartItem'));
            let cartV1=JSON.parse(localStorage.getItem('cart_item_objs_v1'))
            var resultdata=[];
            localCart.map((value)=>{
              resultdata.push({
                "rest_id": value.restaurant_id,
                "item_id": value.item_id,
                "quantity": String(cartV1[value.variant_id]),
                "variant_id":value.variant_id
              })
            })
            return resultdata
             
          
    
}

async function getCuisines() {
    try {
        const data = await axios.post( apiURL+'cuisines/featured/list', {});
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}

async function getRestaurants(type) {
    console.log("type is",type);
    try {
        var body={};
        if(type===undefined)
        {
            body={};
        }
        else if(typeof type === 'object'){
        body=type;
        }
    //    debugger
        const data = await axios.post( apiURL+'restaurants/web/list', body);
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}

async function getRestaurantsInfinite(type) {
  var body = {};
  console.log(typeof type);
  try {
    if (typeof type === "number") {
      body = {
        pagination: {
          page_size: 10,
          page: parseInt(type),
        },
      };
    }

    const data = await axios.post(apiURL + "restaurants/web/list", body);
    return data.data;
  } catch (e) {
    return { error: true, message: e };
  }
}

async function getCuratedList(type) {
    try {
        const data = await axios.post(apiURL+'restaurants/web/list_by_curated_list', {});
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}
async function getCuisineslist() {
    try {
        const data = await axios.post(apiURL+'cuisines/list', {});
        console.log("new data",data)
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}
async function getMenuList(type) {
  if (typeof type === "string") {
    var body = { url: type };
    try {
      if (typeof type === "string" || undefined) {
        const data = await axios.post(
          apiURL + "menu-items/restaurant/menu",
          body
        );
        return { error: false, data: data };
      } else {
        //debugger
        console.log("cart details", type);
        var menulist = type;
        menulist["error"] = false;
        console.log("body", menulist);
        return { error: false, data: menulist };
      }
    } catch (e) {
      return { error: true, message: e };
    }
  }
}

async function getMenuListbyRestID(id) {
  if (id) {
    var body = {
      restaurant_id: id,
    };
    try {
      if (id) {
        const data = await axios.post(
          apiURL + "menu-items/restaurant/list",
          body
        );
        return { error: false, data: data };
      } else {
        //debugger
        console.log("cart details", type);
        var menulist = type;
        menulist["error"] = false;
        console.log("body", menulist);
        return { error: false, data: menulist };
      }
    } catch (e) {
      return { error: true, message: e };
    }
  }
}
async function getRestaurant(type) {
  //console.log('s',type);

  var body = { url: type };
  try {
    const data = await axios.post(apiURL + "restaurants/web/view", body);
    return { error: false, data: data };
  } catch (e) {
    return { error: true, message: e };
  }
}
async function getIndividualRestuarant(id) {
  //console.log('s',type);

  var body = { id: id };
  try {
    const data = await axios.post(apiURL + "restaurants/web/get", body);
    return { error: false, data: data };
  } catch (e) {
    return { error: true, message: e };
  }
}
async function getSignup(Email, first_name, last_name) {
  var body = {
    email: Email,
    first_name: first_name,
    last_name: last_name,
  };
  try {
    const data = await axios.post(apiURL + "customer/sign-up", body);
    return { error: false, data: data };
  } catch (e) {
    return { error: true, message: e };
  }
}
async function verifyOtp(sessiontoken,otp,username) {

      
     var body={ 
               "otp":otp,   
               "session":sessiontoken,
               "username":username,
             }
     try {
         const data = await axios.post( apiURL+'customer/verify-otp',body);
         console.log("data---->",data)
         return {error: false, data: data}
        
     } catch (e) {
         return {error: true, message: e}
     }
 }

 async function ResendOtp(username) {
    var body={ 
              "username":username,
            }
  

  try {
    const data = await axios.post(apiURL + "customer/verify-otp", body);
    console.log("data---->", data);
    if (data) {
      return { error: false, data: data };
    }
  } catch (e) {
    return { error: true, message: e };
  }
}
 
// async function ResendOtp(username) {
//   var body = {
//     username: username,
//   };
//   try {
//     const data = await axios.post(apiURL + "customer/resend-otp", body);
//     return { error: false, data: data };
//   } catch (e) {
//     return { error: true, message: e };
//   }
// }
async function getLogin(Email) {
  console.log(Email);
  var body = {
    username: Email,
  };
  try {
    const data = await axios.post(apiURL + "customer/sign-in", body);
    console.log("Data--->>", data);
    return data.data;
  } catch (e) {
    return { error: true, message: e };
  }
}
async function socialLogin(body) {
  try {
    const data = await axios.post(apiURL + "customer/social-login", body);
    if (data) {
      localStorage.setItem("user", JSON.stringify(data.data.data));

      if (JSON.parse(localStorage.getItem("cartItem")) !== null) {
        let payload = handlecart();
        bulkUpdate(payload).then((response) => {
          if (response.data) {
            console.log("success", response.data);
            // return {error: false, data: response.data}
            // return data.data
          }
          return data.data;
        });
      } else {
        return { error: false, data: data };
      }
    }
  } catch (e) {
    return { error: true, message: e };
  }
}
async function Mobileupadte(Mobile_Number) {
  console.log(Mobile_Number);
  var body = {
    phone_number: "+91" + Mobile_Number,
  };
  let user = JSON.parse(localStorage.getItem("user"));
  console.log("token is", user.token);
  let authorization = "Bearer " + user.token.id_token;
  let headers = {
    "Content-Type": "application/json",
    Authorization: authorization,
  };
  console.log(headers);
  try {
    const data = await axios.post(
      apiURL + "customer/phone-number/update",
      body,
      { headers: headers }
    );
    console.log("Data comes from mobile update --->>", data);
    return data.data;
  } catch (e) {
    return { error: true, message: e };
  }
}
async function verifyMobileNumber(sessiontoken, otp, username) {
  var body = {
    otp: otp,
    session: sessiontoken,
    username: username,
  };
  try {
    const data = await axios.post(
      apiURL + "customer/phone-number/verify",
      body,
      { headers: authHeader() }
    );
    console.log("data----", data);
    return { error: false, data: data };
  } catch (e) {
    return { error: true, message: e };
  }
}
//get profile
async function GetProfile() {
  try {
    const data = await axios.post(
      apiURL + "customer/profile/get",
      {},
      { headers: authHeader() }
    );
    console.log("data----", data);
    return { error: false, data: data };
  } catch (e) {
    return { error: true, message: e };
  }
}

//verify phone

async function AddFavouriteRestaurant(RestaurantID) {
    var body={ 
            "restaurant_id":RestaurantID,
            }
            let user=JSON.parse(localStorage.getItem('user'))
       let authorization="Bearer " +user.token.id_token
    let headers = {
        "Content-Type": "application/json",
        "Authorization": authorization,
    }
    try {
        const data = await axios.post( apiURL+'customer/favourite/create',body,{headers:headers});
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}
async function RemoveFavouriteRestaurant(RestaurantID) {
      var body={ 
        "restaurant_id":RestaurantID,
        }
       let user=JSON.parse(localStorage.getItem('user'))
       let authorization="Bearer " +user.token.id_token
    let headers = {
        "Content-Type": "application/json",
        "Authorization": authorization,
    }
    try {
        const data = await axios.post( apiURL+'customer/favourite/remove',body,{headers:headers});
        return {error: false, data: data}
    } catch (e) {
        return {error: true, message: e}
    }
}
async function FavouriteList() {
  var body = {};
  let user = JSON.parse(localStorage.getItem("user"));
  let authorization = "Bearer " + user.token.id_token;
  let headers = {
    "Content-Type": "application/json",
    Authorization: authorization,
  };
  try {
      const data = await axios.post( apiURL+'customer/favourite/list',body,{headers:headers});
      console.log("data is coming",data)
      return {error: false, data: data}
  } catch (e) {
    return { error: true, message: e };
  }
}

//cart

async function AddTocart(body) {
  var payload = JSON.stringify(body);
  try {
    const data = await axios.post(apiURL + "carts/create", payload, {
      headers: authHeader(),
    });
    return { error: false, data: data.data.data };
  } catch (e) {
    return { error: true, message: e };
  }
}
//cart item remove
async function RemoveItemFromcart(body) {
  var payload = JSON.stringify(body);
  try {
    const data = await axios.post(apiURL + "carts/remove", payload, {
      headers: authHeader(),
    });
    return { error: false, data: data.data.data };
  } catch (e) {
    return { error: true, message: e };
  }
}

//checkout
async function cartItems() {
  try {
    var data = await axios.post(
      apiURL + "carts/list",
      {},
      { headers: authHeader() }
    );
    return { error: false, data: data.data.data.data };
  } catch (e) {
    console.log(e);
    return { error: true, message: e };
  }
}

async function bulkUpdate(body) {
  try {
    let data = await axios.post(apiURL + "carts/bulk-create", body, {
      headers: authHeader(),
    });

    console.log("data", data);
    if (data) {
      localStorage.setItem("cartItem", JSON.stringify([]));
      localStorage.setItem("cart_item_objs_v1", JSON.stringify({}));
      localStorage.setItem("cart_item_objs_v2", JSON.stringify({}));
      return { error: false, data: data.data };
    }
  } catch (e) {
    console.log(e);
    return { error: true, message: e };
  }
}
async function clearCart() {
  try {
    var data = await axios.post(
      apiURL + "carts/remove-all",
      {},
      { headers: authHeader() }
    );
    return { error: false, data: data.data.data };
  } catch (e) {
    console.log(e);
    return { error: true, message: e };
  }
}
async function getProfile() {
    var body={}
//      let user=JSON.parse(localStorage.getItem('user'))
//      let authorization="Bearer " +user.token.id_token
//   let headers = {
//       "Content-Type": "application/json",
//       "Authorization": authorization,
//   }
  try {
      const data = await axios.post( apiURL+'customer/profile/get',body,{headers:authHeader()});
      console.log("data is coming",data)
      return {error: false, data: data}
  } catch (e) {
      return {error: true, message: e}
  }
}

async function addAddress(body) {
  let payload = JSON.stringify(body);
  try {
    var data = await axios.post(apiURL + "customer/address/create", payload, {
      headers: authHeader(),
    });
    console.log("data", data);
    return { error: false, data: data };
  } catch (e) {
    console.log(e);
    return { error: true, message: e };
  }
}
async function UpdateProfile(FirstName,LastName) {
    var body={
        "first_name":FirstName,
        "last_name":LastName
    }
     let user=JSON.parse(localStorage.getItem('user'))
     let authorization="Bearer " +user.token.id_token
  let headers = {
      "Content-Type": "application/json",
      "Authorization": authorization,
  }
  try {
      const data = await axios.post( apiURL+'customer/profile/update',body,{headers:headers});
      console.log("data is coming",data)
      return {error: false, data: data}
  } catch (e) {
      return {error: true, message: e}
  }
}

async function ListAddress() {
  try {
    var data = await axios.post(
      apiURL + "customer/address/list",
      {},
      { headers: authHeader() }
    );
    console.log("data", data);
    return { error: false, data: data };
  } catch (e) {
    console.log(e);
    return { error: true, message: e };
  }
}
async function UpdateAddress(id) {
  let payload = {
    default: true,
  };
  try {
    var data = await axios.post(
      apiURL + `customer/address/update/${id}`,
      payload,
      { headers: authHeader() }
    );
    console.log("data", data);
    return { error: false, data: data };
  } catch (e) {
    console.log(e);
    return { error: true, message: e };
  }
}
async function UpdateAllAddress(id, Resp) {
  let body = Resp[0];
  debugger;
  console.log("lat", payload);

  let payload = {
    addresses: body.addresses,
    flat_number: body.flat_number,
    type: body.type,
    landmark: body.landmark,
    location: {
      latitude: body.location.latitude,
      longitude: body.location.longitude,
    },
  };
  JSON.stringify(payload.location);
  console.log("lat", JSON.stringify(payload.location));

  try {
    var data = await axios.post(
      apiURL + `customer/address/update/${id}`,
      payload,
      { headers: authHeader() }
    );
    console.log("data", data);
    return { error: false, data: data };
  } catch (e) {
    console.log(e);
    return { error: true, message: e };
  }
}
async function PlaceOrder(body) {
  let payload = body;
  try {
    var data = await axios.post(apiURL + `orders/create`, payload, {
      headers: authHeader(),
    });
    console.log("data placeorder", data);
    return { error: false, data: data };
  } catch (e) {
    console.log(e);
    return { error: true, message: e };
  }
}
// https://staging-apis.letseat.co.uk/staging/api/v1/orders/web/create-payment-intent

async function PaymentIntent(body) {
  let payload = {
    order_id: body,
  };
  try {
    var data = await axios.post(
      apiURL + `orders/web/create-payment-intent`,
      JSON.stringify(payload),
      { headers: authHeader() }
    );
    console.log("Intent Key", data);
    return { error: false, data: data };
  } catch (e) {
    console.log(e);
    return { error: true, message: e };
  }
}
