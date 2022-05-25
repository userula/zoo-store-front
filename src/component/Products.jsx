import React, {useState, useEffect} from "react";
import Skeleton from "react-loading-skeleton";

const Products = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("https://628e40fca339dfef87aab9d6.mockapi.io/api/v1/products/1");
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
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
            </>
        )
    }

    const filterProduct = (cat) => {
        const updateList = data.filter((x)=>x.category === cat);
        setFilter(updateList);
    }

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-warning me-2" onClick={()=>setFilter(data)}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct('sweets')}>Sweets</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct('accessories')}>Accessories</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct('clothes')}>Clothes</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct('other')}>Other</button>

                </div>
                {filter.map((product)=>{
                    return (
                        <>
                            <div className="col-md-3 product">
                                <div className="card h-100 text-center p-4 border-0 subproduct" key={product.id}>
                                    <img src={product.photo} className="card-img-top" alt={product.name} height="250px"/>
                                    <div className="card-body">
                                        <h5 className="card-title mb-0">{product.name}</h5>
                                        <p className="card-text lead fw-bold text-dark">${product.price}</p>
                                        <p className="card-text">{product.description.substring(0, 100)}...</p>
                                        <a href="/addtocart" className="text-white text-decoration-none">
                                            <button className="addtocart">
                                                Add to cart
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })}
            </>
        );
    }
    return (
        <div>
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center">Products</h1>
                        <hr/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading/> : <ShowProducts/>}
                </div>
            </div>
        </div>
    );
}

export default Products;