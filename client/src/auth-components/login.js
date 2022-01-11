import { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../logo";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log("Login just mounted");
    }

    handleChange({ target }) {
        this.setState(
            {
                [target.name]: target.value,
            },
            () => console.log(this.state)
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch("/login.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    location.reload();
                } else {
                    this.setState({ error: true });
                }
            })
            .catch((err) => {
                console.log("Error when submitting data on /login.json:", err);
                this.setState({ error: true });
            });
    }

    render() {
        return (
            <>
                <h1>Login</h1>
                {this.state.error && <h2>Oops, something went wrong...</h2>}
                <Logo />
                <div className="form-container">
                    <form>
                        <input
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            required
                            onChange={this.handleChange}
                        ></input>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            required
                            onChange={this.handleChange}
                        ></input>
                        <button
                            type="submit"
                            className="button-cta"
                            onClick={(e) => this.handleSubmit(e)}
                        >
                            Login
                        </button>
                    </form>
                    Don&apos;t have an account yet?
                    <Link to="/">Click here to register!</Link>
                    <Link to="/password/reset">Forgot your password?</Link>
                </div>
            </>
        );
    }
}
