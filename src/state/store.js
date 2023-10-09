import { applyMiddleware,combineReducers,createStore } 
from "redux";
import thunk from "redux-thunk";
import {reducer} from "./reducers/index"

const reducers = combineReducers({
    reducer:reducer
})

const initailState = {};

export const store = createStore(reducers,initailState,applyMiddleware(thunk));