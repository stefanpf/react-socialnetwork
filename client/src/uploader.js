import { Component } from "react";

export default class Uploader extends Component {
    constructor({ addImageUrlFunc }) {
        super();
        this.addImageUrlFunc = addImageUrlFunc;
        this.state = {};
    }

    render() {
        return (
            <h1 onClick={() => this.addImageUrlFunc("/img/logo.png")}>
                UPLOADER
            </h1>
        );
    }
}
