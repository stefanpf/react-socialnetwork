import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUserBio } from "../redux/user_data/slice";

export default function BioEditor() {
    const userData = useSelector((state) => state && state.userData);
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [bioDraft, setBioDraft] = useState();
    const [error, setError] = useState(false);

    function toggleEditMode() {
        setEditMode(!editMode);
    }

    function submit() {
        if (bioDraft != userData.bio) {
            fetch(`/api/user/profile/${userData.userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bioDraft }),
            })
                .then((res) => res.json())
                .then(() => {
                    dispatch(editUserBio(bioDraft));
                    toggleEditMode();
                })
                .catch(() => setError(true));
        } else {
            toggleEditMode();
        }
    }

    return (
        <>
            <div className="bio-editor">
                {error && <h2>Oops, something went wrong</h2>}
                {editMode && (
                    <>
                        <textarea
                            defaultValue={userData.bio}
                            onChange={(e) => setBioDraft(e.target.value)}
                        />
                        <button onClick={submit}>Save</button>
                    </>
                )}
                {!editMode && (
                    <>
                        {userData.bio && (
                            <div className="bio-text">{userData.bio}</div>
                        )}
                        <button
                            onClick={() => {
                                setBioDraft(userData.bio);
                                toggleEditMode();
                            }}
                        >
                            {userData.bio ? "Edit" : "Add"}
                        </button>
                    </>
                )}
            </div>
        </>
    );
}
