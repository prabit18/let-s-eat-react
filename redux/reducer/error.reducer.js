import {errorActions} from '../actions/actionType'

const errors = (state = {}, action) => {
    switch (action.type) {
        case errorActions.SET_ERROR:
            return {
                error: action.error
            };
        case errorActions.RESET_ERROR:
            return {};
        default:
            return state;
    }
};

export default errors;
