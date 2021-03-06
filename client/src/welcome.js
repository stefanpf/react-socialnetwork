import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./auth-components/registration";
import Login from "./auth-components/login";
import ResetPassword from "./auth-components/resetPassword";

export default function Welcome() {
    return (
        <>
            <div className="wrapper">
                <h1>Welcome To The Social Network</h1>
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
            </div>
        </>
    );
}
