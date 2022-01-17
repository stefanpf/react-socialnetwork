import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import useFormSubmit from "../hooks/useFormSubmit";

export default function Registration() {
    const [userInput, handleChange] = useForm();
    const [submit, error] = useFormSubmit("/api/register", userInput);

    return (
        <>
            <h1>Registration</h1>
            {error && <h2>Oops, something went wrong...</h2>}
            <div className="form-container">
                <form>
                    <input
                        type="text"
                        name="first"
                        placeholder="first name"
                        required
                        onChange={handleChange}
                    ></input>
                    <input
                        type="text"
                        name="last"
                        placeholder="last name"
                        required
                        onChange={handleChange}
                    ></input>
                    <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        required
                        onChange={handleChange}
                    ></input>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        required
                        onChange={handleChange}
                    ></input>
                    <button
                        type="submit"
                        className="button-cta"
                        onClick={submit}
                    >
                        Register
                    </button>
                    Already registered?
                    <Link to="/login">Click here to log in!</Link>
                </form>
            </div>
        </>
    );
}
