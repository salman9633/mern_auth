import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice';
import { useRegisterMutation } from '../slices/userApiSlice';
import { toast } from "react-toastify";
function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorHandler, setErrorHandler] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [registerApiCall] = useRegisterMutation()

    const { userInfo } = useSelector((state: any) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])


    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorHandler('Password Do Not Match')
        } else {
            try {
                const res = await registerApiCall({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate('/')
                toast.success("Successfully Registered")
            } catch (err) {
                console.log(err);

            }
        }
    }

    return (
        <FormContainer>
            <h1>Register</h1>
            <Form onSubmit={submitHandler}>
                <span className="p-3" style={{ color: 'red' }}>{errorHandler}</span>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Your Name Here'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Your Email Here'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Your Password Here'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Your Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>Sign In</Button>

                <Row className='py-3'>
                    <Col>
                        Already A User? <Link to='/login'>Log In</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default RegisterPage
