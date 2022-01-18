import { Component } from "react";

export default class Uploader extends Component {
    constructor({ userId, addImageUrlFunc, toggleUploaderFunc }) {
        super();
        this.addImageUrlFunc = addImageUrlFunc;
        this.toggleUploaderFunc = toggleUploaderFunc;
        this.state = { userId, spinnerIsVisible: false };
        this.selectFile = this.selectFile.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.toggleSpinnerVisibility = this.toggleSpinnerVisibility.bind(this);
    }

    selectFile(e) {
        this.setState({ file: e.target.files[0] });
    }

    toggleSpinnerVisibility() {
        this.setState({ spinnerIsVisible: !this.state.spinnerIsVisible });
    }

    uploadImage(e) {
        e.preventDefault();
        this.toggleSpinnerVisibility();
        const fd = new FormData();
        fd.append("file", this.state.file);
        fetch(`/api/user/upload/${this.state.userId}`, {
            method: "POST",
            body: fd,
        })
            .then((res) => res.json())
            .then((data) => {
                this.addImageUrlFunc(data.imageUrl);
                this.toggleSpinnerVisibility();
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
                            {this.state.spinnerIsVisible && (
                                <img
                                    src="/img/spinner.gif"
                                    alt="Upload in progress..."
                                    className="spinner-animated"
                                />
                            )}
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
