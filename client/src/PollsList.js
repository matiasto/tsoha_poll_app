import { Link } from "react-router-dom";

const PollList = ({ polls }) => {

    return (
        <div className="poll_list">
            {polls.map(poll => {
                return(
                    <div className="poll_menu" key={poll["poll_id"]} >                        
                        <h2>{poll["title"]}</h2>
                        <p>{poll["description"]}</p>
                        <p>Created_at: {poll["created_at"]}</p>
                        <Link className="react-link" to={`/poll/${poll["poll_id"]}`} state={{ meta: poll}}>
                            <button>Vote</button>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default PollList