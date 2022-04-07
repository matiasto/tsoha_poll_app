import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/">Home</Link>
            <Link to="create">Create a Poll</Link>
        </nav>
    );
}

export default Navigation;