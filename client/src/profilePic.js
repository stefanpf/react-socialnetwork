export default function profilePic({
    first,
    last,
    imageUrl,
    toggleUploaderFunc,
    loggerFunc,
}) {
    imageUrl = imageUrl || "img/default-profile.jpg";
    const nameSymbols = "13123812";

    return (
        <img
            onClick={() => {
                toggleUploaderFunc();
                loggerFunc(nameSymbols);
            }}
            src={imageUrl}
            alt={`${first} ${last}`}
            id="navbar-avatar"
        />
    );
}
