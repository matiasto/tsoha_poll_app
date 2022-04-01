import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Poll() {
    const { poll_id } = useParams();
    const [meta, setMeta] = useState(null);
    const [credits, setCredits] = useState(0);
    const [questions, setQuestions] = useState(null);
    const [votesArray, setVotesArray] = useState(null);
    const [pending, setPending] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/poll/${poll_id}`)
            .then(response => {
                const data = response.data
                setInitialState(data);
                setPending(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const setInitialState = data => {
        setMeta(data["meta"]);
        setQuestions(data["data"]);
        setCredits(data["meta"]["credits"]);
        const a = Array(data['data'].length).fill(0);
        setVotesArray(a);
    };

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
        return arr;
    };

    const submitAnswer = e => {
        e.preventDefault()
        const url = `api/poll/${poll_id}`
        const data = bindAnswerToQuestionId();
        
        setPending(true);

        axios.post(url, data).then((response) => {
            console.log(response);
            setPending(false);
            navigate("/");
        }).catch((error) => {
            console.log(error.response);
        })
    };

    return (
        <div className="vote">
            { pending ? (<div><h3>Loading...</h3></div>) : (
                <div className="voting_area">
                    <div className="poll_meta">
                        <h2>{meta['title']}</h2>
                        <p>{meta['description']}</p>
                        <p>Total Credits: {meta['credits']}</p>
                    </div>
                    <div className="poll_questions">
                        {questions.map((question, index) => {
                            return (
                                <div className="poll_question" key={index}>
                                    <div className="header">
                                        <h4>{question['header']}</h4>
                                    </div>
                                    <div className="description">
                                        <p>{question['description']}</p>
                                    </div>
                                    <div className="vote_info">
                                        <label className="live_credits">Credits left: {credits}</label>
                                        <label className="votes_given">Assigned Votes: {votesArray[index]}</label>
                                    </div>
                                    <div className="vote_buttons">
                                        {validate(votesArray[index], true) ? (
                                            <button onClick={() => castAVote(index, true)}>+</button>
                                        ) : (<button disabled>Too expensive</button>)}
                                        {validate(votesArray[index], false) ? (
                                            <button onClick={() => castAVote(index, false)}>-</button>
                                        ) : (<button disabled>Too expensive</button>)}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="submission">
                        <div className="submit_answer">
                            { pending ? (
                                <button disabled>Submit</button>
                            ) : (<button onClick={submitAnswer}>Submit</button>)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Poll;