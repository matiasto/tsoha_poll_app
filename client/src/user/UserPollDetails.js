import useAxios from "../components/useAxios";

const UserPollDetails = props => {

    const meta = props.poll;
    const { response: details, loading } = useAxios({ url: `/api/poll/details/${meta["poll_id"]}` })

    return (
        <div className="poll_details">
            {loading ? (<div>Loading...</div>) : (
                <div className="details_area">
                    <div className="stats_meta">
                        <label>Total votes: {meta["votes"]}</label>
                        <label>Overall rating: {meta["rating"]}</label>
                    </div>
                    <div className="poll-statements">
                        {details.map((detail, index) => {
                            return (
                                <div className="statement" key={index}>
                                    <div className="header">
                                        <h5>{detail["header"]}</h5>
                                        <p>{detail["description"]}</p>
                                        <label className="avg_votes">Average Votes: {detail["average"]}</label>
                                        <label className="median_votes">Median Votes: {detail["median"]}</label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}


export default UserPollDetails;