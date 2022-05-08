import { useState } from "react";
import axios from "axios";
import useAxios from "../components/useAxios";
import UserPollDetails from "./UserPollDetails";
import UserPollRatings from "./UserPollRatings";


/**
 * Retrieves users polls and renders options buttons to 
 * display detailed data or ratings.
 */
const UserPolls = () => {

    const { response: polls, loading, refetch } = useAxios({ url: "/api/user/polls" });
    const [visible, setVisible] = useState({});
    const [ratingVisible, setRatingVisible] = useState({});

    /**
     * Handles the show/hide action on details element
     * @param {int} id 
     */
    const handleShow = id => {
        if (!(id in visible)) {
            setVisible({ ...visible, [id]: false });
        }
        if (visible[id]) {
            setVisible({ ...visible, [id]: false });
        } else {
            setVisible({ ...visible, [id]: true });
        }
    }

    /**
     * Handles the show/hide on ratings element
     * @param {int} id 
     */
    const handleRatingShow = id => {
        if (!(id in ratingVisible)) {
            setRatingVisible({ ...ratingVisible, [id]: false });
        }
        if (ratingVisible[id]) {
            setRatingVisible({ ...ratingVisible, [id]: false });
        } else {
            setRatingVisible({ ...ratingVisible, [id]: true });
        }
    }

    /**
     * Retrieves cookie for authentication
     * @param {name of the cookie} name 
     * @returns 
     */
    const getCookie = name => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    /**
     * Posts a deactivate request to API and refreshes the page to update.
     * @param {event} e 
     * @param {int} id 
     */
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
                refetch({});
            })
            .catch(error => { })
    };

    /**
     * Posts a reactivate request to API and refreshes the page
     * @param {event} e 
     * @param {int} id 
     */
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
                refetch({});
            })
            .catch(error => { })
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
            <div className="active_polls">
                {polls.map(poll => {
                    return (
                        <div className="active_menu" key={poll["poll_id"]} >
                            {poll["visible"] === 1 ? (
                                <div>
                                    <h3>{poll["title"]}</h3>
                                    <p>{poll["description"]}</p>
                                    <p>Created_at: {poll["created_at"]}</p>
                                    {visible[poll["poll_id"]] && <UserPollDetails poll={poll} />}
                                    {ratingVisible[poll["poll_id"]] && <UserPollRatings poll={poll} />}
                                    <button className="deactivate_btn" onClick={e => handleDeactivate(e, poll["poll_id"])}>Deactivate</button>
                                    <button className="details_btn" onClick={e => handleShow(poll["poll_id"])}>Details</button>
                                    <button className="ratings_btn" onClick={e => handleRatingShow(poll["poll_id"])}>Ratings</button>
                                </div>) : null}
                        </div>
                    )
                }
                )}
            </div>
            <h2>My inactive polls</h2>
            <div className="inactive_polls">
                {polls.map(poll => {
                    return (
                        <div className="inactive_menu" key={poll["poll_id"]} >
                            {poll["visible"] === 0 ? (
                                <div>
                                    <h3>{poll["title"]}</h3>
                                    <p>{poll["description"]}</p>
                                    <p>Created_at: {poll["created_at"]}</p>
                                    {visible[poll["poll_id"]] && <UserPollDetails poll={poll} />}
                                    {ratingVisible[poll["poll_id"]] && <UserPollRatings poll={poll} />}
                                    <button className="reactivate_btn" onClick={e => handleReactivate(e, poll["poll_id"])}>Reactivate</button>
                                    <button className="details_btn" onClick={e => handleShow(poll["poll_id"])}>Details</button>
                                    <button className="ratings_btn" onClick={e => handleRatingShow(poll["poll_id"])}>Ratings</button>
                                </div>) : null}
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default UserPolls;