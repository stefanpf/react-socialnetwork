import { Component } from "react";

export default class Uploader extends Component {
    constructor({ userId, addImageUrlFunc, toggleUploaderFunc }) {
        super();
        this.addImageUrlFunc = addImageUrlFunc;
        this.toggleUploaderFunc = toggleUploaderFunc;
        this.state = { userId };
        this.selectFile = this.selectFile.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    selectFile(e) {
        this.setState({ file: e.target.files[0] });
    }

    uploadImage(e) {
        e.preventDefault();
        const fd = new FormData();
        fd.append("file", this.state.file);
        fetch(`/user/upload/${this.state.userId}`, {
            method: "POST",
            body: fd,
        })
            .then((res) => res.json())
            .then((data) => {
                this.addImageUrlFunc(data.imageUrl);
                this.toggleUploaderFunc();
            })
            .catch((err) => {
                console.log("Error in uploadImage:", err);
            });
    }

    render() {
        return (
            <>
                <div
                    onClick={() => this.toggleUploaderFunc()}
                    className="overlay"
                ></div>
                <div className="image-modal">
                    <div className="image-modal-content">
                        <form className="upload-form">
                            <input
                                onChange={this.selectFile}
                                type="file"
                                name="file"
                                accept="image/*"
                                required
                            />
                            <button type="submit" onClick={this.uploadImage}>
                                Upload Image
                            </button>
                        </form>
                        <button
                            onClick={() => this.toggleUploaderFunc()}
                            className="close-modal-button"
                        >
                            X
                        </button>
                    </div>
                </div>
            </>
        );
    }
}
