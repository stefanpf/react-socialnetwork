import { combineReducers } from "redux";
import { userDataReducer } from "./user_data/slice.js";
import { friendsAndRequestsReducer } from "./friends_and_requests/slice.js";
import { chatMessagesReducer } from "./messages/slice.js";

const rootReducer = combineReducers({
    friendsAndRequests: friendsAndRequestsReducer,
    chatMessages: chatMessagesReducer,
    userData: userDataReducer,
});

export default rootReducer;
