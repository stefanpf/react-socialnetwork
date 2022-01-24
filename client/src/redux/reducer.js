import { combineReducers } from "redux";
import { friendsAndRequestsReducer } from "./friends_and_requests/slice.js";
import { chatMessagesReducer } from "./messages/slice.js";

const rootReducer = combineReducers({
    friendsAndRequests: friendsAndRequestsReducer,
    chatMessages: chatMessagesReducer,
});

export default rootReducer;
