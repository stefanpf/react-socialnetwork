export function friendsAndRequestsReducer(friendsAndRequests = null, action) {
    if (action.type == "friendsAndRequests/received") {
        friendsAndRequests = action.payload.friendsAndRequests;
    } else if (action.type == "friendsAndRequests/acceptRequest") {
        const newFriendsAndRequests = friendsAndRequests.map(
            (friendAndRequest) => {
                if (friendAndRequest.id === action.payload.id) {
                    return {
                        ...friendAndRequest,
                        accepted: true,
                    };
                }
                return friendAndRequest;
            }
        );
        return newFriendsAndRequests;
    } else if (action.type == "friendsAndRequests/rejectOrCancel") {
        const newFriendsAndRequests = friendsAndRequests.filter(
            (friendAndRequest) => friendAndRequest.id !== action.payload.id
        );
        return newFriendsAndRequests;
    }
    return friendsAndRequests;
}

export function acceptFriendRequest(id) {
    return {
        type: "friendsAndRequests/acceptRequest",
        payload: { id },
    };
}

export function rejectRequestOrEndFriendship(id) {
    return {
        type: "friendsAndRequests/rejectOrCancel",
        payload: { id },
    };
}

export function receiveFriendsAndRequests(friendsAndRequests) {
    return {
        type: "friendsAndRequests/received",
        payload: { friendsAndRequests },
    };
}
