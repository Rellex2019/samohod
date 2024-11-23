import axios from "axios";
import React, { useEffect, useState } from "react";


const CartAlone = (product)=>{



    const [quantity, setQuantity]= useState(product.quantity);
    const [visible, setVisible] = useState(true);
    const [price, setPrice] = useState(product.price*quantity);

    
      const handlePlus = async(e)=>{
        e.preventDefault();

        product.summ(product.totalPrice+ price);

        setQuantity(quantity+1);
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
        const respone =await axios.post(`http://localhost:8000/api-samohod/change`, {'id': product.id, 'quantity': quantity+1});
      }
      const handleMinus = async(e)=>{
        e.preventDefault();



        product.summ(product.totalPrice- price);
        setQuantity(quantity-1);
        if(quantity-1<=0)
        {   
            setVisible(false);
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
            await axios.delete(`http://localhost:8000/api-samohod/cart/${product.id}`);
        }
        else{
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('userToken')}`;
        const respone =await axios.post(`http://localhost:8000/api-samohod/change`, {'id': product.id, 'quantity': quantity-1});
        }
      }

 


    return(
    visible?
    <div class="col">
    <div class="card mb-4 rounded-3 shadow-sm">
        <div class="card-header py-3">
            <h4 class="my-0 fw-normal">{product.name}</h4>
        </div>
        <div class="card-body">
            <h1 class="card-title pricing-card-title">{product.price}р.<small class="text-muted fw-light"> &times; {quantity}
                шт.</small></h1>
            <p>{product.description}</p>

            <button type="button" class="btn btn-lg btn-info mb-3" onClick={handlePlus}>+</button>
            <button type="button" class="btn btn-lg btn-warning mb-3" onClick={handleMinus} >&minus;</button>
            <button type="button" value={product.id} class="btn btn-lg btn-outline-danger mb-3"onClick={product.del}>Удалить из корзины</button>
        </div>
    </div>
    </div>:null
)};
export default CartAlone;