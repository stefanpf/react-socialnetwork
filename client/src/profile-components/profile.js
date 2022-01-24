import { useSelector } from "react-redux";
import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";
import FriendList from "./friendList";
import Wall from "../wall-components/wall";

export default function Profile(props) {
    const userData = useSelector((state) => state && state.userData);
    const { toggleUploaderFunc } = props;
    return (
        <>
            {userData && (
                <>
                    <div className="profile-col-left">
                        <h1>
                            Welcome back, {userData.first} {userData.last}!
                        </h1>
                        <ProfilePic
                            imageUrl={userData.imageUrl}
                            first={userData.first}
                            last={userData.last}
                            toggleUploaderFunc={toggleUploaderFunc}
                            className="profile-avatar"
                        />
                        <BioEditor />
                        <h2>My Friends:</h2>
                        <FriendList id={userData.userId} />
                    </div>
                    <div className="profile-col-right">
                        <Wall authorId={userData.userId} id={userData.userId} />
                    </div>
                </>
            )}
        </>
    );
}
