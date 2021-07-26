import {dataService} from '../../services'
import {passActions} from './actionType';
import {setErrors} from './error.action';
export const UserAction = {
    getRestaurants ,getCuisines, getCuratedlist,getMenulist,getRestaurant,getcart
}

function getCuisines() {
    return dispatch => {
        dataService.getCuisines()
            .then(data => data.error ? dispatch(setErrors(data.error)): dispatch(setCuisines(data.data.data.data)))
    }
    function setCuisines(data) {return {type: passActions.SET_CUISINES, data}}
}


function getRestaurants(type) {
    return dispatch => {
        dataService.getRestaurants(type)
            .then(data => data.error ? dispatch(setErrors(data.error)) : dispatch(setRestaurants(data.data.data)))
    }
    function setRestaurants(data) {return {type: passActions.SET_RESTAURANTS, data}}
}

function getCuratedlist() {
    return dispatch => {
        
        dataService.getCuratedList()
            .then(data => data.error ? dispatch(setErrors(data.error)) : dispatch(setCuratedlist(data.data.data.data)))
    }
    function setCuratedlist(data) {return {type: passActions.SET_CURATEDLIST, data}}
}

function getMenulist(type) {
    // debugger
    return dispatch => {
        dataService.getMenuList(type)
            .then(data => data.error ? dispatch(setErrors(data.error)) : dispatch(setMenulist(data.data.data.data)))
    }
    function setMenulist(data) {return {type: passActions.SET_MENULIST, data}}
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
    function setRestaurant(data) {return {type: passActions.SET_RESTAURANT, data}}
}
