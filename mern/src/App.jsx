import React from 'react'
import Home from './screens/Home'
import {BrowserRouter as Router,
  Routes,
  Route } from 'react-router-dom'
import Login from './screens/Login'
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import Signup from './screens/Signup';
import CartProvider from './components/ContextReducer';
// import Cart from './screens/Cart';


const App = () => {
  return (
  <CartProvider>
      <Router>
     <div>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="login" element={<Login/>}/>
        <Route exact path="SignUp" element={<Signup/>}/>
        {/* <Route exact path="cart" element={<Cart/>}/> */}
        
      </Routes>
    </div>
   </Router>
  </CartProvider>
  )
}

export default App
