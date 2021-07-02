import {dataService} from '../../services'
import {passActions} from './actionType';
import {setErrors} from './error.action';
export const UserAction = {
    getRestaurants ,getCuisines
}

function getCuisines() {
    return dispatch => {
        dataService.getCuisines()
            .then(data => data.error ? dispatch(setErrors(data.error)): dispatch(setCuisines(data.data.data.data)))
    }
    function setCuisines(data) {return {type: passActions.SET_CUISINES, data}}
}


function getRestaurants() {
    return dispatch => {
        dataService.getRestaurants()
            .then(data => data.error ? dispatch(setErrors(data.error)) : dispatch(setRestaurants(data.data.data.data)))
    }
    function setRestaurants(data) {return {type: passActions.SET_RESTAURANTS, data}}
}
