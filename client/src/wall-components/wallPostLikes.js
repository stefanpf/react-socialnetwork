import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function WallPostLikes(props) {
    const { postId } = props;
    const { userId, first, last } = useSelector(
        (state) => state.userData && state.userData
    );
    const [likes, setLikes] = useState(null);
    const [likedByLoggedInUser, setLikedByLoggedInUser] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`/api/wall/post/${postId}/like`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    if (data.likes.length > 0) {
                        setLikes(data.likes);
                        if (
                            data.likes.filter(
                                (like) => like.liked_by === userId
                            ).length > 0
                        ) {
                            setLikedByLoggedInUser(true);
                        }
                    }
                } else {
                    setError(true);
                }
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    const handleLike = () => {
        fetch(`/api/wall/post/${postId}/like`, {
            method: likedByLoggedInUser ? "DELETE" : "POST",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    if (data.id) {
                        setLikes([
                            {
                                first,
                                last,
                                liked_by: userId,
                                id: data.id,
                            },
                            ...likes,
                        ]);
                    } else {
                        setLikes(
                            likes.filter((like) => like.liked_by !== userId)
                        );
                    }
                    setLikedByLoggedInUser(!likedByLoggedInUser);
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true));
    };

    return (
        <div className="wall-posts-likes-container">
            {error && <h3>Oops, something went wrong...</h3>}
            {likes && (
                <div className="wall-posts-likes-liked-by">
                    Liked by&nbsp;
                    {likes.map((like, index) => {
                        if (likes.length == 1) {
                            return (
                                <div key={like.id}>
                                    {like.liked_by == userId ? (
                                        "you"
                                    ) : (
                                        <Link to={`/user/${like.liked_by}`}>
                                            {like.first} {like.last}
                                        </Link>
                                    )}
                                </div>
                            );
                        } else if (index < likes.length - 1) {
                            return (
                                <div key={like.id}>
                                    &nbsp;
                                    {like.liked_by == userId ? (
                                        "you,"
                                    ) : (
                                        <Link to={`/user/${like.liked_by}`}>
                                            {like.first} {like.last},
                                        </Link>
                                    )}
                                </div>
                            );
                        } else {
                            return (
                                <div key={like.id}>
                                    &nbsp;
                                    {like.liked_by == userId
                                        ? "and you"
                                        : `and ${like.first} ${like.last}`}
                                </div>
                            );
                        }
                    })}
                </div>
            )}
            <div className="wall-post-like-button">
                <button onClick={handleLike} key={postId}>
                    {likedByLoggedInUser ? "Unlike" : "Like"}
                </button>
            </div>
        </div>
    );
}
