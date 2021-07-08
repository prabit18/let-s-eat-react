import { combineReducers } from 'redux';
import {Cuisines} from "./homePage.reducer";
import {Restaurants} from "./restaurantList.reducer";
import { Curatedlist } from './curatedList.reducer';
import errors from "./error.reducer";
const rootReducer = combineReducers({
    Cuisines,
    Restaurants,
    Curatedlist,
    errors
})

export default rootReducer;
