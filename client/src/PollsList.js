import { Link } from "react-router-dom";
import axios from "axios";

const PollList = ({polls}) => {
    const handleDelete = poll_id => {
        const url = `/api/poll/${poll_id}`
        axios.delete(url).then((response) => {
            console.log(response);
            window.location.reload(false);
        }).catch((error) => {
            console.log(error.response);
        })
    }

    return (
        <div className="poll_list">
            {polls.map(poll => {
                return(
                    <div className="poll_menu" key={poll["poll_id"]} >                        
                        <h2>{poll["title"]}</h2>
                        <p>{poll["description"]}</p>
                        <p>Created_at: {poll["created_at"]}</p>
                        <button onClick={() => handleDelete(poll["poll_id"])}>Delete</button>
                        <Link className="react-link" to={`/poll/${poll["poll_id"]}`}>
                            <button>Vote</button>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default PollList