import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../custom/message';
import Loader from '../../custom/loader';

import { getOrderDetails, payOrder, deliverOrder } from '../../redux/actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../../constants/orderConstants'
const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id
    const dispatch = useDispatch()
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails
    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay,  } = orderPay
    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver
    const   {requestPayment,requestPaymentSuccess} = useState()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    if (!loading) {
// Calculate prices
const itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty,0)
const shippingPrice = itemsPrice > 100 ? 0 : 10
const taxPrice = 0.15 * itemsPrice
order.itemsPrice = itemsPrice.toFixed(2)
order.shippingPrice = shippingPrice.toFixed(2)
order.taxPrice = taxPrice.toFixed(2)
order.totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)
        useEffect(() => {
            if (!userInfo) {
                history.push('/login')
            }
            // add mpesa payment
            const addMpesaPayRequest = async () => {
                
            }
            if(!order || successPay || successDeliver || order._id !== orderId) {
                dispatch({ type: ORDER_PAY_RESET })
                dispatch({ type: ORDER_DELIVER_RESET })
                dispatch(getOrderDetails(orderId))
            } else if (!order.isPaid) {
                if (!window.mpesaPay) {
                   addMpesaPayRequest()
                } else {
                    setPaymentRequest(true)
               }
            }
        }, [dispatch, orderId, order, successPay, successDeliver])
        // succesful payment 
        const handlePaymentSuccess = (paymentResult) => {
            dispatch(payOrder(orderId, paymentResult))
            setPaymentRequest(true)
        }
        // succesful delivery
        const handleDeliverySuccess = () => {
            dispatch(deliverOrder(orderId))

        }
        // const payOrderHandler = () => {
        //     dispatch(payOrder(order._id))
        // }
        // const deliverOrderHandler = () => {
        //     dispatch(deliverOrder(order._id))
        // }
        
    }
    
    return loading?(
    <Loader/>
    ) : error ? (
    <Message variant='danger'>{error}</Message>
        ) : (
<div>
            <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
    )
}
export default OrderScreen;