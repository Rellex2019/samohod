import React, { useState } from "react";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ()=>{
    const [error, setError] = useState();
    const nav = useNavigate();
    const handleGoBack = (e) => {
        e.preventDefault();
        nav('/');
      };

    const [formData, setFormData] = useState([]);
    
      const handleOnChange = (e)=>{
        setFormData(
        {
            ...formData,
            [e.target.name] : e.target.value
        })
        console.log(formData);
      }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
        const response = await axios.post('http://localhost:8000/api-samohod/login', formData);

        const token =response.data.content.user_token;
        localStorage.setItem('userToken', token);
        nav('/')
        }
        catch(e){
            setError('Неверно введен Email или пароль');

        }
    }



    return(
        <div class="container py-3">
            <Header/>
            <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 class="display-4 fw-normal">Авторизация</h1>
        </div>
            <main>
                <div class="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center">
                    <div class="col">
                        <div class="row">
                            <form onSubmit={handleSubmit}>
                                <div class="form-floating mb-3">
                                    <input type="email" class="form-control" name="email" onChange={handleOnChange} id="floatingInput" placeholder="name@example.com"/>
                                    <label for="floatingInput">Email</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="password" class="form-control" name="password" onChange={handleOnChange} id="floatingPassword" placeholder="Password"/>
                                    <label for="floatingPassword">Password</label>
                                </div>
                                <div className="error" style={{color:'red'}}>{error}</div>
                                <button class="w-100 btn btn-lg btn-primary mb-3" type="submit">Войти</button>
                                <button class="w-100 btn btn-lg btn-outline-info" onClick={handleGoBack}>Назад</button>
                            </form>
                        </div>

                    </div>
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
export default Login;