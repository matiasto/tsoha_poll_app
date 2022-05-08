import { useState } from "react";
import UserPolls from "./UserPolls";
import UserVotes from "./UserVotes";

/**
 * Profile front page with link to user votes and user polls
 */
const Profile = () => {
    const [view, setView] = useState(0)
    return (
        <div>
            <h1>My Profile</h1>
            <button onClick={() => setView(0)}>My Polls</button>
            <button onClick={() => setView(1)}>My Votes</button>
            {view === 1 ? <UserVotes /> : <UserPolls />}
        </div>
    )
}

export default Profile;