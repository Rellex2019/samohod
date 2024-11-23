import React, { useEffect, useState } from "react";

import Header from "./header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartAlone from "./cartalone";


const Cart = ()=>{

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const [refresh, setRefresh] =useState(1);


    const [summ, setSumm] = useState([]);
    const [totalSumm, setTotalSumm]= useState(0);
    let count = 0;


    const nav = useNavigate();
    const handleGoBack = (e) => {
        e.preventDefault();
        nav('/');
      };



      useEffect(() => {
        const newTotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
        setTotalSumm(newTotal);
    }, [products]);



      useEffect(()=>{
        const fetchCart = async ()=>{
            try{
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
                const response = await axios.get('http://localhost:8000/api-samohod/cart');
                setProducts(response.data.content);
            }
            catch(error){
                console.error('Error fetching users:', error);
            }
            finally{
                setLoading(false);
            }
        };
        fetchCart();
      },[refresh])


      const handleDelClick = async (e)=>{
        e.preventDefault();
        try{
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
            const response = await axios.delete(`http://localhost:8000/api-samohod/cart/${e.target.value}`);
        }
        catch(error){
            console.error('Error fetching users:', error);
        }
        finally{
            setRefresh(refresh+1);
        }
      }

      const handleClickOrder = async (e)=>{
        e.preventDefault();
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
        const response = await axios.post(`http://localhost:8000/api-samohod/order`);
        nav('/orders')
      }


    return(
        
            <div class="container py-3">

                <Header/>


                <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
                    <h1 class="display-4 fw-normal">Корзина</h1>
                </div>

                <main>
                    <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">




                        {products.map(product=>
                            <CartAlone summ={setTotalSumm} totalPrice={totalSumm} del = {handleDelClick} id={product.id} name={product.name} price={product.price} description={product.description} quantity={product.quantity}/>
                        )}



                    </div>
                    <div class="row justify-content-center gap-1">
                        <h2 class="mb-5">Итоговая стоимость:{totalSumm}р.</h2>
                        <button class="col-6 btn btn-lg btn-outline-info mb-3" type="button" onClick={handleGoBack}>Назад</button>
                        <button type="button" class="col-6 btn btn-lg btn-primary mb-3" onClick={handleClickOrder}>Оформить заказ</button>

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
    )
}
export default Cart;

