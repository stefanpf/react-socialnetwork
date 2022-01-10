import { Component } from "react";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log("Registration just mounted");
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
        fetch("/register.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data from /register.json", data);
                if (data.success) {
                    console.log("yay, this worked");
                    location.reload();
                } else {
                    this.setState({ error: true });
                    console.log("uh oh, there was an error");
                }
            })
            .catch((err) => {
                console.log(
                    "Error when submitting data on /register.json:",
                    err
                );
                this.setState({ error: true });
            });
    }

    render() {
        return (
            <>
                <h1>Registration</h1>
                {this.state.error && <h2>Oops, something went wrong...</h2>}
                <form>
                    <input
                        type="text"
                        name="first"
                        placeholder="first name"
                        required
                        onChange={this.handleChange}
                    ></input>
                    <input
                        type="text"
                        name="last"
                        placeholder="last name"
                        required
                        onChange={this.handleChange}
                    ></input>
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
                    <button type="submit" onClick={(e) => this.handleSubmit(e)}>
                        Register
                    </button>
                </form>
            </>
        );
    }
}
