import {passActions} from '../actions/actionType';
export const Restaurants = (state = {}, action) => {
    switch (action.type) {
        case passActions.SET_RESTAURANTS:
            return action.data;
        default:
            return state
    }
}