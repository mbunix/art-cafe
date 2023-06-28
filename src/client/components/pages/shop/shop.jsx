import { useState, useEffect } from 'react';
import { Card, Col, Container, Row, ListGroup, Image, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../../custom/rating';
import Message from '../../custom/message';
import Meta from '../../custom/meta';
import Loader from '../../custom/loader';
import { listArtWorkDetails, createArtReview } from '../../redux/actions/artworkActions';
import { ARTWORK_CREATE_RESET, ARTWORK_REVIEW_RESET } from '../../constants/artworkConstants';

const Shop = ({ history, match }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  // The artwork details call
  const artworkDetails = useSelector((state) => state.artworkDetails);
  const { loading, error, artwork = {} } = artworkDetails || {};

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin || {};

  //review requests on the artwork
  const artworkReviewCreate = useSelector((state) => state.artworkReviewCreate);
  const {
    success: sucessArtworkReview,
    loading: loadingArtworkReview,
    error: errorArtworkReview,
  } = artworkReviewCreate;

  useEffect(() => {
    if (sucessArtworkReview) {
      setRating(0);
      setComment('');
    }
    if (artwork.id !== match.params?.id) {
      dispatch(listArtWorkDetails(match?.params?.id));
      dispatch({ type: ARTWORK_REVIEW_RESET });
    }
  }, [dispatch, match, sucessArtworkReview, artwork]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params?.id}?quantity=${quantity}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createArtReview(match.params?.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        <i className="fas fa-arrow-left"></i> Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={artwork?.name} />
          <Container>
            <Row>
              <Col md={6}>
                <Image src={artwork?.image} alt={artwork?.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{artwork?.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating value={artwork?.rating} text={`${artwork?.numReviews} reviews`} />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <p>{artwork?.description}</p>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>{artwork?.price}</strong>
                        </Col>
                        <Col>
                          <strong>${artwork?.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <strong>Status:</strong>
                        </Col>
                            <Col>{artwork?.countInStock > 0 ? 'In Stock' : 'Out of Stock'
            }</Col>
              </Row>
            </ListGroup.Item>
            {artwork?.countInStock > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Quantity:</strong>
                  </Col>
                  <Col>
                    <Form.Control
                      as="select"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    >
                      {[...Array(artwork?.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Button
                onClick={addToCartHandler}
                className="btn-block"
                type="button"
                disabled={artwork?.countInStock === 0}
              >
                Add to Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <h3>Reviews</h3>
        {artwork?.reviews?.length === 0 && <Message>No reviews</Message>}
        <ListGroup variant="flush">
          {artwork?.reviews?.map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <Rating value={review.rating} />
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
          <ListGroup.Item>
            <h2>Write a Customer Review</h2>
            {loadingArtworkReview && <Loader />}
            {errorArtworkReview && <Message variant="danger">{errorArtworkReview}</Message>}
            {userInfo ? (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="rating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as="select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="comment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    row="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Form>
            ) : (
              <Message>
                Please <Link to="/login">sign in</Link> to write a review{' '}
              </Message>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  </Container>
        </>
      )}
    </>
  );
};

export default Shop;