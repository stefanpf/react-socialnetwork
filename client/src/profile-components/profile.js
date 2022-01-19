import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";
import FriendList from "./friendList";

export default function Profile(props) {
    return (
        <>
            <h1>
                Hello {props.first} {props.last} User {props.userId}
            </h1>
            <ProfilePic
                imageUrl={props.imageUrl}
                toggleUploaderFunc={props.toggleUploaderFunc}
                className="profile-avatar"
            />
            <BioEditor
                userId={props.userId}
                bio={props.bio}
                updateBioFunc={props.updateBioFunc}
            />
            <FriendList />
        </>
    );
}
