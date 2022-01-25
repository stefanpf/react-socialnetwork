import { useState, useEffect } from "react";

export default function WallPostLikes(props) {
    const { postId } = props;
    const [likes, setLikes] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`/api/wall/post/${postId}/like`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    if (data.likes) {
                        setLikes(data.likes);
                    }
                } else {
                    setError(true);
                }
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    return (
        <div className="wall-posts-likes-container">
            {error && <h3>Oops, something went wrong...</h3>}
            {postId}
            <h3>Liked by:</h3>
            {likes &&
                likes.map((like) => {
                    return (
                        <h4 key={like.id}>
                            {like.first} {like.last}
                        </h4>
                    );
                })}
        </div>
    );
}
