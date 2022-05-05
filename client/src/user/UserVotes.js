import useAxios from "../components/useAxios";
import PollReview from "../poll/PollReview";
import { useState } from "react";

const UserVotes = () => {
    const { response: polls, error, loading } = useAxios({url: "/api/user/votes"});
    const [visible, setVisible] = useState({});

    const handleShow = id => {
        setVisible({...visible, [id]: true});
    }

    if (loading) {
        return (
            <div>
                <h4>Loading...</h4>
            </div>
        )
    }

    return (
        <div className="profile">
            <h2>Active Polls</h2>
            {polls.map(poll => {
                return(
                    <div className="poll_menu" key={poll["poll_id"]} >
                        {poll["visible"] === 1 ? (
                            <div>
                                <h4>{poll["title"]}</h4>
                                <p>sent_at: {poll["sent_at"]}</p>
                                <button onClick={() => handleShow(poll["poll_id"])}>Review</button>
                                {visible[poll["poll_id"]] && <PollReview poll={poll} visible={visible} setVisible={setVisible}/>}
                            </div>): null}
                    </div>
                )}
            )}
            <h2>Closed Polls</h2>
            {polls.map(poll => {
                return(
                    <div className="poll_menu" key={poll["poll_id"]} >
                        {poll["visible"] === 0 ? (
                            <div>
                                <h4>{poll["title"]}</h4>
                                <p>sent_at: {poll["sent_at"]}</p>
                                <button onClick={() => handleShow(poll["poll_id"])}>Review</button>
                                {visible[poll["poll_id"]] && <PollReview poll={poll} visible={visible} setVisible={setVisible}/>}
                            </div>): null}
                    </div>
                )}
            )}
        </div>
    )
}

export default UserVotes;