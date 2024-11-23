import React, { useEffect, useState } from "react";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Orders = ()=>{
    const nav = useNavigate();
    const handleGoBack = (e) => {
        e.preventDefault();
        nav('/');
      };




    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        const fetchOrders = async ()=>{
        try{
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`
        const respone = await axios.get('http://localhost:8000/api-samohod/order');
            setOrders(respone.data.content);
        }
        catch(e){
            console.log('error', e);
        }
    }
    fetchOrders();
}, [])


let numberOrder = 1;

    return(
            <div class="container py-3">

                <Header/>
                <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
                    <h1 class="display-4 fw-normal">Ваши заказы</h1>
                </div>
                <main>
                {orders.map(order=>
                    <>
                    <div class="row row-cols-1 row-cols-md-3 mb-3 text-center bg-light">
                        <h2 class="w-100">Заказ №{numberOrder++}</h2>

                      {console.log(order)}
                        {order.products.map(product =>
                        <div class="col">
                        <div class="card mb-4 rounded-3 shadow-sm">
                            <div class="card-header py-3">
                                <h4 class="my-0 fw-normal">{product.product.name}</h4>
                            </div>
                            <div class="card-body">
                                <h1 class="card-title pricing-card-title">{product.product.price}<small class="text-muted fw-light"> &times; {product.order.quantity}</small></h1>
                                <p>{product.product.description}</p>
                            </div>
                        </div>
                        </div>
                        )}


                        <h2 class="w-100">Итоговая стоимость: {order.order_price}р.</h2>
                    </div>



                    </>
                )}
                   

                    <div class="row justify-content-center gap-1">
                        <button class="col-6 btn btn-lg btn-outline-info mb-3" onClick={handleGoBack} type="button">Назад</button>
                    </div>
                </main>

                <footer class="pt-4 my-md-5 pt-md-5 border-top">
                    <div class="row">
                        <div class="col-12 col-md">
                            <small class="d-block mb-3 text-muted">&copy; 2017–2021</small>
                        </div>
                    </div>
                </footer>
            </div>
    )};
export default Orders;