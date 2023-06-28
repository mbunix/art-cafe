import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import Loader from "./loader";
import Message from "./message";
import { listTopArtwork } from "../redux/actions/artworkActions";

const ArtworkCarousel = () => { 
    const dispatch = useDispatch();
    const artworkTopRated = useSelector((state) => state.artworkTopRated)
    const { loading, error, artworks } = artworkTopRated;
    useEffect(() => {
        dispatch(listTopArtwork())
    },[dispatch])
     return loading ? (
     <Loader />
     ) : error ? (
     <Message variant='danger'>{error}</Message>
         ) : (  
                 <Carousel pause='hover' className='artwork-carousel'>
                     {artworks?.map((artwork) => (
                         <Carousel.Item key={artwork._id}>
                             <Link to={`/artwork/${artwork._id}`}>
                                 <Image src={artwork.image} alt={artwork.name} fluid />
                                 <Carousel.Caption className='carousel-caption'>
                                     <h2>{artwork.name} (${artwork.price}</h2>
                                 </Carousel.Caption>
                             </Link>
                         </Carousel.Item>
                     ))}
                 </Carousel>
 )
}
export  default ArtworkCarousel