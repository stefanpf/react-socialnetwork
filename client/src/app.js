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
            uploaderIsVisible: true,
            name: "Name",
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.logNamePlusSomeOtherStuffAsWell =
            this.logNamePlusSomeOtherStuffAsWell.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        fetch(`/user/${this.state.userId}`)
            .then((data) => data.json())
            .then(console.log);
    }

    toggleUploader() {
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }

    logNamePlusSomeOtherStuffAsWell(val) {
        console.log(this.state.name + val);
    }

    render() {
        return (
            <>
                <section>
                    <a href="/logout">Logout</a>
                    <Logo />
                    <ProfilePic
                        first="Alistair"
                        last="Quinn"
                        imageUrl=""
                        loggerFunc={this.logNamePlusSomeOtherStuffAsWell}
                    />
                </section>
                {this.state.uploaderIsVisible && <Uploader />}
                <button onClick={this.toggleUploader} className="button-cta">
                    Toggle Uploader
                </button>
            </>
        );
    }
}
