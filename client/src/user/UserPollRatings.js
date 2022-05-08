import useAxios from "../components/useAxios";

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
                                    <h5>{rating["user"]}</h5>
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