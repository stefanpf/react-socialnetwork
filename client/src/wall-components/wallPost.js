import { Link } from "react-router-dom";
import WallPostLikes from "./wallPostLikes";

export default function WallPost(props) {
    const { post, author, first, last, postId } = props;
    let { createdAt } = props;
    createdAt = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "long",
        timeStyle: "short",
    }).format(new Date(createdAt));

    return (
        <div className="wall-post">
            <div className="wall-post-text">{post}</div>
            <div className="wall-post-author">
                - posted by{" "}
                <Link to={`/user/${author}`}>
                    <strong>
                        {first} {last}
                    </strong>
                </Link>{" "}
                on {createdAt}
            </div>
            <WallPostLikes postId={postId} />
        </div>
    );
}
