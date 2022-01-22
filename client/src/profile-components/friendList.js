import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FriendList(props) {
    const { id } = props;
    const [error, setError] = useState(false);
    const [friends, setFriends] = useState();

    useEffect(() => {
        fetch(`/api/get-friends/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    const friends = data.friendsAndRequests.filter(
                        (friend) => friend.accepted
                    );
                    setFriends(friends);
                } else {
                    setError(true);
                }
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    return (
        <>
            <div className="friend-list">
                {error && <h2>Oops, something went wrong...</h2>}
                {friends &&
                    friends.map((friend) => (
                        <div key={friend.id} className="friend-list-element">
                            <Link to={`/user/${friend.id}`}>
                                <img
                                    src={friend.image_url}
                                    alt={`${friend.first} ${friend.last}`}
                                />
                                <div className="friend-list-element-name">
                                    {friend.first} {friend.last}
                                </div>
                            </Link>
                        </div>
                    ))}
            </div>
        </>
    );
}
