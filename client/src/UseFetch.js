import axios from "axios";
import { useEffect, useState } from "react";

const UseFetch = (url) => {
    const [ data, setData ] = useState(null);
    const [ pending, setPending ] = useState(true);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            axios.get(url)
            .then(response => {
                console.log(response.status);
                if (response.status !== 200) {
                    throw Error("Could not fetch data");
                }
                return JSON.parse(response.data);
            })
            .then(data => {
                console.log(data)
                setPending(false);
                setData(data);
                setError(null);
            })
            .catch(error => {
                setPending(true);
                setError(error.message);
            })
        }, 1000);
    }, [url])
    console.log(data);
    return { data, pending, error };
}

export default UseFetch;