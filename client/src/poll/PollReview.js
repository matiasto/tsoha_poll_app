import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';

const PollReview = props => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const handleRating = rate => {
        setRating(rate / 20)
    }

    const getCookie = name => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

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
            const result = await axios(config);
            props.setVisible({ ...props.visible, [props.poll["poll_id"]]: false })
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
            <button onClick={e => submitRating(e)}>Rate</button>
        </div>
    )
}

export default PollReview;