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
        this.addNewImageUrlToState = this.addNewImageUrlToState.bind(this);
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

    addNewImageUrlToState(url) {
        this.setState({ imageUrl: url });
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
                        imageUrl={this.state.imageUrl}
                        toggleUploaderFunc={this.toggleUploader}
                    />
                </section>
                {this.state.error && <h2>Uh oh, something went wrong...</h2>}
                {this.state.uploaderIsVisible && (
                    <Uploader
                        addImageUrlFunc={this.addNewImageUrlToState}
                        toggleUploaderFunc={this.toggleUploader}
                    />
                )}
            </>
        );
    }
}
