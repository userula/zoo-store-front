import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import ReactLoading from "react-loading";


const Product = () => {

    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/goods/${id}`);
            setProduct(await response.json());
            setLoading(false);

        }
        getProduct();
    }, []);

    const Loading = () => {
        return (
            <>
                <div className="col-md-12 loading">
                    <ReactLoading type={'spinningBubbles'} color="#57419D"
                                  height={467} width={175} className="m-auto pt-lg-5"/>
                </div>
            </>
        )
    }

    const ShowProduct = () => {
        return (
            <>
                <div className="col-md-6 mt-xxl-5">
                    <img src={product.photo} alt={product.name} height="400px" width="400px" className="card-img-top"/>
                </div>
                <div className="col-md-6 mt-xxl-5 h-50">
                    <h4 className="text-uppercase text-black-50">{product.category_id}</h4>
                    <h1 className="lead display-5">{product.name}</h1>
                    <p className="lead">{product.description}</p>
                    <div className="mt-100 justify-content-end text-lg-center">
                        <button className="btn btn-outline-primary">Add to cart</button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div>
            <div className="h-100">
                <h1>Hello</h1>
            </div>
            <br/><br/>
            <div className="container mt-xxl-5 min-vh-100 showPage">
                <div className="row">
                    {loading ? <Loading/> : <ShowProduct/>}

                </div>

            </div>
            <br/><br/>
        </div>
    );
}

export default Product;