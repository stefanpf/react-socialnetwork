import { combineReducers } from "redux";
import { friendsAndWannabesReducer } from "./friends_and_wannabes/slice";

const rootReducer = combineReducers({
    friendsAndWannabes: friendsAndWannabesReducer,
});

export default rootReducer;
