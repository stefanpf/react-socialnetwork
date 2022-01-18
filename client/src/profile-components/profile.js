import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";

export default function Profile(props) {
    return (
        <>
            <h1>This is the Profile component</h1>
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
        </>
    );
}
