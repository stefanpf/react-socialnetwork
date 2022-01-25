import { useState, useEffect, useRef } from "react";
import WallPost from "./wallPost";

export default function Wall(props) {
    const { id, authorId, loggedInUserAndOtherProfileAreFriends } = props;
    const ownWall = id == authorId;
    const textareaRef = useRef();
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

    function keyCheck(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            submit();
        }
    }

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
                    textareaRef.current.value = "";
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
                {(ownWall || loggedInUserAndOtherProfileAreFriends) && (
                    <div className="form-container">
                        <textarea
                            placeholder="Type something to post..."
                            onKeyDown={keyCheck}
                            onChange={(e) => setNewPost(e.target.value)}
                            ref={textareaRef}
                        />
                        <button onClick={submit}>Post</button>
                        {error && <h2>Oops, something went wrong...</h2>}
                    </div>
                )}
                {wallPosts &&
                    wallPosts.map((wallPost) => {
                        return (
                            <WallPost
                                key={wallPost.post_id}
                                postId={wallPost.post_id}
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
