import Header from "./header";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Registration = ()=>{
    const nav = useNavigate();
    
    const [formData, setFormData] =  useState([]);
    const [error, setError] = useState();
    const [val, setVal] = useState(false);
    const handleOnChange = (e)=>{
        setFormData({...formData, [e.target.name] : e.target.value})
        console.log(formData);
        if(e.target.name=='password'){
        checkLength(formData.password);
        }
    }
    const checkLength = (password)=>{
        if(!password || password.length < 7){
            setError('Пароль должен быть больше 8 символов');
            setVal(false);
        }
        else{
            setError('');
            setVal(true);
        }
        console.log(formData.password);
    }


    const handleGoBack = (e) => {
        e.preventDefault();
        nav('/');
      };

    const handleReg = async(e)=>{
        e.preventDefault();
        if(val)
        {
        const response = await axios.post('http://localhost:8000/api-samohod/signup', formData);
        const token =response.data.content.user_token;
        localStorage.setItem('userToken', token);
        nav('/')
        }
    }
    return(
<div class="container py-3">

    <Header/>
    <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 class="display-4 fw-normal">Регистрация</h1>
    </div>
    <main>
        <div class="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center">
            <div class="col">
                <div class="row">
                    <form onSubmit={handleReg}>
                        <h1 class="h3 mb-3 fw-normal">Пожалуйста заполните все поля</h1>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" onChange={handleOnChange} name="fio" id="floatingFio" placeholder="ФИО"/>
                            <label for="floatingFio">ФИО</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" onChange={handleOnChange} name="email" id="floatingInput" placeholder="name@example.com"/>
                            <label for="floatingInput">Email</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" onChange={handleOnChange}  name="password" id="floatingPassword" placeholder="Password"/>
                            <label for="floatingPassword">Password</label>
                        </div>
                        <div className="error" style={{color:'red'}}>{error}</div>
                        <button class="w-100 btn btn-lg btn-primary mb-3" type="submit">Зарегистрироваться</button>
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
    )}
export default Registration;