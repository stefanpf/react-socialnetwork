import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";
import ProfilePic from "./profilePic";
import FriendButton from "./friendButton";
import FriendList from "./friendList";
import Wall from "../wall-components/wall";

export default function OtherProfile(props) {
    const { userId } = props;
    const { id } = useParams();
    const history = useHistory();
    const [userData, setUserData] = useState();
    const [error, setError] = useState(false);
    const loggedInUsersFriends = useSelector(
        (state) =>
            state.friendsAndRequests &&
            state.friendsAndRequests.filter((friendship) => friendship.accepted)
    );
    const loggedInUserAndOtherProfileAreFriends =
        loggedInUsersFriends &&
        loggedInUsersFriends.some((friend) => friend.id == id);

    useEffect(() => {
        if (userId == id) {
            history.replace("/");
        } else {
            fetch(`/api/user/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setUserData(data);
                    } else {
                        setError(true);
                    }
                })
                .catch(() => setError(true));
        }
    }, [id]);

    return (
        <>
            <div className="profile-col-left">
                {userData && (
                    <h1>
                        {userData.first} {userData.last}
                    </h1>
                )}
                {error && <h2>Oops, something went wrong...</h2>}
                {userData && (
                    <div>
                        <ProfilePic
                            imageUrl={userData.imageUrl}
                            className="profile-avatar"
                            toggleUploaderFunc={() => {}}
                        />
                        <div className="bio-text">{userData.bio}</div>
                        <FriendButton
                            viewedByThisUser={userId}
                            visibleOnProfileWithId={id}
                        />
                        {loggedInUserAndOtherProfileAreFriends && (
                            <>
                                <h2>These are their friends:</h2>
                                <FriendList id={id} />
                            </>
                        )}
                    </div>
                )}
            </div>
            <div className="profile-col-right">
                {loggedInUserAndOtherProfileAreFriends && (
                    <Wall authorId={userId} id={id} />
                )}
            </div>
        </>
    );
}
