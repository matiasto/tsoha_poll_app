import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="create">Create a Poll</Link>
        </nav>
    );
}

export default Navigation;