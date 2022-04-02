import { useEffect, useState } from "react";
import axios from 'axios';
import PollList from "./PollsList";

function Home() {
    const [polls, setPolls] = useState(null);
    useEffect(() => {
        axios.get("/api/polls")
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
            <div className="header">
                <h1>Welcome to Tsoha Poll App</h1>
            </div>
            <div className="grid-container">
                <div className="grid-item">
                    <h2>Active polls:</h2>
                    {polls && <PollList polls={polls} />}
                </div>
                <div className="grid-item">
                    <h5>General info</h5>
                    <p>
                        This is a poll app based on quadratic voting. A few things to know. From the top you can find the navigation bar.
                        There you'll find your way back here and a link to create poll where you'll be able to create your own poll for everyone.
                    </p>
                    <h5>Quadratic voting</h5>
                    <p>
                        A normal poll might ask you whether you agree or disagree with a set of issues, 
                        quadratic voting gives Voters a budget of “voice credits”, which they can spend to agree or disagree with each issue. 
                        Voters can cast multiple votes in favour of or opposed to each issue, but each vote costs more than the last in terms of credits.
                    </p>
                    <p>
                        In a quadratic poll, you are given a pool of credits to spend. These credits can buy you votes and the first vote costs one credit.
                        Like the name suggest the addtional votes cost more in credits than the last one, two votes cost 2^2 = 4 credits, three votes 3^2 = 9, the cost goes up quadratically.
                    </p>
                    <h5>How the app works</h5>
                    <p>
                        Create poll takes main title(required), which should be a general title for your poll, for example "SOTE", it is also the one that appears in the active polls section.
                        Description(not required) for the poll, also shown in the active poll section. Credits(important) 1 - 250, recomended amount of credits for 10 statement poll is 100 credits.
                        The statements(atleast one is required), the statement it self only requires the statement header which should be in form of "Should governments impose a carbon tax to limit warming to 2°C?".
                        And finally the statement description(not required) aditional definition if needed. Add statement adds the statement to staging and once you're satisfied, click create poll.
                    </p>
                    <p>
                        As an early version, voting can be a little tricky. You vote by clicking either agree or disagree, you'll see your current credit balance,
                        as well as allocated votes, note that negative number is same as disagree and positive agree. You can take back allocated votes by pressing the opposite
                        button, to further ilustrate, let's say you've given 5 votes to something you agree with. Later on, you come across a statement that you really want to,
                        agree with. In this case, you can go back to (for example) the statement you agreed with 5 votes and press disagree, now you agree "less" with that statement 
                        but in return you've accuired more credits to allocate to other statements.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home