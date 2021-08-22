import { dataService } from "../../services";
import { passActions } from "./actionType";
import { setErrors } from "./error.action";
export const UserAction = {
  getRestaurants,
  getCuisines,
  getCuratedlist,
  getMenulist,
  getRestaurant,
  getcart,
  FavouriteList,
  getcartV1,
  getcartV2,
  getMenuObject,
  addressList
};

function getCuisines() {
  return (dispatch) => {
    dataService
      .getCuisines()
      .then((data) =>
        data.error
          ? dispatch(setErrors(data.error))
          : dispatch(setCuisines(data.data.data.data))
      );
  };
  function setCuisines(data) {
    return { type: passActions.SET_CUISINES, data };
  }
}

function getRestaurants(type) {
  return async (dispatch) => {
    const data = await dataService.getRestaurants(type);
    if ((await data).error) {
      dispatch(setErrors(data.error));
    } else {
      dispatch(setRestaurants(data.data.data));
    }
  };
  function setRestaurants(data) {
    return { type: passActions.SET_RESTAURANTS, data };
  }
}

function getCuratedlist() {
  return async (dispatch) => {
    const data = await dataService.getCuratedList();
    //debugger
    if ((await data).error) {
      dispatch(setErrors(data.error));
    } else {
      console.log("useractions",data.data.data)
      dispatch(setCuratedlist(data.data.data));
    }
  };
  function setCuratedlist(data) {
    return { type: passActions.SET_CURATEDLIST, data };
  }
}

const handleFoodItems = (foodItems) => {
  
    if(foodItems){
      
        const FoodData = [...foodItems];
        var localdata = JSON.parse(localStorage.getItem("menuItems"));
        // var loc=localdata.length
            if (!localdata===null&&localdata[0].restaurant_id != FoodData[0].restaurant_id) {
              localStorage.setItem("menuItems", JSON.stringify(FoodData));
            } else  {
              if(!localStorage.getItem("menuItems")){
                
                localStorage.setItem("menuItems", JSON.stringify(FoodData));
              }
             
        }
    }
  
};

function getMenulist(type) {
  // debugger
  return (dispatch) => {
    //   const data = await dataService.getMenuList(type).then((res)=>);
    //   if((await data &&data).error){
    //       dispatch(setErrors(data.error))
    //   }else{
    //       dispatch(setMenulist(data.data.data.data))
    //   }
    //   return data
      dataService.getMenuList(type).then((data) => 
      data.error? dispatch(setErrors(data.error))
          : dispatch(setMenulist(data.data.data.data))
      )
      .catch((e) => {
        console.log(e);
      });
  };
  function setMenulist(data) {

    handleFoodItems(data);
    return { type: passActions.SET_MENULIST, data };
  }
}

function getcart(body) {
  return (dispatch) => {
    dispatch(setMenulist(body));
  };
  function setMenulist(data) {
    return { type: passActions.SET_MENULIST, data };
  }
}

function getRestaurant(type) {
  return (dispatch) => {
    dataService
      .getRestaurant(type)
      .then((data) =>
        data.error
          ? dispatch(setErrors(data.error))
          : dispatch(setRestaurant(data.data.data.data))
      );
  };
  function setRestaurant(data) {
    return { type: passActions.SET_RESTAURANT, data };
  }
}
function FavouriteList() {
  return async (dispatch) => {
    const data = await dataService.FavouriteList();
    if ((await data).error) {
      dispatch(setErrors(data.error));
    } else {
      dispatch(setFavouriteList(data.data.data.data));
    }
  };
  function setFavouriteList(data) {
    return { type: passActions.SET_FAVOURITE, data };
  }
}
function getcartV1(body) {
    return (dispatch) => {
      dispatch(cartV1(body));
    };
    function cartV1(data) {
      return { type: passActions.SET_CART_V1, data };
    }
  }
  
  function getcartV2(body) {
    return (dispatch) => {
      dispatch(cartV2(body));
    };
    function cartV2(data) {
      return { type: passActions.SET_CART_V2, data };
    }
  }
  function getMenuObject(body) {
    return (dispatch) => {
      dispatch(menuObject(body));
    };
    function menuObject(data) {
      return { type: passActions.SET_MENU_OBJECT, data };
    }
  }
  function addressList(body) {
    
    return (dispatch) => {
      dispatch(InsertaddressList(body));
    };
    function InsertaddressList(data) {
      return { type: passActions.SET_ADDRESS_LIST, data };
    }
  }