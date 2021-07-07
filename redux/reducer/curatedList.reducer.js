import {passActions} from '../actions/actionType';
export const Curatedlist = (state = {}, action) => {
    switch (action.type) {
        case passActions.SET_CURATEDLIST:
            return action.data;
        default:
            return state
    }
}
