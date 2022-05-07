import { useState, useEffect } from 'react';
import axios from 'axios';

// axios.defaults.baseURL = "http://127.0.0.1:5000"; dev settings

const useAxios = axiosParams => {
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [shouldRefetch, refetch] = useState({});

    const getCookie = name => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    useEffect(() => {
        const abortCont = new AbortController();
        axiosParams.signal = abortCont.signal;
        axiosParams.credentials =  "same-origin";
        axiosParams.headers = {
            "X-CSRF-TOKEN": getCookie("csrf_access_token")
        };
        axios(axiosParams)
        .then(response => {
            setResponse(JSON.parse(response.data));
            setError(null);
        })
        .catch(error => {
            if (error.name === "AbortError") {
                console.log("fetch aborted");
            } else {
                setError(error.message);
            }
        })
        .finally(() => {
            setLoading(false);
        })
        return () => abortCont.abort();
    }, [axiosParams.url, shouldRefetch])
    return { response, error, loading, refetch};
}

export default useAxios;
    