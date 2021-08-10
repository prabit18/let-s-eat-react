import { combineReducers } from 'redux';
import {Cuisines} from "./homePage.reducer";
import {Restaurants} from "./restaurantList.reducer";
import { Curatedlist } from './curatedList.reducer';
import {Menulist} from './menulist.reducer';
import { Restaurant } from './restaurant.reducer';
import { Favourites } from './favouritelist.reducer';
import errors from "./error.reducer";
const rootReducer = combineReducers({
    Cuisines,
    Restaurants,
    Curatedlist,
    Menulist,
    Restaurant,
    Favourites,
    errors
})

export default rootReducer;
