import { useState } from "react";
import useAxios from "../components/useAxios";
import PollReview from "../poll/PollReview";
import UserVoteDetails from "./UserVoteDetails";

const UserVotes = () => {
    const { response: polls, loading } = useAxios({ url: "/api/user/votes" });
    const [visibleRatings, setVisibleRating] = useState({});
    const [visibleDetails, setVisibleDetails] = useState({});

    const handleShowRating = id => {
        if (!(id in visibleRatings)) {
            setVisibleRating({ ...visibleRatings, [id]: false });
        }
        if (visibleRatings[id]) {
            setVisibleRating({ ...visibleRatings, [id]: false });
        } else {
            setVisibleRating({ ...visibleRatings, [id]: true });
        }
    }

    const handleShowDetails = id => {
        if (!(id in visibleDetails)) {
            setVisibleDetails({ ...visibleDetails, [id]: false });
        }
        if (visibleDetails[id]) {
            setVisibleDetails({ ...visibleDetails, [id]: false });
        } else {
            setVisibleDetails({ ...visibleDetails, [id]: true });
        }
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
            <div className="active_polls">
                {polls.map(poll => {
                    return (
                        <div className="active_menu" key={poll["poll_id"]} >
                            {poll["visible"] === 1 ? (
                                <div className="active_meta">
                                    <h3>{poll["title"]}</h3>
                                    <p>sent_at: {poll["sent_at"]}</p>
                                    {visibleDetails[poll["poll_id"]] && <UserVoteDetails poll={poll} />}
                                    {visibleRatings[poll["poll_id"]] && <PollReview poll={poll} visible={visibleRatings} setRatingVisible={setVisibleRating} />}
                                    {poll["existing_rating"] === 1 ? (
                                        <button disabled>Existing ratings</button>
                                    ) : (
                                        <button onClick={() => handleShowRating(poll["poll_id"])}>Rate</button>
                                    )}
                                    <button onClick={() => handleShowDetails(poll["poll_id"])}>Details</button>
                                </div>) : null}
                        </div>
                    )
                }
                )}
            </div>
            <h2>Closed Polls</h2>
            <div className="inactive_polls">
                {polls.map(poll => {
                    return (
                        <div className="inactive_menu" key={poll["poll_id"]} >
                            {poll["visible"] === 0 ? (
                                <div className="inactive_meta">
                                    <h3>{poll["title"]}</h3>
                                    <p>sent_at: {poll["sent_at"]}</p>
                                    {visibleDetails[poll["poll_id"]] && <UserVoteDetails poll={poll} />}
                                    {visibleRatings[poll["poll_id"]] && <PollReview poll={poll} visible={visibleRatings} setVisible={setVisibleRating} />}
                                    {poll["existing_rating"] === 1 ? (
                                        <button disabled>Existing ratings</button>
                                    ) : (
                                        <button onClick={() => handleShowRating(poll["poll_id"])}>Rate</button>
                                    )}
                                    <button onClick={() => handleShowDetails(poll["poll_id"])}>Details</button>
                                </div>) : null}
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default UserVotes;