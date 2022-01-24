import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./global-components/header";
import Uploader from "./profile-components/profilePicUploader";
import Profile from "./profile-components/profile";
import OtherProfile from "./profile-components/otherProfile";
import FindPeople from "./findPeople";
import Chat from "./chat-components/chat";
import FriendsAndRequests from "./profile-components/friendsAndRequests";
import { receiveFriendsAndRequests } from "./redux/friends_and_requests/slice";
import { receiveUserData } from "./redux/user_data/slice";

export default function App(props) {
    const { userId } = props;
    const [error, setError] = useState();
    const [uploaderIsVisible, setUploaderIsVisible] = useState(false);
    const dispatch = useDispatch();

    function toggleUploader() {
        setUploaderIsVisible(!uploaderIsVisible);
    }

    useEffect(() => {
        fetch(`/api/user/${userId}`)
            .then((data) => data.json())
            .then((data) => {
                if (data.success) {
                    dispatch(receiveUserData({ ...data.userData, userId }));
                } else {
                    setError(true);
                }
            })
            .then(() => {
                dispatch(receiveFriendsAndRequests(userId));
            })
            .catch(() => setError(true));
    }, []);

    return (
        <>
            <BrowserRouter>
                <Header toggleUploader={toggleUploader} />
                {error && <h2>Uh oh, something went wrong...</h2>}
                {uploaderIsVisible && (
                    <Uploader toggleUploaderFunc={toggleUploader} />
                )}
                <section className="main-container">
                    <div className="profile">
                        <Route path="/user/:id">
                            <OtherProfile userId={userId} />
                        </Route>
                        <Route exact path="/">
                            <Profile toggleUploaderFunc={toggleUploader} />
                        </Route>
                    </div>
                    <Route path="/find-people">
                        <FindPeople />
                    </Route>
                    <Route path="/friends-and-requests">
                        <FriendsAndRequests userId={userId} />
                    </Route>
                    <Route path="/chat">
                        <Chat userId={userId} />
                    </Route>
                </section>
            </BrowserRouter>
        </>
    );
}
