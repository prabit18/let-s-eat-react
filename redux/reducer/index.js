import { combineReducers } from 'redux';
import {Cuisines} from "./homePage.reducer";
import {Restaurants} from "./restaurantList.reducer";
import { Curatedlist } from './curatedList.reducer';
import {Menulist} from './menulist.reducer';
import { Restaurant } from './restaurant.reducer';
import { Favourites } from './favouritelist.reducer';
import errors from "./error.reducer";
import { cartV1 } from './cartV1.reducer';
import { cartV2 } from './cartV2.reducer';
import { menuObject } from './menuObject.reducer';
import { Cusinieslist } from './cuisinieslist.reducer';
import { Profile } from './profile.reducer';
import { addressList } from './addressList.reducer';

const rootReducer = combineReducers({
    Cuisines,
    Cusinieslist,
    Restaurants,
    Curatedlist,
    Menulist,
    Restaurant,
    Favourites,
    errors,
    cartV1,
    cartV2,
    menuObject,
    Profile,
    addressList,
    Cusinieslist,
})

export default rootReducer;
