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
        <>
            <h1>Are you sure?</h1>
            <div>
                <p>Deleting your account is permanent and cannot be undone!</p>
                <p>Deleting your account will delete all of the following:</p>
                <ul>
                    <li>every Like you have ever left on a wall post,</li>
                    <li>every post you have ever made on a wall,</li>
                    <li>every message you have ever posted in the chat,</li>
                    <li>
                        any old password recovery codes that might still be left
                        as residuals in our database,
                    </li>
                    <li>every picture you have ever uploaded,</li>
                    <li>
                        every link we have stored between you and other users
                        (i.e. friends), and
                    </li>
                    <li>
                        every piece of information we have stored about you
                        (name, email address, and hashed password.)
                    </li>
                </ul>
            </div>
            <Link to="/">
                <button>Cancel and Back To Profile</button>
            </Link>
            <button className="delete-account-btn" onClick={handleDelete}>
                Delete Account
            </button>
        </>
    );
}
