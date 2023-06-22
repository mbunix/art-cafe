import { useState, useEffect, useContext } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import './slider.css'
import SliderContext from './sliderContext'

function Slider() {
  const [index, setIndex] = useState(0)
  const {isSliderConstrained, setIsSliderConstrained} = useContext(SliderContext)
  const imagePicker = [
    {
      image: 'src/client/assets/images/desktop-image-hero-1.jpg',
      alt: 'desktop1-slider',
      heading: 'Discover Innovative Ways to Decorate',
      text: 'We provide unmatched quality, comfort and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.'
    },
    {
      image: 'src/client/assets/images/desktop-image-hero-2.jpg',
      alt: 'desktop2-slider',
      heading: 'We are Available all Across the Globe',
      text: 'With Stores all over the world it is easier to find Furniture for your home or place of business. Locally we are available in major cities throughout the country, Find the branch near ou using your store locator ,any questions ? dont hesitate to contact us today'
    },
    {
      image: 'src/client/assets/images/desktop-image-hero-3.jpg',
      alt: 'desktop3-slider',
      heading: 'Manufuctured With the best Materials',
      text: 'Our Modern Furniture Store Provides a High level of quality ,Our Company has invested in advanced technology to ensure that our products are made as perfect and as consistent as possible, with 3 decades in this industry we have understood ehat customers want for their home and office'
    }
  ]

  const handleLeftClick = () => {
    setIndex((index + 1) % imagePicker.length)
  }



  const handleRightClick = () => {
    setIndex((index - 1 + imagePicker.length) % imagePicker.length)
  }
  useEffect(() => {
    const intervalId = setTimeout(() => {
      setIndex((index + 1) % imagePicker.length)
    }, 10000);
    return () => clearInterval(intervalId);
  },[index, imagePicker]);

  return (
      <SliderContext.Provider value={{ isSliderConstrained }}>
      <div className={`slider-text${isSliderConstrained ? ' constrained' : ''}`} style={{ width: isSliderConstrained ? '50vw' : '100vw' }}>
        <img src={imagePicker[index].image} alt={imagePicker[index].alt} />
          <div className='slider-text-container'>
            <h2 className='slider-text-heading'>
             {imagePicker[index].heading}
           </h2>
           <p className='slider-text-paragragh'>{imagePicker[index].text}</p>
          </div>
        </div>
      <div className='slider-button-container'>
        <button onClick={handleLeftClick}> <FaAngleLeft /></button>
        <button onClick={handleRightClick}><FaAngleRight /></button>
      </div>
    </SliderContext.Provider>
  );
}

export default Slider
