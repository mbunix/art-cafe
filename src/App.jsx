import React, { useState } from 'react'
import Navbar from './client/components/pages/navbar/navbar'
import Slider from './client/components/slider/slider'
import Home from './client/components/pages/home/home'
import About from './client/components/pages/about/about'
import Contactus from './client/components/pages/contact/contact-us'
import Shop from './client/components/pages/shop/shop'
import Signup from './client/components/pages/signup/signup'
import Login from './client/components/pages/login/login'
import CartScreen from './client/components/pages/cart/cartScreen'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App () {
  return (
    <BrowserRouter>
      <Navbar />
      <Slider />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contactus />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/cart/:id?' element={<CartScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
