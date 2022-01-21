import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";
import ProfilePic from "./profilePic";
import FriendButton from "./friendButton";
import FriendList from "./friendList";
import Wall from "./wall";

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
            <h2>This is the Other Profile component for user {id}</h2>
            {error && <h2>Oops, something went wrong...</h2>}
            {userData && (
                <div>
                    <ProfilePic
                        imageUrl={userData.imageUrl}
                        className="profile-avatar"
                        toggleUploaderFunc={() => {}}
                    />
                    <div>
                        {userData.first} {userData.last}
                    </div>
                    <div>{userData.bio}</div>
                    <FriendButton
                        viewedByThisUser={userId}
                        visibleOnProfileWithId={id}
                    />
                </div>
            )}

            {loggedInUserAndOtherProfileAreFriends && (
                <>
                    <h2>These are their friends:</h2>
                    <FriendList id={id} />
                    <hr />
                    <Wall authorId={userId} id={id} />
                </>
            )}
        </>
    );
}
