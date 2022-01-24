export function chatMessagesReducer(chatMessages = null, action) {
    if (action.type == "chatMessages/received") {
        chatMessages = action.payload.chatMessages;
    } else if (action.type == "chatMessages/newChatMessage") {
        const newChatMessages = [action.payload.msg, ...chatMessages];
        return newChatMessages;
    }
    return chatMessages;
}

export function chatMessagesReceived(msgs) {
    return {
        type: "chatMessages/received",
        payload: {
            chatMessages: msgs,
        },
    };
}

export function chatMessageReceived(msg) {
    return {
        type: "chatMessages/newChatMessage",
        payload: { msg },
    };
}
