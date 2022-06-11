import React, {useState} from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import {useSelector} from "react-redux";
import '../App.css';
import {api_link} from "../index";
import {useHttp} from "../hooks/http.hook";

const Orders = () => {

    

    return (
        <>
            <div className="full mainpage showPage row w-50 m-auto mt-lg-5 mb-lg-5">
                <div className="m-auto w-100 p-5">
                    <Table responsive="sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default Orders;