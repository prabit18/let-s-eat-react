import {passActions} from '../actions/actionType';
export const Favourites = (state = {}, action) => {
    switch (action.type) {
        case passActions.SET_FAVOURITE:
            return action.data;
        default:
            return state
    }
}
