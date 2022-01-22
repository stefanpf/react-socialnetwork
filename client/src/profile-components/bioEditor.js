import { useState } from "react";

export default function BioEditor(props) {
    const { userId, bio, updateBioFunc } = props;
    const [editMode, setEditMode] = useState(false);
    const [bioDraft, setBioDraft] = useState();
    const [error, setError] = useState(false);

    function toggleEditMode() {
        setEditMode(!editMode);
    }

    function submit() {
        if (bioDraft != bio) {
            fetch(`/api/user/profile/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bioDraft }),
            })
                .then((res) => res.json())
                .then(() => {
                    updateBioFunc(bioDraft);
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
                            defaultValue={bio}
                            onChange={(e) => setBioDraft(e.target.value)}
                        />
                        <button onClick={submit}>Save</button>
                    </>
                )}
                {!editMode && (
                    <>
                        {bio && <div className="bio-text">{bio}</div>}
                        <button
                            onClick={() => {
                                setBioDraft(bio);
                                toggleEditMode();
                            }}
                        >
                            {bio ? "Edit" : "Add"}
                        </button>
                    </>
                )}
            </div>
        </>
    );
}
