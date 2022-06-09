import {useState,useCallback} from 'react';
import {useDispatch} from "react-redux";
import {loginSuccess} from "../redux/userSlice";

export const useHttp = () => {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [success,setSuccess] = useState(null);
    const dispatch = useDispatch();

    const login = (u) => {
        dispatch(loginSuccess(u));
    };

    const request = useCallback(async (url,method = 'GET', body = null, status, headers = {}) => {
        setLoading(true);
        clearError();
        clearMsg();
        if(status === 'login'){
            try {
                if(body) {
                    body = JSON.stringify(body);
                    headers['Content-Type'] = 'application/json';
                }
                const response = await fetch(url, {method,body,headers});
                const data = await response.json();
                if(!response.ok){
                    setError(data.message);
                    setSuccess('');
                }
                else {
                    setSuccess('logged');
                    if(data.firstName === null){
                        login(data);
                        window.location.href = "http://localhost:3001/profile"
                    }
                }
                setLoading(false);
                return data;
            }
            catch (e){
                setLoading(false);
                if(e.message === "Unexpected end of JSON input") {
                    setError("");
                    setSuccess("Registered Successfully! \nPlease check the email for verifying!");
                }
                else{
                    setSuccess("");
                    setError(e.message);
                }
            }
        }
        else{
            try {
                if(body) {
                    body = JSON.stringify(body);
                    headers['Content-Type'] = 'application/json';
                }
                const response = await fetch(url, {method,body,headers});
                const data = await response.json();

                if(!response.ok) {
                    setError(data.message);
                    setSuccess("");
                }
                else {
                    if(data.message === "User with this email is exists"){
                        setError(data.message);
                        setSuccess("");
                    }
                    else {
                        setError("");
                        setSuccess("Registered Successfully! \nPlease check the email for verifying!");
                    }
                }

                setLoading(false);
                return data;
            } catch (e) {
                setLoading(false);
                if(e.message === "Unexpected end of JSON input") {
                    setError("");
                    setSuccess("Registered Successfully! \nPlease check the email for verifying!");
                }
                else{
                    setSuccess("");
                    setError(e.message);
                }
            }
        }
    },[]);

    const clearError = useCallback(() => setError(null),[]);
    const clearMsg = useCallback(() => setSuccess(null),[]);
    return {loading, request, error, clearError, success, clearMsg};
}