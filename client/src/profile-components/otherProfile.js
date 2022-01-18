import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import FriendButton from "./friendButton";

export default function OtherProfile(props) {
    const { userId } = props;
    const { id } = useParams();
    const history = useHistory();
    const [userData, setUserData] = useState();
    const [error, setError] = useState(false);

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
                    Information about the other user goes here:
                    <div>
                        <img src={userData.imageUrl} />
                    </div>
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
        </>
    );
}
