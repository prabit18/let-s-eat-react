import {passActions} from '../actions/actionType';
export const menuObject = (state = {}, action) => {
    switch (action.type) {
        case passActions.SET_MENU_OBJECT:
            return action.data;
        default:
            return state
    }
}
