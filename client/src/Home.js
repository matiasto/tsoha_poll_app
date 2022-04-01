import { useEffect, useState } from "react";
import axios from 'axios';
import PollList from "./PollsList";

function Home() {
    const [polls, setPolls] = useState(null);
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/polls")
            .then(response => {
                const data = JSON.parse(response.data)
                setPolls(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <div className="home">
            <h1>Home</h1>
            <h2>All active polls</h2>
            <p>Lorem Ipsum - en muista enempää</p>
            {polls && <PollList polls={polls} />}
        </div>
    );
}

export default Home