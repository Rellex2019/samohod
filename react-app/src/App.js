import Index from "./UI";
import Cart from "./UI/cart";
import Login from "./UI/login";
import Orders from "./UI/orders";
import Registration from "./UI/registration";

import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

function App() {


//   const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
//     return isAllowed ?
//         <Route {...props}/> : <Navigate to={redirectTo} replace/>
// };


  return (
    <div className="App">
      


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>


          {/* <ProtectedRoute
                isAllowed={localStorage.getItem('userToken')}
                redirectTo="/"
                path="/orders" 
                element={<Orders/>}
          />
          <ProtectedRoute
                isAllowed={localStorage.getItem('userToken')}
                redirectTo="/"
                path="/cart"
                element={<Cart/>}
          /> */}

          <Route path="/cart" element={<Cart/>}/>
          <Route path="/orders" element={<Orders/>}/>

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
