import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxios from "../components/useAxios";
import axios from "axios";
import Cookies from "js-cookie";

const Vote = () => {
    const location = useLocation();
    const { meta } = location.state;
    const [credits, setCredits] = useState(meta.credits);
    const [questions, setQuestions] = useState(null);
    const [votesArray, setVotesArray] = useState(null);
    const { response, loading } = useAxios({url: `/api/poll/${meta.poll_id}`});
    const [pending, setPending] = useState(true);
    const [pendingMsg, setPendingMsg] = useState("Loading...");
    const navigate = useNavigate();

    useEffect(() => {
        setPendingMsg("Loading...");
        setPending(true);
        if (!loading) {
            setQuestions(response);
            const a = Array(response.length).fill(0);
            setVotesArray(a);
            setPending(false);
        }
    }, [response, loading]);
        
    const newSum = array => {
        const theNewSum = array.map(n => n ** 2).reduce((i, j) => i + j, 0);
        setCredits(meta['credits'] - theNewSum);
    }

    const castAVote = (index, direction) => {
        const shallowCopy = votesArray;
        direction ? (shallowCopy[index] = shallowCopy[index] + 1)
                  : (shallowCopy[index] = shallowCopy[index] - 1);
        setVotesArray(shallowCopy);
        newSum(shallowCopy);
    };

    const validate = (votes, direction) => {
        if (credits === 0 && votes === 0) {
            return false;
        }
        const increment = direction ? 1 : -1;
        const newVotes = increment + votes;
        const isPossible = credits >= Math.abs(votes ** 2 - newVotes ** 2);
        if (direction) {
            return votes <= 0 ? true : isPossible;
        } else {
            return votes >= 0 ? true : isPossible;
        }
    };

    const bindAnswerToQuestionId = () => {
        let arr = [];
        for (let i = 0; i < questions.length; i++) {
            let obj = {};
            obj.id = questions[i]["question_id"];
            obj.votes = votesArray[i];
            arr.push(obj);
        }
        arr.push({credits: meta.credits})
        return arr;
    };

    const getCookie = name => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const submitAnswer = async (e) => {
        e.preventDefault();
        try {
            setPendingMsg("Submitting...");
            setPending(true);
            const config = {
                method: "post",
                url: `/api/poll/${meta.poll_id}`,
                data: bindAnswerToQuestionId(),
                credentials: 'same-origin',
                headers: {
                  "X-CSRF-TOKEN": getCookie("csrf_access_token")
                }
            };
            const result = await axios(config);
        } catch(error) {
            console.log(error);
        } finally {
            setPending(false);
            navigate("/");
        }
    };

    return (
        <div className="vote">
            { pending ? (<div><h3>{pendingMsg}</h3></div>) : (
                <div className="voting_area">
                    <div className="poll_meta">
                        <h2>{meta['title']}</h2>
                        <p>{meta['description']}</p>
                        <p>Total Credits: {meta['credits']}</p>
                    </div>
                    <div className="poll-questions">
                        {questions.map((question, index) => {
                            return (
                                <div className="question" key={index}>
                                    <div className="header">
                                        <h2>{question['header']}</h2>
                                        <p>{question['description']}</p>
                                    </div>
                                    <div className="vote_info">
                                        <label className="live_credits">Credits left: {credits}</label>
                                        <label className="votes_given">Assigned Votes: {votesArray[index]}</label>
                                    </div>
                                    <div className="vote_buttons">
                                        {validate(votesArray[index], false) ? (
                                            <button className="vote_button" onClick={() => castAVote(index, false)}>Disagree</button>
                                        ) : (<button className="vote_button" disabled>Not enough credits</button>)}
                                        {validate(votesArray[index], true) ? (
                                            <button className="vote_button" onClick={() => castAVote(index, true)}>Agree</button>
                                        ) : (<button className="vote_button" disabled>Not enough credits</button>)}
                                        
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="submission">
                        <div className="submit_answer">
                            { loading ? (
                                <button disabled>Submit</button>
                            ) : (<button onClick={submitAnswer}>Submit</button>)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Vote;