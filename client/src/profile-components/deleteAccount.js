import { Link } from "react-router-dom";

export default function DeleteAccount(props) {
    const { userId } = props;

    const handleDelete = () => {
        fetch(`/api/user/${userId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    location.replace("/");
                }
            });
    };
    return (
        <div className="wrapper delete-account-page">
            <h1>Are you sure?</h1>
            <div>
                <p>
                    Deleting your account is <strong>permanent</strong> and{" "}
                    <strong>cannot be undone!</strong>
                </p>
                <p>Deleting your account will delete all of the following:</p>
                <ul>
                    <li>
                        every <strong>Like</strong> you have ever left on a wall
                        post,
                    </li>
                    <li>
                        every <strong>Post</strong> you have ever made on a
                        wall,
                    </li>
                    <li>
                        every <strong>Message</strong> you have ever posted in
                        the chat,
                    </li>
                    <li>
                        any old <strong>Password Recovery Codes</strong> that
                        might still be left as residuals in our database,
                    </li>
                    <li>
                        every <strong>Picture</strong> you have ever uploaded,
                    </li>
                    <li>
                        every <strong>Link</strong> we have stored between you
                        and other users (i.e. friends), and
                    </li>
                    <li>
                        every piece of information we have stored about you (
                        <strong>
                            Name, Email Address, and Hashed Password
                        </strong>
                        .)
                    </li>
                </ul>
            </div>
            <Link to="/">
                <button className="cancel-delete-btn">
                    Cancel and Back To Profile
                </button>
            </Link>
            <button className="delete-account-btn" onClick={handleDelete}>
                Delete Account
            </button>
        </div>
    );
}
