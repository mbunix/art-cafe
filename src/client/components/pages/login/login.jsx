
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from "../../custom/message";
import Loader from "../../custom/loader";
import FormContainer from "../../custom/FormContainer";
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../../redux/actions/userActons";
import "./login.css"
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
    }, [userInfo,history,redirect])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <>
        <div>
        <FormContainer  >
            <h3 className=" login-heading">Log In</h3>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} className = 'login-form' >
                <Form.Group controlId='email' className = 'form-control- email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className = 'form-control-password'>
                    <Form.Label> Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    ></Form.Control>
                        </Form.Group>
        <Row className='py-3'>
        <Col className='signup-link'>
                New Customer?{' '}
                <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>
        SignUp
            </Link>
    <Button type='submit' variant='primary'>
      {' '}
      Log In
    </Button>
  </Col>
</Row>

            </Form>

            </FormContainer>
         </div>
        <div className="about-art">
                <h2 className='about-art-heading'>Creativity beyond Scope </h2>  
                <img  className = 'about-art-image' src="src/client/assets/images/creativity-beyond-scope.png" alt="creativity-beyond-scope"></img>
                <p className='about-art-text'>Art is a form of expression that can be used to communicate ideas
                    and feelings. We dispaly the most artistic pieces of both histories
                    and cultures from generations of artists
                </p>
        </div>
        </>
    );

}
export default Login