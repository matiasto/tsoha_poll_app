import { Link } from "react-router-dom";

const PollList = ({ polls }) => {

    if (!polls.length) {
        return (
            <div>
                <h4>No available polls</h4>
                <p>You've voted on all of them or none are active.</p> 
                <p>In the mean time you can create your own poll for everyone else or review polls you've voted for in the profile page - my votes tab.</p> 
            </div>
        )
    }
    return (
        <div>
            {polls.map(poll => {
                return (
                    <div className="poll_menu" key={poll["poll_id"]} >
                        <h2>{poll["title"]}</h2>
                        <p>{poll["description"]}</p>
                        <p>Created_at: {poll["created_at"]}</p>
                        <p>Created_by: {poll["created_by"]}</p>
                        <p>votes: {poll["votes"]}</p>
                        <p>rating: {poll["rating"]}</p>
                        <Link className="react-link" to={`/poll/${poll["poll_id"]}`} state={{ meta: poll }}>
                            <button>Vote</button>
                        </Link>
                    </div>
                )
            })}
        </div>
    );
}

export default PollList;