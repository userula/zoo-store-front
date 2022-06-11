import React, {useEffect, useState} from "react";
import '../../css/login.css';
import $ from 'jquery';
import {api_link, client_id} from "../../index";
import GoogleLogin, {GoogleLogout} from 'react-google-login';
import {loginStart, loginSuccess} from "../../redux/userSlice";
import {useDispatch} from "react-redux";
import {useHttp} from "../../hooks/http.hook";

let readerView = false;


const pass = (data) => {
    if (data === 'o') {
        $('#Oeye').css('display', 'none');
        $('#Ceye').css('display', 'block');
        $('#password').attr('type', 'text');
    } else {
        $('#Oeye').css('display', 'block');
        $('#Ceye').css('display', 'none');
        $('#password').attr('type', 'password');
    }
};

// const [loginData, setLoginData] = useState(
//     localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')) : null
// );

const handleLogin = (response) => {
    console.log(response.tokenId);
    // alert(response.tokenId);
};
const handleFailure = (response) => {
    console.log(response);
    // alert(response.error);
};
const logout = () => {
    alert("success logout");
};

const Login = () => {
    const [er, setEr] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        setEr(error);
        setMsg(success);
    });
    const openG1 = () => {
        if (readerView === true) {
            // $('#group1').css('background-color', 'aliceblue');
            // $('#group2').css('background-color', 'grey');
            $('.signup').slideToggle();
            $('.login').slideToggle();
            readerView = false;
            clearError();
            clearMsg();
        }
    };

    const openG2 = () => {
        if (readerView === false) {
            // $('#group2').css('background-color', 'aliceblue');
            // $('#group1').css('background-color', 'grey');
            $('.signup').slideToggle();
            $('.login').slideToggle();
            readerView = true;
            clearError();
            clearMsg();
        }
    };

    const {loading,error,request,clearError,success,clearMsg} = useHttp();
    const [regForm,setRegForm] = useState({
        email: '', password: '', rePassword: ''
    });
    const [logForm,setLogForm] = useState({
        email: '', password: ''
    });
    const changeLogHandler = e => {
        setLogForm({...logForm, [e.target.name]:e.target.value});
    };
    const changeRegHandler = event => {
        setRegForm({...regForm, [event.target.name]:event.target.value})
    };
    const registerHandler = async () => {
        try {
            await request(`${api_link}/auth/registration`,'POST', {...regForm}, 'register')
        } catch (e) {
            // alert(e);
        }
    };
    const loginHandler = async () => {
        try {
            await request(`${api_link}/auth`,'POST', {...logForm}, 'login')
        } catch (e) {
            // alert(e);
        }
    };

    return (
        <>
            <div className="full">
                {/*<Authorization/>*/}
                <div className="m-auto mt-5 mainpage w-75">
                    <div className="row justify-content-center">

                        <div className="showPage col-sm-6">
                            <br/><br/>
                            <div className="choose flex-row w-50 justify-content-sm-center">
                                <button id="group1" className="text-center m-2" onClick={openG1}>Log In</button>
                                <button id="group2" className="text-center m-2" onClick={openG2}>Sign Up</button>
                            </div>
                            {/*<hr/>*/}
                            <div className="login" id="login">
                                <br/>
                                <div id="h1">
                                    <h1>Welcome back</h1>
                                    <hr/>
                                    <br/>
                                    { loading ? (<p id="loading" className="text-info">Loading...</p>) : ('')}
                                    <p id="errorMsg" className="text-danger">{er}</p>
                                    <p id="successMsg" className="text-success">{msg}</p>
                                    <form>
                                        <input className="loginp" type="email" id="logEmail" placeholder="Email Address"
                                               required autoComplete="on" name="email" onChange={changeLogHandler}/>
                                        <br/>
                                        <input className="loginp" type="password" id="logPass"
                                               placeholder="Password" name="password" onChange={changeLogHandler}/>
                                        <div className="row mt-3">
                                            <div className="col-sm-3">
                                                <label className="switch">
                                                    <input type="checkbox" />
                                                    <span className="slider"></span>
                                                </label>
                                            </div>
                                            <p className="col-sm-6"><strong>Remember me</strong></p>
                                        </div>
                                        <button className="button button-block" type='submit'
                                                id="logbtn"
                                                disabled={loading}
                                                onClick={loginHandler}>Log In
                                        </button>
                                    </form>
                                    <br/>
                                    {/*<a href="https://api-zoo-app.herokuapp.com" target="_blank">*/}
                                    {/*    <button className="btn google btn-outline-danger text-uppercase fw-bold"*/}
                                    {/*            type="submit">*/}
                                    {/*        <i className="fa fa-google me-2" aria-hidden="true"></i> Sign in with Google*/}
                                    {/*    </button>*/}
                                    {/*</a>*/}

                                    <GoogleLogin
                                        clientId={client_id}
                                        buttonText="SIGN IN WITH GOOGLE"
                                        onSuccess={handleLogin}
                                        onFailure={handleFailure}
                                        cookiePolicy={'single_host_origin'}
                                        // redirectUri="/"
                                        disabled={false}
                                    ></GoogleLogin>
                                    {/*<GoogleLogout*/}
                                    {/*    clientId={client_id}*/}
                                    {/*    buttonText="Logout"*/}
                                    {/*    onLogoutSuccess={logout}*/}
                                    {/*    onFailure={handleFailure}*/}
                                    {/*>*/}
                                    {/*</GoogleLogout>*/}
                                </div>
                            </div>


                            <div className="signup" id="signup">
                                <br/>
                                <div id="h1">
                                    <h1>Sign Up for Free</h1>
                                    <hr/>
                                    <form>
                                        <br/>
                                        { loading ? (<p id="loading" className="text-info">Loading...</p>) : ('')}
                                        <p id="errorMsg" className="text-danger">{er}</p>
                                        <p id="successMsg" className="text-success">{msg}</p>
                                        <input className="loginp" type="email" name="email"
                                               id="email" placeholder="Email Address" required onChange={changeRegHandler}/>
                                        <br/>
                                        <div className="regPassword">
                                            <input id="password"
                                                   className="loginp col-md-10"
                                                   type="password"
                                                   name="password"
                                                   placeholder="Password" required onChange={changeRegHandler}/>
                                            <div className="mx-3">
                                                <div id="Oeye" onClick={() => pass("o")}>
                                                    <i className='fa fa-eye fa-lg'></i>
                                                </div>

                                                <div id="Ceye" onClick={() => pass("c")}>
                                                    <i className='fa fa-eye-slash fa-lg'></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <input id="rePassword"
                                                   className="loginp mt-3"
                                                   type="password"
                                                   name="rePassword"
                                                   placeholder="Confirm Password" required onChange={changeRegHandler}/>
                                        </div>
                                        <br/>
                                        <button className="button button-block"
                                                type="submit" id="regbtn"
                                                onClick={registerHandler}
                                                disabled={loading}
                                                >Get
                                            Started
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <br/><br/>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;