import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import filterReducer from "./reducers/filterReducer";

export default createStore(
    combineReducers({
        filterReducer
    }),
    {},
    applyMiddleware(
        logger(),
        thunk
        // ,promise()
    )
);