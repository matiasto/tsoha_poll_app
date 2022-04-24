import useAxios from "./useAxios";
import axios from "axios";
import UserPollDetails from "./UserPollDetails";

const UserPolls = () => {

    const { response: polls, error, loading } = useAxios({url: "/api/user/polls"});

    const getCookie = name => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const handleDeactivate = (e, id) => {
        e.preventDefault();
        const config = {
            method: "delete",
            url: `/api/poll/${id}`,
            credentials: 'same-origin',
            headers: {
              "X-CSRF-TOKEN": getCookie("csrf_access_token")
            }
        };
        axios(config)
        .then(response => {
            window.location.reload(false);
        })
        .catch(error => {
            console.log(error);
        })
    };

    const handleReactivate = (e, id) => {
        e.preventDefault();
        const config = {
            method: "post",
            url: `/api/poll/reactivate/${id}`,
            credentials: 'same-origin',
            headers: {
              "X-CSRF-TOKEN": getCookie("csrf_access_token")
            }
        };
        axios(config)
        .then(response => {
            window.location.reload(false);
        })
        .catch(error => {
            console.log(error);
        })
    };

    if (loading) {
        return (
            <div>
                <h4>Loading...</h4>
            </div>
        )
    }

    return (
        <div className="profile">
            <h2>My active polls</h2>
            {polls.map(poll => {
                return(
                    <div className="poll_menu" key={poll["poll_id"]} >
                        {poll["visible"] === 1 ? (
                            <div>
                                <h4>{poll["title"]}</h4>
                                <p>{poll["description"]}</p>
                                <p>Created_at: {poll["created_at"]}</p>
                                <UserPollDetails poll={poll} />
                                <button className="deactivate_btn" onClick={e => handleDeactivate(e, poll["poll_id"])}>Deactivate</button>
                            </div>): null}
                    </div>
                )}
            )}
            <h2>My inactive polls</h2>
            {polls.map(poll => {
                return(
                    <div className="poll_menu" key={poll["poll_id"]} >
                        {poll["visible"] === 0 ? (
                            <div>
                                <h4>{poll["title"]}</h4>
                                <p>{poll["description"]}</p>
                                <p>Created_at: {poll["created_at"]}</p>
                                <UserPollDetails poll={poll} />
                                <button className="reactivate_btn" onClick={e => handleReactivate(e, poll["poll_id"])}>Reactivate</button>
                            </div>) : null}
                    </div>
                )}
            )}
        </div>
    )
}

export default UserPolls;