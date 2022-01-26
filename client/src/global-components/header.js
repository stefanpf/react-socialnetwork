import Logo from "./logo";
import ProfilePic from "../profile-components/profilePic";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header(props) {
    const userData = useSelector((state) => state && state.userData);

    return (
        <>
            <header>
                <Logo />
                {userData && (
                    <ProfilePic
                        first={userData.first}
                        last={userData.last}
                        imageUrl={userData.imageUrl}
                        toggleUploaderFunc={props.toggleUploader}
                        className="navbar-avatar own-profile-pic"
                    />
                )}

                <div>
                    <Link to="/chat">Chat</Link> |&nbsp;
                    <Link to="/friends-and-requests">My Friends</Link> |&nbsp;
                    <Link to="/find-people">Find People</Link> |&nbsp;
                    <a href="/logout">Logout</a>
                </div>
            </header>
        </>
    );
}
