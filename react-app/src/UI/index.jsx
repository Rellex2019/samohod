import React from "react";
import Header from "./header";
import { useEffect, useState } from "react";
import axios from 'axios'; 

const Index = ()=>{




        const [products, setProducts] = useState([]);
        const [loading, setLoading] = useState(true);
 
        useEffect(() => {
            const fetchUsers = async () => {
                try {



                    const response = await axios.get('http://localhost:8000/api-samohod/products');
                    setProducts(response.data.content);
                } catch (error) {
                    console.error('Error fetching users:', error);
                } finally {
                    setLoading(false);
                }
            };
 
            fetchUsers();
        }, []);
 
 


        const handleClickCart = async (e)=>{
            
                    //ТОКЕН в запрос axios добавление
                    const token = localStorage.getItem('userToken');
                    if(token)
                    {
                        axios.defaults.headers.common['Authorization']= `Bearer ${token}`;
                    }
                    //ТОКЕН

            console.log(e.target.value);
            const response = await axios.post('http://localhost:8000/api-samohod/cart/'+e.target.value)
        }

    return(


<div class="container py-3">

        <Header/>
        <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 class="display-4 fw-normal">Каталог товаров</h1>
        </div>
    <main>
        <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        {loading? <div>Loading...</div>: 

            products.map(product=>
            <div class="col">
                <div class="card mb-4 rounded-3 shadow-sm" key={product.id}>
                    <div class="card-header py-3">
                        <h4 class="my-0 fw-normal">{product.name}</h4>
                    </div>
                    <div class="card-body">
                        <h1 class="card-title pricing-card-title">{product.price} р.</h1>
                        <p>{product.description}</p>

                        {localStorage.getItem('userToken')?<button type="button" class="w-100 btn btn-lg btn-outline-primary" value={product.id} onClick={handleClickCart}>Добавить в корзину</button>:''}
                    </div>
                </div>
            </div>
            )
        }

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
    );
}
export default Index;