import { useState, useEffect } from "react";

export default function FriendButton(props) {
    const {
        viewedByThisUser: loggedInUser,
        visibleOnProfileWithId: viewedProfile,
    } = props;
    const [friendshipStatus, setFriendshipStatus] = useState();
    const [error, setError] = useState(false);

    const friendButtonText = {
        noFriends: "Add As Friend",
        friends: "Remove Friend",
        waitingForAnAnswer: "Cancel Request",
        someoneWantsToBeMyFriend: "Accept Request",
    };

    useEffect(() => {
        fetch(`/api/friend/${viewedProfile}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.friendship) {
                    setFriendshipStatus("noFriends");
                } else if (data.friendship.accepted) {
                    setFriendshipStatus("friends");
                } else if (loggedInUser == data.friendship.sender_id) {
                    setFriendshipStatus("waitingForAnAnswer");
                } else {
                    setFriendshipStatus("someoneWantsToBeMyFriend");
                }
            });
    }, []);

    function changeFriendship() {
        if (friendshipStatus == "noFriends") {
            fetch(`/api/friend/add/${viewedProfile}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setFriendshipStatus("waitingForAnAnswer");
                    } else {
                        setError(true);
                    }
                });
        } else if (
            friendshipStatus == "waitingForAnAnswer" ||
            friendshipStatus == "friends"
        ) {
            fetch(`/api/friend/cancel/${viewedProfile}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setFriendshipStatus("noFriends");
                    } else {
                        setError(true);
                    }
                });
        } else {
            fetch(`/api/friend/accept/${viewedProfile}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setFriendshipStatus("friends");
                    } else {
                        setError(true);
                    }
                });
        }
    }

    return (
        <>
            <button className="button-cta" onClick={changeFriendship}>
                {friendButtonText[friendshipStatus]}
            </button>
            {error && <h2>Oops, something went wrong...</h2>}
        </>
    );
}
