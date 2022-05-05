import { Link } from "react-router-dom";
import SignOut from "../auth/SignOut";

const Navigation = props => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/">Home</Link>
            <Link to="create">Create a Poll</Link>
            <Link to="profile">Profile</Link>
            <SignOut setSignedIn={props.setSignedIn} />
        </nav>
    );
}

export default Navigation;