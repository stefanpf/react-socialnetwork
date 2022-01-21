import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./global-components/header";
import Uploader from "./profile-components/profilePicUploader";
import Profile from "./profile-components/profile";
import OtherProfile from "./profile-components/otherProfile";
import FindPeople from "./findPeople";
import FriendsAndRequests from "./profile-components/friendsAndRequests";
import { receiveFriendsAndRequests } from "./redux/friends_and_requests/slice";

export default function App(props) {
    const { userId } = props;
    const [error, setError] = useState();
    const [uploaderIsVisible, setUploaderIsVisible] = useState(false);
    const [userData, setUserData] = useState({});
    const dispatch = useDispatch();

    function toggleUploader() {
        setUploaderIsVisible(!uploaderIsVisible);
    }

    function addNewImageUrlToState(imageUrl) {
        setUserData({ ...userData, imageUrl });
    }

    function updateBio(bio) {
        setUserData({ ...userData, bio });
    }

    useEffect(() => {
        fetch(`/api/user/${userId}`)
            .then((data) => data.json())
            .then((data) => {
                if (data.success) {
                    return setUserData(data);
                } else {
                    setError(true);
                }
            })
            .then(() => {
                return fetch(`/api/get-friends/${userId}`);
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    dispatch(
                        receiveFriendsAndRequests(data.friendsAndRequests)
                    );
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true));
    }, []);

    return (
        <>
            <BrowserRouter>
                <Header
                    first={userData.first}
                    last={userData.last}
                    imageUrl={userData.imageUrl}
                    toggleUploader={toggleUploader}
                />
                {error && <h2>Uh oh, something went wrong...</h2>}
                {uploaderIsVisible && (
                    <Uploader
                        userId={userId}
                        addImageUrlFunc={addNewImageUrlToState}
                        toggleUploaderFunc={toggleUploader}
                    />
                )}
                <section>
                    <Route path="/findpeople">
                        <FindPeople />
                    </Route>
                    <Route path="/user/:id">
                        <OtherProfile userId={userId} />
                    </Route>
                    <Route path="/friends-and-requests">
                        <FriendsAndRequests userId={userId} />
                    </Route>
                    <Route exact path="/">
                        <Profile
                            userId={userId}
                            first={userData.first}
                            last={userData.last}
                            bio={userData.bio}
                            imageUrl={userData.imageUrl}
                            toggleUploaderFunc={toggleUploader}
                            updateBioFunc={updateBio}
                        />
                    </Route>
                </section>
            </BrowserRouter>
        </>
    );
}
