import React, {useState, useEffect} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import '../App.css';
import {api_link} from "../index";
import {useHttp} from "../hooks/http.hook";
import alert from "bootstrap/js/src/alert";

const Profile = () => {
    const user = useSelector((state) => state.user.currentUser);
    const em = user.email;
    const {updateUser,loading,error,clearError,success,clearMsg} = useHttp();
    const [form, setForm] = useState({
        email: '', first_name: '', last_name: '', country: '', city: '', address: '', phone_number: ''
    });
    const [er, setEr] = useState('');
    const [msg, setMsg] = useState('');
    useEffect(() => {
        // window.M.updateTextFields();
        setEr(error);
        setMsg(success);
    });
    const save = async () => {
        form['email'] = em;
        try {
            await updateUser(`${api_link}/profile`, 'PUT', {...form}, {"Authorization": "Bearer " + user.token});
        } catch (e) {
            // alert("GG " + e.message);
        }
    };

    const changeHandler = event => {
        setForm({...form, [event.target.id]: event.target.value})
    };

    return (
        <>
            <div className="full mainpage showPage row w-50 m-auto mt-lg-5 mb-lg-5">
                <div className="m-auto w-75">
                    <Form>
                        <Row className="mb-3">
                            <h4><i className="fa fa-user fa-2x"></i> {em}</h4>
                            { loading ? (<p id="loading" className="text-info">Loading...</p>) : ('')}
                            <p id="errorMsg" className="text-danger">{er}</p>
                            <p id="successMsg" className="text-success">{msg}</p>
                            <Form.Group as={Col} controlId="formGridFname">
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" placeholder="First name"
                                              className="inp" id="first_name" onChange={changeHandler} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name"
                                              className="inp" id="last_name" onChange={changeHandler}/>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St" className="inp" id="address"
                                          onChange={changeHandler}/>
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCountry">
                                <Form.Label>Country</Form.Label>
                                <Form.Control className="inp" placeholder="Country" id="country"
                                              onChange={changeHandler}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control className="inp" placeholder="City" id="city" onChange={changeHandler}/>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} controlId="formGridPhone" className='col-md-6'>
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control className="inp" placeholder="" id="phone_number" onChange={changeHandler}/>
                            </Form.Group>
                        </Row>
                        <br/>
                        <Button variant="primary" type="submit" onClick={save}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Profile;