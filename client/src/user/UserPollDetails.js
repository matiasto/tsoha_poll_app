const UserPollDetails = props => {
    return (
        <div>
            <p>votes: {props.poll["votes"]}</p>
            <p>rating: {props.poll["rating"]}</p>
        </div>
    )
}

export default UserPollDetails;