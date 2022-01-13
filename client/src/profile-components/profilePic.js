export default function profilePic({
    first,
    last,
    imageUrl,
    toggleUploaderFunc,
    className,
}) {
    imageUrl = imageUrl || "/img/default-profile.jpg";

    return (
        <img
            onClick={() => {
                toggleUploaderFunc();
            }}
            src={imageUrl}
            alt={`${first} ${last}`}
            className={className}
        />
    );
}
