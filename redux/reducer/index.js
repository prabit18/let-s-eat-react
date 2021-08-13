import { combineReducers } from 'redux';
import {Cuisines} from "./homePage.reducer";
import {Restaurants} from "./restaurantList.reducer";
import { Curatedlist } from './curatedList.reducer';
import {Menulist} from './menulist.reducer';
import { Restaurant } from './restaurant.reducer';
import errors from "./error.reducer";
import { cartV1 } from './cartV1.reducer';
import { cartV2 } from './cartV2.reducer';
import { menuObject } from './menuObject.reducer';

const rootReducer = combineReducers({
    Cuisines,
    Restaurants,
    Curatedlist,
    Menulist,
    Restaurant,
    errors,
    cartV1,
    cartV2,
    menuObject
})

export default rootReducer;
