
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";

axios.defaults.baseURL = "http://127.0.0.1:5000";

const useAxios = (axiosParams) => {
    const [response, setResponse] = useState(undefined);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = async (params) => {
        setLoading(true);
        try {
            const result = await axios.request(params);
            setResponse(JSON.parse(result.data));
        } catch(error) {
            if (error.name === "AbortError") {
                console.log("fetch aborted");
            } else {
                setError(error);
                setResponse(undefined);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        if (axiosParams.url !== ""){
            const abort = new AbortController();
            axiosParams.signal = abort.signal;
            if (axiosParams.url !== "/api/login") {
                axiosParams.credentials =  'same-origin';
                axiosParams.headers = {
                      'X-CSRF-TOKEN': Cookies.get('csrf_access_token')
                }
            }
            fetchData(axiosParams);
            return () => abort.abort(); 
        } else {
            setResponse(undefined);
            setError("");
            setLoading(false);
        }
    }, [axiosParams.url, axiosParams.method]);
    return { response, loading, error, fetchData };
};

export default useAxios;