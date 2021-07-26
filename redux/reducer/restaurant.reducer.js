import {passActions} from '../actions/actionType';
export const Restaurant = (state = {}, action) => {
    switch (action.type) {
        case passActions.SET_RESTAURANT:
            return action.data;
        default:
            return state
    }
}