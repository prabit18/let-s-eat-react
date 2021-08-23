import {passActions} from '../actions/actionType';
export const Cusinieslist = (state = {}, action) => {
    switch (action.type) {
        case passActions.SET_CUISINESLIST:
            return action.data;
        default:
            return state
    }
}