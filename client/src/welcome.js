import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./auth-components/registration";
import Login from "./auth-components/login";
import ResetPassword from "./auth-components/resetPassword";

export default function Welcome() {
    return (
        <>
            <h1>Welcome To The Matrix</h1>
            <BrowserRouter>
                <div>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/password/reset">
                        <ResetPassword />
                    </Route>
                </div>
            </BrowserRouter>
        </>
    );
}
