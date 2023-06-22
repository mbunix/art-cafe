
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from "../../custom/message";
import Loader from "../../custom/loader";
import FormContainer from "../../custom/FormContainer";
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../../redux/actions/userActons";
const Login = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo, loading, error } = userLogin
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const redirect = location.search ? location.search.split('=')[1] : '/'
    useEffect(() => {
        if (userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            window.location.href = '/'
        }
    }, [userInfo])
    const submitHandler = (e) => {
        e.preventDefault()
        setShowLoader(true)
        dispatch(login(email, password))
    }
    return (
        <FormContainer>
            <h1>Log In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Log In
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer?{' '}
                    <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>
                        SignUp
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );

}
export default Login