import React from "react";
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from "../../custom/rating";

const Artwork = ({ artwork }) => {
    return (
        <Card className='my-3-p-3 rounded'>
            <Link to={`/artwork/${artwork._id}`}>
                <Card.Img variant='top' src={artwork.image} />
            </Link>
            <Card.Body>
                <Link to={`/artwork/${artwork._id}`}>
                    <Card.Title as='div'>
                        <strong>{ artwork.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating
                        value={artwork.rating}
                        text={`${artwork.numReviews} reviews`}
                    />
                </Card.Text>
                <Card.Text as='h3'>${artwork.price}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Artwork