import { Link } from "react-router-dom";

const PollList = ({polls}) => {
    return (
        <div className="poll_list">
            {polls.map(poll => {
                return(
                    <div className="poll_menu" key={poll["poll_id"]} >
                        <Link to={`/poll/${poll["poll_id"]}`}>
                            <h3>Title: {poll["title"]}</h3>
                            <p>Description: {poll["description"]}</p>
                            <p>Created_at: {poll["created_at"]}</p>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default PollList