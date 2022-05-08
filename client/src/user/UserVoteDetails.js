import useAxios from "../components/useAxios";

/**
 * retrieves and displays details about the poll
 * @param {poll meta data in object format} props
 */
const UserVoteDetails = props => {

    const meta = props.poll;
    const { response: details, loading } = useAxios({ url: `/api/user/details/${meta["poll_id"]}` })

    return (
        <div className="vote_details">
            {loading ? (<div>Loading...</div>) : (
                <div className="vdetails_area">
                    <h2>Details</h2>
                    <div className="detailed_stats">
                        <label>Total votes: {meta["votes"]}</label>
                        <label>Overall rating: {meta["rating"]}</label>
                    </div>
                    <div className="detail_statements">
                        {details.map((detail, index) => {
                            return (
                                <div className="detail" key={index}>
                                    <h4>{detail["header"]}</h4>
                                    <p>{detail["description"]}</p>
                                    <p>My vote: {detail["vote"]}</p>
                                    <label className="avg_votes">Average Votes: {detail["average"]}</label>
                                    <label className="median_votes">Median Votes: {detail["median"]}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}


export default UserVoteDetails;