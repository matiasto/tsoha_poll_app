import { useState } from "react";

const defaultMeta = {
    poll_title: "",
    poll_description: "",
    credits_per_voter: 1
};

function CreatePoll() {
    const [meta, setMeta] = useState(defaultMeta);

    const setMetaData = (field, value) => {
        setMeta({
            ...meta,
            [field]: value
        });
    }

    return (
        <div className="create_poll">
            <h1>Create a New Poll</h1>
            <div className="meta">
                <div className="poll_title">
                    <h4>Poll Title</h4>
                    <input
                        type="text"
                        id="poll_title"
                        value={meta.poll_title}
                        onChange={(e) => setMetaData("poll_title", e.target.value)}
                    />
                </div>
                <div className="poll_description">
                    <h4>Description</h4>
                    <input
                        type="text"
                        id="poll_description"
                        value={meta.poll_description}
                        maxLength="300"
                        onChange={(e) => setMetaData("poll_description", e.target.value)}
                    />
                </div>
                <div className="credits_per_voter">
                    <h4>Credits Per Voter</h4>
                    <input
                        type="number"
                        id="creadits_per_voter"
                        value={meta.credits_per_voter}
                        min="1"
                        max="250"
                        onChange={(e) => setMetaData("credits_per_voter", e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default CreatePoll;