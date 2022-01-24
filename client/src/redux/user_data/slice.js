export function userDataReducer(userData = null, action) {
    if (action.type == "userData/received") {
        userData = action.payload.userData;
    } else if (action.type == "userData/editBio") {
        return { ...userData, bio: action.payload.userBio };
    } else if (action.type == "userData/editImageUrl") {
        return { ...userData, imageUrl: action.payload.imageUrl };
    }
    return userData;
}

export function receiveUserData(userData) {
    return {
        type: "userData/received",
        payload: {
            userData,
        },
    };
}

export function editUserBio(userBio) {
    return {
        type: "userData/editBio",
        payload: {
            userBio,
        },
    };
}

export function editImageUrl(imageUrl) {
    return {
        type: "userData/editImageUrl",
        payload: {
            imageUrl,
        },
    };
}
