import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <>
            <Link to="/">
                <img src="/img/logo.png" className="logo-image" alt="logo" />
            </Link>
        </>
    );
}
