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
        <button className="delete-account-btn" onClick={handleDelete}>
            Delete Account
        </button>
    );
}
