
import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:5000";

const useAxios = (axiosParams) => {
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async (params) => {
        try {
            const result = await axios.request(params);
            console.log(result)
            setResponse(JSON.parse(result.data))
        } catch(error) {
            if (error.name === "AbortError") {
                console.log("fetch aborted");
            } else {
                setError(error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const abort = new AbortController();
        axiosParams.signal = abort.signal;
        fetchData(axiosParams);
        return () => abort.abort();  
    }, [axiosParams.url]);

    return { response, loading, error };
};

export default useAxios;