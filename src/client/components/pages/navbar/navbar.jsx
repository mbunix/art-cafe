import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import SliderContext from '../../slider/sliderContext'

function Navbar () {
  const { setIsliderConstrained } = useContext(SliderContext)
  const [sliderWidth,setSliderWidth] =useState({'0vw':'100vw'})
  const handleLinkClick = event => {
    setIsliderConstrained(event.target.textContent !== 'home')
if (event.target.route !== 'home') {
  setSliderWidth('50vw')
} else {
  setSliderWidth('100vw')
}

  }
  return (
    <>
    <div className='navbar-brand '>
      <div className='navbar-brand-logo'>
        <img src='src/client/assets/images/logo.svg' alt='logo'></img>
      </div>
    </div>
      <div className='navbar-brand-links'>
        <NavLink
          to={'/'}
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
          onClick = { handleLinkClick }
        >
          Home
        </NavLink>
        <NavLink
          to={'/shop'}
          onClick={handleLinkClick}
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
        >
          Shop
        </NavLink>
        <NavLink
          to={'/about'}
          onClick={handleLinkClick}
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
        >
          About
        </NavLink>
        <NavLink
          to={'/contact'}
          onClick={handleLinkClick}
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
        >
          Contact
        </NavLink>
        <NavLink
          to={'/signup'}
          onClick={handleLinkClick}
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
        >
          SignUp
        </NavLink>
        <NavLink
          to={'/login'}
          onClick={handleLinkClick}
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
        >
          Login
        </NavLink>
        <NavLink
          to={'/cart'}
          onClick={handleLinkClick}
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          } >Cart</NavLink>
      </div>
    </>
  )
}

export default Navbar
