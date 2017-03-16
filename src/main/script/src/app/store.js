import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import filterReducer from "./reducers/filterReducer";
import syncReducer from "./reducers/syncReducer";

const rootReducer = combineReducers({
    filterReducer,
    syncReducer
});

export default createStore(
    rootReducer,
    {},
    applyMiddleware(
        // logger(),
        thunk
        // ,promise()
    )
);