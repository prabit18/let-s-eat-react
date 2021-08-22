import {passActions} from '../actions/actionType';
export const cartV1 = (state = {}, action) => {
    switch (action.type) {
        case passActions.SET_CART_V1:
            return action.data;
        default:
            return state
    }
}
