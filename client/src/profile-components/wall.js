import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
            <h2>The Wall</h2>
            {error && <h2>Oops, something went wrong...</h2>}
            <div className="form-container">
                <textarea
                    placeholder="Type something to post..."
                    onChange={(e) => setNewPost(e.target.value)}
                />
                <button onClick={submit}>Save</button>
            </div>
            {wallPosts &&
                wallPosts.map((wallPost) => {
                    return (
                        <div key={wallPost.post_id} className="wall-post">
                            <div>
                                {wallPost.post} - posted by{" "}
                                <Link to={`/user/${wallPost.id}`}>
                                    {wallPost.first} {wallPost.last}
                                </Link>{" "}
                                at {wallPost.created_at}
                            </div>
                        </div>
                    );
                })}
        </>
    );
}
