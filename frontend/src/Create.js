import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const defaultMeta = {
    poll_title: "",
    poll_description: "",
    credits_per_voter: 1
};

const defaultQuestion = {
    header: "",
    description: ""
};

function CreatePoll() {
    const [meta, setMeta] = useState(defaultMeta);
    const [current, setCurrent] = useState(defaultQuestion);
    const [poll, setPoll] = useState([]);
    const [pending, setPending] = useState(false);
    const navigate = useNavigate();

    const setMetaData = (field, value) => {
        setMeta({
            ...meta,
            [field]: value
        });
    };

    const pushQuestionToPoll = (field, value) => {
        setPoll(
            oldPoll => [...oldPoll, current]
        );
        setCurrent(
            defaultQuestion
        );
    };

    const deleteQuestionFromPoll = index => {
        setPoll(
            poll.filter((_, i) => i !== index)
        );
    };

    const updateCurrent = (field, value) => {
        setCurrent({
            ...current,
            [field]: value
        });
    };

    const editQuestion = index => {
        setCurrent(
            poll[index]
        );
        deleteQuestionFromPoll(
            index
        );
    };

    const submitPoll = (e) => {
        e.preventDefault()
        const thePoll = { meta, poll };

        setPending(true);

        axios({
            method: "POST",
            url: 'http://127.0.0.1:5000/poll/create',
            data: {
                body: thePoll
            }
        }).then((response) => {
            console.log(response);
            setPending(false);
            navigate("/");
        }).catch((error) => {
            console.log(error.response);
        })
    };
   

    return (
        <div className="create_poll">
            <h1>Create a New Poll</h1>
            <div className="meta">
                <div className="poll_title">
                    <h4>Poll Title</h4>
                    <input
                        type="text"
                        id="poll_title"
                        placeholder="Enter poll title"
                        value={meta.poll_title}
                        onChange={e => setMetaData("poll_title", e.target.value)}
                    />
                </div>
                <div className="poll_description">
                    <h4>Description</h4>
                    <input
                        type="text"
                        id="poll_description"
                        placeholder="Enter a short description"
                        value={meta.poll_description}
                        maxLength="300"
                        onChange={e => setMetaData("poll_description", e.target.value)}
                    />
                </div>
                <div className="credits_per_voter">
                    <h4>Credits Per Voter (1 - 250)</h4>
                    <input
                        type="number"
                        id="creadits_per_voter"
                        placeholder="Enter number between 1 - 250"
                        value={meta.credits_per_voter}
                        min="1"
                        max="250"
                        onChange={e => setMetaData("credits_per_voter", e.target.value)}
                    />
                </div>
            </div>
            <div className="questions">
                <h2>Questions</h2>
                <div className="questions_submission">
                    {poll.map((element, index) => {
                        return (
                            <div className="create_and_modify_questions">
                                <div className="questions_list">
                                    <h4>{element.header}</h4>
                                    <p>{element.description}</p>
                                </div>
                                <div className="buttons">
                                    <button className="action_buttons" onClick={() => editQuestion(index)}>Edit</button>
                                    <button className="action_buttons" onClick={() => deleteQuestionFromPoll(index)}>Delete</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="add_questions">
                    <h4>Add Question</h4>
                    <div className="add_question_header">
                        <input
                            type="text"
                            placeholder="Question header"
                            value={current.header}
                            onChange={e => updateCurrent("header", e.target.value)}
                        />
                    </div>
                    <div className="add_question_description">
                        <input
                            type="text"
                            placeholder="Description"
                            value={current.description}
                            onChange={e => updateCurrent("description", e.target.value)}
                        />
                    </div>
                    {current.header !== "" ? (
                        <button onClick={pushQuestionToPoll}>Add Question</button>
                    ) : (
                        <button disabled>Enter header</button>
                    )}
                </div>
                <div className="submit_poll">
                    {poll.length > 0 ? (
                        pending ? (<button disabled>Submitting...</button>) : (<button onClick={submitPoll}>Create poll</button>)
                    ) : (
                        <button disabled>Add one before submitting</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreatePoll;