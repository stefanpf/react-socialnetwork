export default function profilePic(props) {
    const { imageUrl, first, last, toggleUploaderFunc, className } = props;

    return (
        <>
            <img
                onClick={() => {
                    toggleUploaderFunc();
                }}
                src={imageUrl || "/img/default-profile.jpg"}
                alt={`${first} ${last}`}
                className={className}
            />
        </>
    );
}
