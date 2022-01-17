import Logo from "./logo";
import ProfilePic from "../profile-components/profilePic";
import { Link } from "react-router-dom";

export default function Header(props) {
    return (
        <>
            <header>
                <Logo />
                <ProfilePic
                    first={props.first}
                    last={props.last}
                    imageUrl={props.imageUrl}
                    toggleUploaderFunc={props.toggleUploader}
                    className="navbar-avatar"
                />
                <Link to="/findpeople">Find People</Link> |
                <a href="/logout">Logout</a>
            </header>
        </>
    );
}
