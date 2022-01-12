import { Component } from "react";

export default class Uploader extends Component {
    constructor({ addImageUrlFunc, toggleUploaderFunc }) {
        super();
        this.addImageUrlFunc = addImageUrlFunc;
        this.toggleUploaderFunc = toggleUploaderFunc;
        this.state = {};
    }

    render() {
        return (
            <>
                <div
                    onClick={() => this.toggleUploaderFunc()}
                    className="overlay"
                ></div>
                <div className="image-modal">
                    <button
                        onClick={() => this.toggleUploaderFunc()}
                        className="close-modal-button"
                    >
                        X
                    </button>
                    <h1 onClick={() => this.addImageUrlFunc("/img/logo.png")}>
                        UPLOADER
                    </h1>
                </div>
            </>
        );
    }
}
