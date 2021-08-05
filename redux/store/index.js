import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import rootReducer from "../reducer";
import {createLogger} from 'redux-logger';

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk,loggerMiddleware))
)

export default store;
