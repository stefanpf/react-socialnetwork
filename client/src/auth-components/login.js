import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import useFormSubmit from "../hooks/useFormSubmit";
import Logo from "../global-components/logo";

export default function Login() {
    const [userInput, handleChange] = useForm();
    const [submit, error] = useFormSubmit("/api/login", userInput);

    return (
        <>
            <h1>Login</h1>
            {error && <h2>Oops, something went wrong...</h2>}
            <Logo />
            <div className="form-container">
                <form>
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
                        Login
                    </button>
                </form>
                Don&apos;t have an account yet?
                <Link to="/">Click here to register!</Link>
                <Link to="/password/reset">Forgot your password?</Link>
            </div>
        </>
    );
}
