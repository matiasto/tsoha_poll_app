import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Poll() {
    const { poll_id } = useParams();
    const [meta, setMeta] = useState(null);
    const [credits, setCredits] = useState(0);
    const [questions, setQuestions] = useState(null);
    const [votesArray, setVotesArray] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/api/poll/${poll_id}`)
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
        setMeta(data["meta"]["0"]);
        setQuestions(data["data"]);
        setCredits(meta["credits"]);
    };

    return (
        <div className="vote">
            { pending ? (<div>Loading...</div>) : (
                // {/* <p>{credits}</p>
                // <p>{questions}</p> */}
                <div>
                <label>Title: {meta['title']}</label>
                <label>Description: {meta['description']}</label>
                <label>Credits: {credits}</label>
                {questions.map(question => {
                    return(
                        <div className="poll_menu" key={question["question_id"]} >
                            <h3>Title: {question["header"]}</h3>
                            <p>Description: {question["description"]}</p>
                        </div>
                    );
                })}
                </div>
                )}
        </div>
    );
}

export default Poll;