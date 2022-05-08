import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';


/**
 * Responsible for poll review
 * @param {poll meta elements} props 
 * @returns 
 */
const PollReview = props => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    /**
     * Handles changes on rating.
     * @param {given rate value} rate 
     */
    const handleRating = rate => {
        setRating(rate / 20)
    }

    /**
     * Gets cookie for authentication
     * @param {name of the cookie} name 
     * @returns 
     */
    const getCookie = name => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    /**
     * Posts rating to API and closes component
     * @param {event} e 
     */
    const submitRating = async (e) => {
        e.preventDefault();
        try {
            const config = {
                method: "post",
                url: `/api/poll/rate/${props.poll["poll_id"]}`,
                data: { rating, comment },
                credentials: 'same-origin',
                headers: {
                    "X-CSRF-TOKEN": getCookie("csrf_access_token")
                }
            };
            await axios(config);
            props.handleShow(props.poll["poll_id"]);
            props.refetch({});
        } catch (error) {
            setMessage(error.response.data.message);
            setShowMessage(true);
        }
    }

    return (
        <div>
            <label>Comment</label>
            <input
                type="textarea"
                value={comment}
                placeholder="Write a comment"
                maxLength="300"
                onChange={e => setComment(e.target.value)}
            />
            <Rating allowHover={false} onClick={handleRating} ratingValue={rating} />
            {showMessage && (<p>{message}</p>)}
            <button onClick={e => submitRating(e)}>Submit</button>
        </div>
    )
}

export default PollReview;