import { useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";
import ChatMessage from "./chatMessage";

export default function Chat(props) {
    const { userId } = props;
    const chatMessages = useSelector((state) => state && state.chatMessages);
    const chatContainerRef = useRef();
    const textareaRef = useRef();

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("newChatMessage", e.target.value);
            e.target.value = "";
        }
    };

    const emitMessage = () => {
        if (textareaRef.current.value) {
            socket.emit("newChatMessage", textareaRef.current.value);
            textareaRef.current.value = "";
        }
    };

    return (
        <div className="wrapper">
            <div ref={chatContainerRef} className="chat-container">
                {chatMessages &&
                    chatMessages.map((msg) => {
                        return (
                            <ChatMessage
                                key={msg.id}
                                message={msg}
                                userId={userId}
                            />
                        );
                    })}
            </div>
            <div className="chat-input">
                <textarea
                    placeholder="Enter your chat message here"
                    onKeyDown={keyCheck}
                    ref={textareaRef}
                />
                <button onClick={emitMessage}>Send Message</button>
            </div>
        </div>
    );
}
