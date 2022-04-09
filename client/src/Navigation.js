import { Link } from "react-router-dom";
import SignOut from "./SignOut";

const Navigation = props => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/">Home</Link>
            <Link to="create">Create a Poll</Link>
            <SignOut setToken={props.setToken} />
        </nav>
    );
}

export default Navigation;