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
                    setFriends(data.friends);
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
            {error && <h2>Oops, something went wrong...</h2>}
            {friends &&
                friends.map((friend) => (
                    <Link key={friend.id} to={`/user/${friend.id}`}>
                        <div>
                            <img
                                src={friend.image_url}
                                className="search-result-image"
                            />
                            {friend.first} {friend.last}
                        </div>
                    </Link>
                ))}
        </>
    );
}
