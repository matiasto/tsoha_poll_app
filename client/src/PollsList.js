import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PollList = ({polls}) => {
    const navigate = useNavigate();

    const handleDelete = poll_id => {
        const url = `/api/poll/${poll_id}`
        axios.delete(url).then((response) => {
            console.log(response);
            navigate("/");
        }).catch((error) => {
            console.log(error.response);
        })
    }

    return (
        <div className="poll_list">
            {polls.map(poll => {
                return(
                    <div className="poll_menu" key={poll["poll_id"]} >
                        <Link to={`/poll/${poll["poll_id"]}`}>
                            <h3>Title: {poll["title"]}</h3>
                            <p>Description: {poll["description"]}</p>
                            <p>Created_at: {poll["created_at"]}</p>
                            <button onClick={() => handleDelete(poll["poll_id"])}>Delete</button>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default PollList