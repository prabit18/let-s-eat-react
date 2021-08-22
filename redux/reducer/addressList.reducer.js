import {passActions} from '../actions/actionType';
export const addressList = (state = [], action) => {
    
    switch (action.type) {
        case passActions.SET_ADDRESS_LIST:
            return action.data;
        default:
            return state
    }
}
