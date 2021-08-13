import {passActions} from '../actions/actionType';
export const cartV2 = (state = {}, action) => {
    switch (action.type) {
        case passActions.SET_CART_V2:
            return action.data;
        default:
            return state
    }
}
