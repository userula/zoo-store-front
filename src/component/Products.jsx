import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import ReactLoading from "react-loading";

const Products = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("http://localhost:3000/goods");
            if(componentMounted){
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
            }

            return () => {
                componentMounted = false;
            }
        }
        getProducts();
    }, []);

    const Loading = () => {
        return(
            <>
                <div className="col-md-12 loading">
                    <ReactLoading type={'spinningBubbles'} color="#57419D"
                                  height={467} width={175} className="m-auto pt-lg-5"/>
                    <br/><br/><br/>
                </div>
            </>
        )
    }

    const filterProduct = (cat) => {
        const updateList = data.filter((x)=>x.category_id === cat);
        setFilter(updateList);
    }

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-warning me-2" onClick={()=>setFilter(data)}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct('1')}>Sweets</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct('2')}>Accessories</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct('3')}>Clothes</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct('4')}>Other</button>

                </div>
                {filter.map((product)=>{
                    return (
                        <>
                            <div className="col-md-3 product">

                                <div className="card h-100 text-center p-4 border-0 subproduct" key={product.id}>
                                    <NavLink to={`/products/${product.id}`} className="text-decoration-none">
                                        <img src={product.photo} className="card-img-top" alt={product.name} height="250px"/>
                                        <div className="card-body">
                                            <h5 className="card-title mb-0">{product.name}</h5>
                                            <p className="card-text lead fw-bold text-dark">${product.price}</p>
                                            <p className="card-text">{product.description.substring(0, 100)}...</p>

                                        </div>
                                    </NavLink>
                                    <a href="/addtocart" className="text-white text-decoration-none mt-md-auto">
                                        <button className="addtocart">
                                            Add to cart
                                        </button>
                                    </a>
                                </div>


                            </div>
                        </>
                    );
                })}
            </>
        );
    }
    return (
        <>
            <div className="h-50">
                <h1>Hello</h1>
            </div>

        <img src="/assets/main.png" className="bg-image page mt-xxl-5" alt="Background" height="100%" width="100%"/>
        <div className="hero">
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 mb-5 mt-xxl-5">
                        <h1 className="display-6 fw-bolder text-center">Products</h1>
                        <hr/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading/> : <ShowProducts/>}
                </div>
            </div>
        </div>
        </>
    );
}

export default Products;