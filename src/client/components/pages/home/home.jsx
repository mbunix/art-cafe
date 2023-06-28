import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Paginate from '../../custom/paginate'
import ArtworkCarousel from '../../custom/artworkCarousel'
import Loader from '../../custom/loader'
import Message from '../../custom/message'
import Artwork from '../artwork/artwork'
import Meta from '../../custom/meta'
import { listArtwork } from '../../redux/actions/artworkActions'
import "./home.css"

function Home ({ match }) {
  const keyword = match?.params?.keyword
  const pageNumber = match?.params?.pageNumber || 1
  const dispatch = useDispatch()

  const artworkList = useSelector(state => state.artworkList)
  const { loading, error, artworks, page, pages } = artworkList

  useEffect(() => {
    dispatch(listArtwork(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <div>
      <Meta />
      {!keyword ? (
        <ArtworkCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1 className='home-heading'>Our Latest Art in The ArtBoard </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : artworks ? (
        <>
          <Row>
            {artworks.map(artwork => (
              <Col key={artwork._id} sm={12} md={6} lg={4} xl={3}>
                <Artwork artwork={artwork} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      ) : null}
      <div className='home-container'>
        <div className='home-slidable-container'>
          <img
            src='src/client/assets/images/art8.jpeg'
            alt='about-our-furnitures '
            className='about-img-bottom-right'
          ></img>
        </div>
        <div className='text'>
          <h1 className='home-text-heading'>ABOUT OUR ARTWORK</h1>
          <p className='home-text-bottom'>
            Our multifunctional art collection blends design and function to
            suit your individual taste and requirements. Make each room unique
            or pick a cohesive theme that best expresses your interests and what
            inspires you. Find the art pieces you need from traditional to
            contemporary styles or anything in between, from ancient to modern
            artists.
          </p>
        </div>
        <div className='home-slidable-container'>
          <img
            src='src/client/assets/images/art1.png'
            alt='about-our-furnitures'
            className='home-img-bottom-left'
          ></img>
        </div>
      </div>
    </div>
  )
}

export default Home
