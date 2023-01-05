import {combineReducers} from "redux";
import {applyMiddleware, createStore} from "redux";
import profileReducer from "./profileReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    profile: profileReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))