import {dataService} from '../../services'
import {passActions} from './actionType';
import {setErrors} from './error.action';
export const UserAction = {
    getRestaurants ,getCuisines, getCuratedlist,getMenulist,getRestaurant,getcart,
}

function getCuisines() {
    return dispatch => {
        dataService.getCuisines()
            .then(data => data.error ? dispatch(setErrors(data.error)): dispatch(setCuisines(data.data.data.data)))
    }
    function setCuisines(data) {return {type: passActions.SET_CUISINES, data}}
}


function getRestaurants(type) {
    return async dispatch => {
        const data = await dataService.getRestaurants(type);
        if ((await data).error) {
            dispatch(setErrors(data.error))
        } else {
            dispatch(setRestaurants(data.data.data))
        }
    }
    function setRestaurants(data) {return {type: passActions.SET_RESTAURANTS, data}}
}

function getCuratedlist() {
    return async dispatch => {
        
        const data = await dataService.getCuratedList()
        if ((await data).error) {
            dispatch(setErrors(data.error))
        } else {
            dispatch(setCuratedlist(data.data.data.data))
        }
    }
    function setCuratedlist(data) {return {type: passActions.SET_CURATEDLIST, data}}
}

const handleFoodItems = (foodItems) => {
    const FoodData = [...foodItems];
    FoodData.map((value, i) => {
      FoodData[i]["cart"] = [];
      FoodData[i]["count"] = 0;
    });
    if(!localStorage.getItem('menuItems')){
        localStorage.setItem('menuItems',JSON.stringify(FoodData))
    }

  };

function getMenulist(type) {
    // debugger
    return dispatch => {
        dataService.getMenuList(type)
            .then(data => data.error ? dispatch(setErrors(data.error)) : dispatch(setMenulist(data.data.data.data))).catch((e)=>{console.log(e)})
    }
    function setMenulist(data) {
        handleFoodItems(data)
        return {type: passActions.SET_MENULIST, data}
        
        
    }
}

function getcart(body){
console.log("body",body);
return dispatch =>{
    dispatch(setMenulist(body))
}
function setMenulist(data) {return {type: passActions.SET_MENULIST, data}}

}

function getRestaurant(type) {
    return dispatch => {
        dataService.getRestaurant(type)
            .then(data => data.error ? dispatch(setErrors(data.error)) : dispatch(setRestaurant(data.data.data.data)))
    }
    function setRestaurant(data) {
        return {type: passActions.SET_RESTAURANT, data}}
}

