import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Logo from "./global-components/logo";
import ProfilePic from "./profile-components/profilePic";
import Uploader from "./profile-components/profilePicUploader";
import Profile from "./profile-components/profile";
import FindPeople from "./findPeople";

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
        this.updateBio = this.updateBio.bind(this);
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

    addNewImageUrlToState(imageUrl) {
        this.setState({ imageUrl });
    }

    updateBio(bio) {
        this.setState({ bio });
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
                        className="navbar-avatar"
                    />
                </section>
                {this.state.error && <h2>Uh oh, something went wrong...</h2>}
                {this.state.uploaderIsVisible && (
                    <Uploader
                        userId={this.state.userId}
                        addImageUrlFunc={this.addNewImageUrlToState}
                        toggleUploaderFunc={this.toggleUploader}
                    />
                )}
                <section>
                    <BrowserRouter>
                        <Route path="/findPeople">
                            <FindPeople />
                        </Route>
                        <Route path="/">
                            <Profile
                                userId={this.state.userId}
                                first={this.state.first}
                                last={this.state.last}
                                bio={this.state.bio}
                                imageUrl={this.state.imageUrl}
                                toggleUploaderFunc={this.toggleUploader}
                                updateBioFunc={this.updateBio}
                            />
                        </Route>
                    </BrowserRouter>
                </section>
            </>
        );
    }
}
