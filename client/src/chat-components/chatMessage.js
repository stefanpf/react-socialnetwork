import { Link } from "react-router-dom";
import ProfilePic from "../profile-components/profilePic";

export default function chatMessage(props) {
    const { userId, message } = props;
    const ownChatMessage = userId === message.user_id;
    const profilePic = (
        <>
            <Link to={`/user/${message.user_id}`}>
                <ProfilePic
                    first={message.first}
                    last={message.last}
                    imageUrl={message.image_url}
                    toggleUploaderFunc={() => {}}
                    className="chat-avatar"
                />
            </Link>
        </>
    );
    return (
        <div
            className={`chat-message ${
                ownChatMessage ? "own-chat-message" : "other-chat-message"
            }`}
        >
            {ownChatMessage ? (
                <>
                    <div className="chat-message-timestamp">
                        {message.created_at}
                    </div>
                    <div>{message.message}</div>{" "}
                    <div className="chat-message-avatar">{profilePic}</div>
                </>
            ) : (
                <>
                    <div className="chat-message-avatar">{profilePic}</div>
                    <div>{message.message}</div>
                    <div className="chat-message-timestamp">
                        {message.created_at}
                    </div>
                </>
            )}
        </div>
    );
}
