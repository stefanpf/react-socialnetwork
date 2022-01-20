import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./global-components/header";
import Uploader from "./profile-components/profilePicUploader";
import Profile from "./profile-components/profile";
import OtherProfile from "./profile-components/otherProfile";
import FindPeople from "./findPeople";
import FriendsAndRequests from "./profile-components/friendsAndRequests";

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
        fetch(`/api/user/${this.state.userId}`)
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
                <BrowserRouter>
                    <Header
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.imageUrl}
                        toggleUploader={this.toggleUploader}
                    />
                    {this.state.error && (
                        <h2>Uh oh, something went wrong...</h2>
                    )}
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            userId={this.state.userId}
                            addImageUrlFunc={this.addNewImageUrlToState}
                            toggleUploaderFunc={this.toggleUploader}
                        />
                    )}
                    <section>
                        <Route path="/findpeople">
                            <FindPeople />
                        </Route>
                        <Route path="/user/:id">
                            <OtherProfile userId={this.state.userId} />
                        </Route>
                        <Route path="/friends-and-requests">
                            <FriendsAndRequests userId={this.state.userId} />
                        </Route>
                        <Route exact path="/">
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
                    </section>
                </BrowserRouter>
            </>
        );
    }
}
