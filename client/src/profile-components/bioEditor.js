import { useState, useEffect } from "react";

export default function BioEditor(props) {
    const { userId, bio, updateBioFunc } = props;
    const [editMode, setEditMode] = useState(false);
    const [bioDraft, setBioDraft] = useState();
    const [postDraft, setPostDraft] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
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
                    setEditMode(false);
                    setPostDraft(false);
                })
                .catch(() => setError(true));
        } else {
            setEditMode(false);
            setPostDraft(false);
        }
    }, [postDraft]);

    return (
        <>
            <div>
                <h1>I am the BioEditor Component</h1>
                {error && <h2>Oops, something went wrong</h2>}
                {editMode && (
                    <>
                        <textarea
                            defaultValue={bio}
                            onChange={(e) => setBioDraft(e.target.value)}
                        />
                        <button onClick={() => setPostDraft(true)}>Save</button>
                    </>
                )}
                {!editMode && (
                    <>
                        {bio && <div>{bio}</div>}
                        <button onClick={() => setEditMode(true)}>
                            {bio ? "Edit" : "Add"}
                        </button>
                    </>
                )}
            </div>
        </>
    );
}
