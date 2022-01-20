import { combineReducers } from "redux";
import { friendsAndRequestsReducer } from "./friends_and_requests/slice.js";

const rootReducer = combineReducers({
    friendsAndRequests: friendsAndRequestsReducer,
});

export default rootReducer;
