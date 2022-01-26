import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
                            className="profile-avatar own-profile-pic"
                        />
                        <BioEditor />
                        <h2>My Friends:</h2>
                        <FriendList id={userData.userId} />
                        <div className="delete-account-btn-container">
                            <Link to="/delete-account">
                                <button className="delete-account-btn">
                                    Delete Account
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="profile-col-right">
                        <Wall authorId={userData.userId} id={userData.userId} />
                    </div>
                </>
            )}
        </>
    );
}
