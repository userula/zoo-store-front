import {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {loginSuccess} from "../redux/userSlice";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const dispatch = useDispatch();

    const login = (u) => {
        dispatch(loginSuccess(u));
    };

    const request = useCallback(async (url, method = 'GET', body = null, status, headers = {}) => {
        setLoading(true);
        clearError();
        clearMsg();
        if (status === 'login') {
            try {
                if (body) {
                    body = JSON.stringify(body);
                    headers['Content-Type'] = 'application/json';
                }
                const response = await fetch(url, {method, body, headers});
                const data = await response.json();
                data['token'] = response.headers.get('authorization');
                if (!response.ok) {
                    setError(data.message);
                    setSuccess('');
                } else {
                    setSuccess('logged');
                    if (data.firstName === null) {
                        login(data);
                        window.location.href = "/profile";
                    }
                    login(data);
                    window.location.href = "/";
                }
                setLoading(false);
                return data;
            } catch (e) {
                setLoading(false);
                if (e.message === "Unexpected end of JSON input") {
                    setError("");
                    setSuccess("Registered Successfully! \nPlease check the email for verifying!");
                } else {
                    setSuccess("");
                    setError(e.message);
                }
            }
        } else {
            try {
                if (body) {
                    body = JSON.stringify(body);
                    headers['Content-Type'] = 'application/json';
                }
                const response = await fetch(url, {method, body, headers});
                const data = await response.json();

                if (!response.ok) {
                    setError(data.message);
                    setSuccess("");
                } else {
                    if (data.message === "User with this email is exists") {
                        setError(data.message);
                        setSuccess("");
                    } else {
                        setError("");
                        setSuccess("Registered Successfully! \nPlease check the email for verifying!");
                    }
                }

                setLoading(false);
                return data;
            } catch (e) {
                setLoading(false);
                if (e.message === "Unexpected end of JSON input") {
                    setError("");
                    setSuccess("Registered Successfully! \nPlease check the email for verifying!");
                } else {
                    setSuccess("");
                    setError(e.message);
                }
            }
        }
    }, []);

    const updateUser = useCallback(async (url, method = 'PUT', body = null, headers = {}) => {
        try {
            if(body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            const resp = await fetch(url, {method, body, headers});
            const data = await resp.json();
            if (!resp.ok) {
                setError(data.message);
                clearMsg();
            } else {
                setSuccess('Changed!!!');
                clearError();
            }
        } catch (e){
            // alert(e.message);
        }
    }, []);

    const send_order = useCallback(async (url, method = 'POST', body = null, headers = {}) => {
        try {
            if(body){
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            const resp = await fetch(url, {method, body, headers});
            return await resp.json();
        }
        catch (e){

        }
    }, []);

    const getOrders = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        try {
            if(body){
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            const resp = await fetch(url, {method, body, headers});
            return await resp[0].json();
        }
        catch (e){

        }
    }, []);

    const clearError = useCallback(() => setError(null), []);
    const clearMsg = useCallback(() => setSuccess(null), []);
    return {updateUser, loading, request, error, clearError, success, clearMsg, send_order, getOrders};
}