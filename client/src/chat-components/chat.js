import { useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "./socket";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);
    const chatContainerRef = useRef();

    const keyCheck = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("newChatMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div>
            <h1>This is the Chat...</h1>
            <div ref={chatContainerRef} className="chat-container">
                {chatMessages &&
                    chatMessages.map((msg) => {
                        return (
                            <div key={msg.id}>
                                {msg.message} by {msg.first} {msg.last} at{" "}
                                {msg.created_at}
                            </div>
                        );
                    })}
            </div>
            <textarea
                placeholder="Enter your chat message here"
                onKeyDown={keyCheck}
            />
        </div>
    );
}
