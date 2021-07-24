import {passActions} from '../actions/actionType';
export const Menulist = (state = {}, action) => {

    switch (action.type) {
        case passActions.SET_MENULIST:
            return action.data;
        default:
            return state
    }
}