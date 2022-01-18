import { useState } from "react";
import useForm from "../hooks/useForm";

export default function ResetPassword() {
    const [userInput, handleChange] = useForm();
    const [stage, setStage] = useState(1);
    const [error, setError] = useState(false);

    function submit(e) {
        e.preventDefault();
        if (stage === 1) {
            fetch("/api/password/reset/start", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInput),
            })
                .then((data) => data.json())
                .then((data) => {
                    if (data.success) {
                        setStage(2);
                    } else {
                        setError(true);
                    }
                });
        } else if (stage === 2) {
            fetch("/api/password/reset/confirm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInput),
            })
                .then((data) => data.json())
                .then((data) => {
                    if (data.success) {
                        setStage(3);
                    } else {
                        setError(true);
                    }
                });
        }
    }

    function renderStage() {
        if (stage === 1) {
            return (
                <>
                    {error && <h2>Oops, something went wrong...</h2>}
                    <div className="form-container">
                        <form>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                required
                                onChange={handleChange}
                                key="1"
                            ></input>
                            <button
                                type="submit"
                                className="button-cta"
                                onClick={submit}
                            >
                                Reset Password
                            </button>
                        </form>
                    </div>
                </>
            );
        } else if (stage === 2) {
            return (
                <>
                    {error && <h2>Oops, something went wrong...</h2>}
                    <div className="form-container">
                        <form>
                            <input
                                type="text"
                                name="resetCode"
                                placeholder="your reset code"
                                required
                                onChange={handleChange}
                                key="2"
                            ></input>
                            <input
                                type="password"
                                name="password"
                                placeholder="your new password"
                                required
                                onChange={handleChange}
                                key="3"
                            ></input>
                            <button
                                type="submit"
                                className="button-cta"
                                onClick={submit}
                            >
                                Save new password
                            </button>
                        </form>
                    </div>
                </>
            );
        } else if (stage === 3) {
            return (
                <>
                    <div>
                        Yay, new password saved! <a href="/login">Log in now</a>
                    </div>
                </>
            );
        }
    }

    return (
        <>
            <h1>Password Reset</h1>
            {renderStage()}
        </>
    );
}
