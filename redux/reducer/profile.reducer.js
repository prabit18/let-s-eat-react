import {passActions} from '../actions/actionType';
export const Profile = (state = {}, action) => {
    switch (action.type) {
        case passActions.SET_PROFILE:
            return action.data;
        default:
            return state
    }
}