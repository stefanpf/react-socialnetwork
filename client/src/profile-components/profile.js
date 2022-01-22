import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";
import FriendList from "./friendList";
import Wall from "../wall-components/wall";

export default function Profile(props) {
    const {
        userId,
        first,
        last,
        imageUrl,
        bio,
        toggleUploaderFunc,
        updateBioFunc,
    } = props;
    return (
        <>
            <h1>
                Hello {first} {last} User {userId}
            </h1>
            <ProfilePic
                imageUrl={imageUrl}
                toggleUploaderFunc={toggleUploaderFunc}
                className="profile-avatar"
            />
            <BioEditor
                userId={userId}
                bio={bio}
                updateBioFunc={updateBioFunc}
            />
            <h2>My Friends:</h2>
            <FriendList id={userId} />
            <Wall authorId={userId} id={userId} />
        </>
    );
}
