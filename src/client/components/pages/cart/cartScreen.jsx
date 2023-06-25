import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap'
import Message from '../../custom/message'
import { addToCart, removeFromCart } from '../../redux/actions/cartActions'


const CartScreen = ({ match, location, history }) => {
  const artworkId = match.params.id|| ''
  
  console.log(match)

  const quantity = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (artworkId) {
      dispatch(addToCart(artworkId, quantity))
    }
  }, [dispatch, artworkId, quantity])

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.artwork}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/artwork/${item.artwork}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.quantity}
                      onChange={e =>
                        dispatch(
                          addToCart(item.artwork, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.artwork)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
