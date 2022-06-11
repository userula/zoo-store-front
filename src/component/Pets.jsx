import React, {useState, useEffect} from "react";
import ReactLoading from 'react-loading';
import {NavLink} from "react-router-dom";
import $ from 'jquery';
import {Button, Modal} from "react-bootstrap";

const Pets = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getPets = async () => {
            setLoading(true);
            const response = await fetch("https://api-zoo-app.herokuapp.com/api/v1/pet");
            // const response = await fetch("http://localhost:3000/pets");
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
            }

            return () => {
                componentMounted = false;
            }
        }
        getPets();
    }, []);

    const Loading = () => {
        return (
            <>
                <div className="col-md-12 loading">
                    <ReactLoading type={'spinningBubbles'} color="#57419D"
                                  height={467} width={175} className="m-auto pt-lg-5"/>
                    <br/><br/><br/>
                </div>
            </>
        )
    }

    const setClass = (grp) => {

    }

    const filterProduct = (grp) => {
        if (grp) {
            let id = $('#btn' + grp).attr('id');
            $('#btn0').addClass('');

            $('#' + id).removeClass('btn-outline-dark').addClass('btn-outline-info');
            // alert(t);
        } else {
            $('.btn-outline-info').removeClass('btn-outline-info').slideToggle();
            $('#btn0').removeClass('btn-outline-dark').addClass('btn-outline-info');
        }
        const updateList = data.filter((x) => x.categoryId === grp);
        setFilter(updateList);
        // setClass(grp);
    }

    const adopt = (p) => {

    }
    const [modalPet, setModalPet] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (p) => {
        setModalPet(p);
        setShow(true);
    }

    const ShowPets = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-3 pb-5">
                    <button className="btn btn-outline-info me-2 col-md-1" id="btn0" onClick={() => setFilter(data)}>All</button>
                    <button className="btn btn-outline-dark me-2 col-md-1" id="btn2" onClick={() => filterProduct(2)}>Cats
                    </button><button className="btn btn-outline-dark me-2 col-md-1" id="btn1" onClick={() => filterProduct(1)}>Dogs
                </button><button className="btn btn-outline-dark me-2 col-md-1" onClick={() => filterProduct(5)}>Birds
                    </button><button className="btn btn-outline-dark me-2 col-md-1" onClick={() => filterProduct(8)}>Fish
                    </button><button className="btn btn-outline-dark me-2 col-md-1" onClick={() => filterProduct(6)}>Rodents
                    </button>

                </div>
                {filter.map((pet) => {
                    return (
                        <>
                            <div className="col-md-3 product">

                                <div className="card h-100 text-center p-4 border-0 subproduct" key={pet.id}>
                                    {/*<NavLink to={`/pets/${pet.id}`} className="text-decoration-none">*/}
                                        <img src={pet.image} className="card-img-top" alt={pet.name} height="250px"/>
                                        <div className="card-body">
                                            <h5 className="card-title mb-0">{pet.breed}</h5>
                                            {/*<h5 className="card-title mb-0">{pet.name}</h5>*/}
                                            <p className="card-text">{pet.gender ? 'male' : 'female'}</p>
                                            {/*<p className="card-text">{pet.gender}</p>*/}
                                            <p className="card-text">{pet.description.substring(0, 100)}...</p>
                                        </div>
                                    {/*</NavLink>*/}
                                    <div className="shownumb mt-md-auto">
                                        <button className="addtocart" type="button" onClick={()=>handleShow(pet)}>
                                            Adopt
                                        </button>
                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>{modalPet.name}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Contacts: <strong>{modalPet.ownerNumber}</strong></Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                                <a href={`https://wa.me/7${modalPet.ownerNumber}`} target="_blank">
                                                    <Button variant="success" onClick={handleClose}>
                                                        WhatsApp
                                                    </Button>
                                                </a>
                                            </Modal.Footer>
                                        </Modal>
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
        <>
            {/*<img src="/assets/backgr.jpg" className="bg-image page mt-xxl-5" alt="Background" height="100%" width="100%"/>*/}
            <div className="hero pets">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12 mb-5">
                            <h1 className="display-6 fw-bolder text-center">Pets</h1>
                            <hr/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {loading ? <Loading/> : <ShowPets/>}
                    </div>
                </div>
            </div>
        </>

    );
}

export default Pets;