import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
        };
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.setBioDraft = this.setBioDraft.bind(this);
        this.renderEditor = this.renderEditor.bind(this);
        this.updateBio = this.updateBio.bind(this);
    }

    toggleEditMode() {
        this.setState({ editMode: !this.state.editMode });
    }

    setBioDraft({ target }) {
        this.setState({
            bioDraft: target.value,
        });
    }

    updateBio() {
        if (this.state.bioDraft) {
            fetch(`/user/profile/${this.props.userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.state),
            })
                .then((res) => res.json())
                .then(() => {
                    this.props.updateBioFunc(this.state.bioDraft);
                    this.toggleEditMode();
                })
                .catch(() => this.setState({ error: true }));
        } else {
            this.toggleEditMode();
        }
    }

    renderEditor() {
        if (this.state.editMode) {
            return (
                <>
                    <textarea
                        defaultValue={this.props.bio}
                        onChange={this.setBioDraft}
                    />
                    <button onClick={this.updateBio}>Save</button>
                </>
            );
        } else {
            return (
                <>
                    {this.props.bio && <div>{this.props.bio}</div>}
                    <button onClick={this.toggleEditMode}>
                        {this.props.bio ? "edit" : "add"}
                    </button>
                </>
            );
        }
    }

    render() {
        return (
            <>
                <h1>I am the BioEditor Component</h1>
                {this.state.error && <h2>Oops, something went wrong</h2>}
                {this.renderEditor()}
            </>
        );
    }
}
