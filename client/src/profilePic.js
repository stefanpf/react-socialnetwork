export default function profilePic({
    first,
    last,
    imageUrl,
    toggleUploaderFunc,
}) {
    imageUrl = imageUrl || "img/default-profile.jpg";

    return (
        <img
            onClick={() => {
                toggleUploaderFunc();
            }}
            src={imageUrl}
            alt={`${first} ${last}`}
            id="navbar-avatar"
        />
    );
}
