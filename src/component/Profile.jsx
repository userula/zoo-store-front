import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import '../App.css';


const Profile = () => {
    const user = useSelector((state) => state.user.currentUser);
    const em = user.email;
    return (
        <>
            <div className="full mainpage showPage row w-50 m-auto mt-lg-5 mb-lg-5">
                <div className="m-auto w-75">
                    <Form>
                        <Row className="mb-3">
                            <h4><i className="fa fa-user fa-2x"></i> {em}</h4>
                            <Form.Group as={Col} controlId="formGridFname">
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" placeholder="First name"
                                              className="inp"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" className="inp"/>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St" className="inp"/>
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCountry">
                                <Form.Label>Country</Form.Label>
                                <Form.Control className="inp" placeholder="Country"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control className="inp" placeholder="City"/>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} controlId="formGridPhone" className='col-md-6'>
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control className="inp" placeholder=""/>
                            </Form.Group>
                        </Row>
                        <br/>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Profile;