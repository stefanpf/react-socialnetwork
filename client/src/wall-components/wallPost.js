import { Link } from "react-router-dom";

export default function WallPost(props) {
    const { post, author, first, last } = props;
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
                at {createdAt}
            </div>
        </div>
    );
}
