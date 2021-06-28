import {dataService} from '../../services'
import {passActions} from './actionType';
import {setErrors} from './error.action';
export const UserAction = {
    getCuisines
}

function getCuisines() {
    return dispatch => {
        dataService.getCuisines()
            .then(data => dispatch(setCuisines(data.data.data)))
            .catch = (data) => dispatch(setErrors(data.error))
    }
    function setCuisines(data) {return {type: passActions.SET_CUISINES, data}}
}
