import { combineReducers } from 'redux';
import {Cuisines} from "./homePage.reducer";
import {Restaurants} from "./restaurantList.reducer";
import errors from "./error.reducer";
const rootReducer = combineReducers({
    Cuisines,
    Restaurants,
    errors
})

export default rootReducer;
