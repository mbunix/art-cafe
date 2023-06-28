import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup } from 'react-bootstrap'
import Select from 'react-select'
import countries from 'i18n-iso-countries'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import './signup.css'
import FormContainer from '../../custom/FormContainer'
import Message from '../../custom/message.jsx'
import Loader from '../../custom/loader.jsx'
import { SignUp } from '../../redux/actions/userActons.js'
import { useDispatch, useSelector } from 'react-redux'

const signUpSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  area: yup.string().required(),
  contact: yup
    .string()
    .required()
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
})
const options = Object.entries(countries.getNames('en')).map(
  ([code, name]) => ({
    value: code,
    label: name
  })
)

const signUp = (location, history) => {
  const [firstname, setfirstName] = useState('')
  const [lastname, setlastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [area, setArea] = useState('')
  const [message, setMessage] = useState(null)
  const [contact, setContact] = useState('')
  const useSignup = useSelector(state => state.userSignup)
  const { loading, error, userInfo } = useSignup || {}
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(signUpSchema) })
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    letter: false,
    number: false
  })
  const dispatch = useDispatch()
  const handlePasswordChange = e => {
    const password = e.target.value
    setPasswordStrength({
      length: password.length >= 8,
      letter: /[A-Za-z]/.test(password),
      number: /\d/.test(password)
    })
  }
  const submitHandler = e => {
    e.preventDefault()
    if (!passwordStrength.length || !passwordStrength.letter || !passwordStrength.number) {
      setMessage('Password is too weak')
    } else {
      dispatch(
        SignUp(firstname, lastname, email, area, contact, password),
        reset()
      )
    }
  }
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])
  return (
    <>
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form
          className='signup-form'
          onSubmit={e => { submitHandler(e); handleSubmit(e)}}>
          <Form.Group controlId='firstName' className='first-name'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='text'
              placeholder=' Enter First Name'
              {...register('firstName', {
                required: 'First Name is required'
              })}
              onChange={e => setfirstName(e.target.value)}
              value={firstname}
            />
            {errors.firstName && (
              <Message variant='danger'>{errors.firstName.message}</Message>
            )}
          </Form.Group>
          <Form.Group controlId='lastName' className='last-name'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Last Name'
              {...register('lastName', {
                required: 'Last Name is required'
              })}
              value={lastname}
              onChange={e => setlastName(e.target.value)}
            />
            {errors.lastName && (
              <Message variant='danger'>{errors.lastName.message}</Message>
            )}
          </Form.Group>
          <div className='signup-form-group'>
            <Form.Group controlId='email' className='email'>
              <Form.Label>Enter a valid Email</Form.Label>
              <Form.Control
                type='email'
                value={email}
                placeholder='Enter Email'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address'
                  }
                })}
                onChange={e => setEmail(e.target.value)}
              />
              {errors.email && (
                <p role='alert'>Email is required and must be valid</p>
              )}
            </Form.Group>
            <Form.Group controlId='location' className='location'>
              <Form.Label> Enter Your Location Area</Form.Label>
              <Form.Control
                as='select'
                {...register('location')}
                type='area'
                value={area}
                onChange={e => setArea(e.target.value)}
              >
                <Select
                  options={options}
                  {...register('location')}
                  aria-invalid={errors.location ? 'true' : 'false'}
                />
              </Form.Control>
            </Form.Group>
            <FormGroup controlId='password' className='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={password}
                placeholder='Password'
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long'
                  }
                })}
                onChange={e => {
                  handlePasswordChange(e)
                  setPassword(e.target.value)
                }}
              />
              {errors.password && (
                <Message variant='danger'>{errors.password.message}</Message>
              )}
            </FormGroup>
            <FormGroup controlId='contact' className='contact'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='contact- number'
                {...register('contact', {
                  required: 'Contact is required',
                  pattern: {
                    value:
                      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                    message:
                      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
                  }
                })}
                value={contact}
                onChange={e => setContact(e.target.value)}
              />
              {errors.contact && (
                <Message variant='danger'>{errors.contact.message}</Message>
              )}
            </FormGroup>
            <div>
              <span>Password strength:</span>
              <label>
                <input
                  className='checkbox-auth'
                  type='checkbox'
                  checked={passwordStrength.length}
                  disabled
                />
                At least 8 characters
              </label>
              <label>
                <input
                  className='checkbox-auth'
                  type='checkbox'
                  checked={passwordStrength.letter}
                  disabled
                />
                Contains a letter
              </label>
            </div>
            {errors.password && (
              <p
                role='alert'
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                Password must contain at least 8 characters, one letter and one
                number
              </p>
            )}
            {errors.contact && (
              <p role='alert'>Contact is required and must be valid</p>
            )}

            <Row className='py-3'>
              <Col>
            <Button type='submit' variant='primary' className='signup-button'>SignUp</Button>
              </Col>
              <Col>
                Have an Account?{' '}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                  <Button className='login- button'>Login</Button>
                </Link>
              </Col>
            </Row>
          </div>
        </Form>
      </FormContainer>
    </>
  )
}

export default signUp
