import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import {useSelector} from "react-redux";
import '../App.css';
import {api_link} from "../index";
import {useHttp} from "../hooks/http.hook";

const Orders = () => {
    const {getOrders} = useHttp();
    const user = useSelector((state) => state.user.currentUser);
    const [data, setData] = useState({});
    useEffect(()=> {
        // getOrd().then(r => )
    });
    const getOrd = async () => {
        let resp = await getOrders(`${api_link}/order`, 'GET', null, {"Authorization": "Bearer " + user.token})

    }


    return (
        <>
            <div className="full mainpage showPage row w-50 m-auto mt-lg-5 mb-lg-5">
                <div className="m-auto w-100 p-5">
                    <Table responsive="sm">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Order</th>
                            <th>Total</th>
                            <th>Date of Payment</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr>
                            <td>1</td>
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