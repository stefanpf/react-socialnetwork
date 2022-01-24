export function chatMessagesReducer(chatMessages = null, action) {
    if (action.type == "chatMessages/received") {
        chatMessages = action.payload.chatMessages;
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
