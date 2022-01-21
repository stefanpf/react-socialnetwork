import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as immutableState from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import reducer from "./redux/reducer.js";
import Welcome from "./welcome";
import App from "./app";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk, immutableState.default()))
);

fetch("/api/user/id")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(
                <Provider store={store}>
                    <App userId={data.userId} />
                </Provider>,
                document.querySelector("main")
            );
        }
    });
