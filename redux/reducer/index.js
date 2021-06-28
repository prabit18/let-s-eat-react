import { combineReducers } from 'redux';
import {Cuisines} from "./homePage.reducer";
import errors from "./error.reducer";
const rootReducer = combineReducers({
    Cuisines,
    errors
})

export default rootReducer;
