import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Logo from "./logo";

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(<Logo />, document.querySelector("main"));
        }
    });
