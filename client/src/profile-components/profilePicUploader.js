import { useState } from "react";

export default function Uploader(props) {
    const { userId, addImageUrlFunc, toggleUploaderFunc } = props;
    const [spinnerIsVisible, setSpinnerIsVisible] = useState(false);
    const [file, setFile] = useState();
    const [error, setError] = useState(false);

    function toggleSpinnerVisibility() {
        setSpinnerIsVisible(!spinnerIsVisible);
    }

    function selectFile(e) {
        setFile(e.target.files[0]);
    }

    function uploadImage(e) {
        e.preventDefault();
        toggleSpinnerVisibility();
        const fd = new FormData();
        fd.append("file", file);
        fetch(`/api/user/upload/${userId}`, {
            method: "POST",
            body: fd,
        })
            .then((res) => res.json())
            .then((data) => {
                addImageUrlFunc(data.imageUrl);
                toggleSpinnerVisibility();
                toggleUploaderFunc();
            })
            .catch(() => {
                setError(true);
            });
    }

    return (
        <>
            <div onClick={toggleUploaderFunc} className="overlay"></div>
            <div className="image-modal">
                <div className="image-modal-content">
                    <form className="upload-form">
                        <input
                            onChange={selectFile}
                            type="file"
                            name="file"
                            accept="image/*"
                            required
                        />
                        {spinnerIsVisible && (
                            <img
                                src="/img/spinner.gif"
                                alt="Upload in progress..."
                                className="spinner-animated"
                            />
                        )}
                        <button type="submit" onClick={uploadImage}>
                            Upload Image
                        </button>
                    </form>
                    {error && <h3>Oops, something went wrong...</h3>}
                    <button
                        onClick={toggleUploaderFunc}
                        className="close-modal-button"
                    >
                        X
                    </button>
                </div>
            </div>
        </>
    );
}
