import { Link } from "react-router-dom";

export default function WallPost(props) {
    const { post, author, first, last, created_at } = props;

    return (
        <div className="wall-post">
            <div>
                {post} - posted by{" "}
                <Link to={`/user/${author}`}>
                    {first} {last}
                </Link>{" "}
                at {created_at}
            </div>
        </div>
    );
}
