import {passActions} from '../actions/actionType';
export const Cuisines = (state = {}, action) => {
    switch (action.type) {
        case passActions.SET_CUISINES:
            return action.data;
        default:
            return state
    }
}
