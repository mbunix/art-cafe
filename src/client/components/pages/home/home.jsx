import React from 'react'
import './home.css'
function Home () {
  return (
    <div>
      <div className='home-container'>
        <div className='home-slidable1-container'>
          <img
            src='src/client/assets/images/image-about-dark.jpg'
            alt='about-our-furnitures '
            className='about-img-bottom-right'
          ></img>
        </div>
        <div className='text'>
          <h1 className='home-text-heading'>ABOUT OUR FURNITURE</h1>
          <p className='home-text-bottom'>
            Our multifunctional collection blends design and function to suite
            your individual taste and requirements.Make each room unique or pick
            a cohesive theme that best expresses your interest and what inspires
            you.Find the furniture pieces you need from traditional to
            contemporary styles or anything in between. Product specialists are
            available to assist you create your dream space.
          </p>
        </div>

        <div className='home-slidable2-container'>
          <img
            src='src/client/assets/images/image-about-light.jpg'
            alt='about-our-furnitures'
            className='home-img-bottom-left'
          ></img>
        </div>
      </div>
    </div>
  )
}

export default Home
