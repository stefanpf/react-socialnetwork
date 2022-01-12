import { Component } from "react";

export default class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            stage: 1,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        if (this.state.stage === 1) {
            fetch("/password/reset/start", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.state),
            })
                .then((data) => data.json())
                .then((data) => {
                    if (data.success) {
                        this.setState({ stage: 2 });
                    } else {
                        this.setState({ error: true });
                    }
                });
        } else if (this.state.stage === 2) {
            fetch("/password/reset/confirm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.state),
            })
                .then((data) => data.json())
                .then((data) => {
                    if (data.success) {
                        this.setState({ stage: 3 });
                    } else {
                        this.setState({ error: true });
                    }
                });
        }
    }

    renderStage() {
        if (this.state.stage === 1) {
            return (
                <>
                    {this.state.error && <h2>Oops, something went wrong...</h2>}
                    <div className="form-container">
                        <form>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                required
                                onChange={this.handleChange}
                            ></input>
                            <button
                                type="submit"
                                className="button-cta"
                                onClick={this.handleSubmit}
                            >
                                Reset Password
                            </button>
                        </form>
                    </div>
                </>
            );
        } else if (this.state.stage === 2) {
            return (
                <>
                    {this.state.error && <h2>Oops, something went wrong...</h2>}
                    <div className="form-container">
                        <form>
                            <input
                                type="text"
                                name="resetCode"
                                placeholder="your reset code"
                                required
                                onChange={this.handleChange}
                            ></input>
                            <input
                                type="password"
                                name="password"
                                placeholder="your new password"
                                required
                                onChange={this.handleChange}
                            ></input>
                            <button
                                type="submit"
                                className="button-cta"
                                onClick={this.handleSubmit}
                            >
                                Save new password
                            </button>
                        </form>
                    </div>
                </>
            );
        } else if (this.state.stage === 3) {
            return (
                <>
                    <div>
                        Yay, new password saved! <a href="/login">Log in now</a>
                    </div>
                </>
            );
        }
    }
    render() {
        return (
            <>
                <h1>Password Reset</h1>
                {this.renderStage()}
            </>
        );
    }
}
