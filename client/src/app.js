import { Component } from "react";
import Logo from "./logo";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
// import { Link } from "react-router-dom";

export default class App extends Component {
    constructor({ userId }) {
        super();
        this.state = {
            userId,
            uploaderIsVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.logNamePlusSomeOtherStuffAsWell =
            this.logNamePlusSomeOtherStuffAsWell.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        fetch(`/user/${this.state.userId}`)
            .then((data) => data.json())
            .then((data) => {
                if (data.success) {
                    this.setState(data);
                } else {
                    this.setState({ error: true });
                }
            });
    }

    toggleUploader() {
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    logNamePlusSomeOtherStuffAsWell(val) {
        console.log(this.state.first + val);
    }

    render() {
        return (
            <>
                <section>
                    <a href="/logout">Logout</a>
                    <Logo />
                    <ProfilePic
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl=""
                        toggleUploaderFunc={this.toggleUploader}
                        loggerFunc={this.logNamePlusSomeOtherStuffAsWell}
                    />
                </section>
                {this.state.error && <h2>Uh oh, something went wrong...</h2>}
                {this.state.uploaderIsVisible && <Uploader />}
                {/* <button onClick={this.toggleUploader} className="button-cta">
                    Toggle Uploader
                </button> */}
            </>
        );
    }
}
