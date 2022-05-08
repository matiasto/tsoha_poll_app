import useAxios from "../components/useAxios";


/**
 * Retrieves and displays users poll ratings
 * @param {meta data on poll in object format} props 
 */
const UserPollRatings = props => {

    const meta = props.poll;
    const { response: details, loading } = useAxios({ url: `/api/user/ratings/${meta["poll_id"]}` })

    return (
        <div className="ratings">
            {loading ? (<div>Loading...</div>) : (
                <div className="ratings_area">
                    {details.map((rating, index) => {
                        return (
                            <div className="statement" key={index}>
                                <div className="header">
                                    <h3>{rating["user"]}</h3>
                                    <p>{rating["rating"]}</p>
                                    <p>{rating["comment"]}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
}


export default UserPollRatings;