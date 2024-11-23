import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Header = ()=>{


const [token, setToken] = useState()        
let nav = useNavigate();
useEffect(()=>{
    setToken(localStorage.getItem('userToken'));
},[]);




    const handleClick =async ()=>{   
        axios.defaults.headers.common['Authorization']= `Bearer ${token}`;
        await axios.get('http://localhost:8000/api-samohod/logout');
        localStorage.clear('userToken');
        setToken('');
        // window.location.reload();
        nav('/');
    }

    return(
    <header>
        <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
                <span class="fs-4">«Самоход»</span>
            </a>

            <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                {token ? (   
                <>
                <Link class="me-3 py-2 text-dark text-decoration-none" to="/orders">Мои заказы</Link>
                <Link class="me-3 py-2 text-dark text-decoration-none" to="/cart">Корзина</Link>         
                <div onClick={handleClick} className="me-3 py-2 text-dark text-decoration-none">Выход</div>
                </>    
                ):
                <>
                <Link class="me-3 py-2 text-dark text-decoration-none" to="/login">Авторизация</Link>
                <Link class="me-3 py-2 text-dark text-decoration-none" to="/registration">Регистрация</Link>
                </>
                }


            </nav>
        </div>
    </header>
    )
}
export default Header;