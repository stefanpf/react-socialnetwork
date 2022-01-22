import { useState, useEffect } from "react";
import WallPost from "./wallPost";

export default function Wall(props) {
    const { id, authorId } = props;
    const [wallPosts, setWallPosts] = useState([]);
    const [newPost, setNewPost] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`/api/wall/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setWallPosts(data.posts);
                } else {
                    setError(true);
                }
            })
            .catch(() => {
                setError(true);
            });
    }, []);

    function submit() {
        fetch(`/api/wall/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ author: authorId, post: newPost }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setWallPosts([
                        { ...data.postData, post: newPost },
                        ...wallPosts,
                    ]);
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true));
    }

    return (
        <>
            <div className="wall-container">
                <div className="form-container">
                    <textarea
                        placeholder="Type something to post..."
                        onChange={(e) => setNewPost(e.target.value)}
                    />
                    <button onClick={submit}>Save</button>
                    {error && <h2>Oops, something went wrong...</h2>}
                </div>
                {wallPosts &&
                    wallPosts.map((wallPost) => {
                        return (
                            <WallPost
                                key={wallPost.post_id}
                                post={wallPost.post}
                                author={wallPost.id}
                                first={wallPost.first}
                                last={wallPost.last}
                                createdAt={wallPost.created_at}
                            />
                        );
                    })}
            </div>
        </>
    );
}
