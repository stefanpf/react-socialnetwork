import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
    acceptFriendRequest,
    rejectRequestOrEndFriendship,
} from "../redux/friends_and_requests/slice";

export default function FriendsAndRequests() {
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const friends = useSelector(
        (state) =>
            state.friendsAndRequests &&
            state.friendsAndRequests.filter((friendship) => friendship.accepted)
    );
    const friendRequests = useSelector(
        (state) =>
            state.friendsAndRequests &&
            state.friendsAndRequests.filter(
                (friendship) => !friendship.accepted
            )
    );

    function handleAccept(id) {
        fetch(`/api/friend/accept/${id}`, {
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    dispatch(acceptFriendRequest(id));
                } else {
                    setError(true);
                }
            })
            .catch(() => {
                setError(true);
            });
    }

    function handleRejectOrCancel(id) {
        fetch(`/api/friend/cancel/${id}`, {
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    dispatch(rejectRequestOrEndFriendship(id));
                } else {
                    setError(true);
                }
            })
            .catch(() => {
                setError(true);
            });
    }

    return (
        <>
            <h1>Here goes the friends and pending requests:</h1>
            {error && <h2>Oops, something went wrong...</h2>}
            <h2>Pending Requests:</h2>
            {friendRequests &&
                friendRequests.map((friendRequest) => {
                    return (
                        <div key={friendRequest.id}>
                            <img src={friendRequest.image_url} />
                            {friendRequest.first} {friendRequest.last}
                            <button
                                onClick={() => handleAccept(friendRequest.id)}
                            >
                                Accept
                            </button>
                            <button
                                onClick={() =>
                                    handleRejectOrCancel(friendRequest.id)
                                }
                            >
                                Reject
                            </button>
                        </div>
                    );
                })}
            <h2>My Friends:</h2>
            {friends &&
                friends.map((friend) => {
                    return (
                        <div key={friend.id}>
                            <img src={friend.image_url} />
                            {friend.first} {friend.last}
                            <button
                                onClick={() => handleRejectOrCancel(friend.id)}
                            >
                                End Friendship
                            </button>
                        </div>
                    );
                })}
        </>
    );
}
