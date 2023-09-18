import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify'

// function parseHtmlToString(htmlString: any): string {
//     const parser = new DOMParser();
//   const doc = parser.parseFromString(htmlString, 'text/html');
//   const preElement = doc.querySelector('pre');
//   if (preElement) {
//     const textContent = preElement.textContent;
//     if (textContent !== null) {
//       return textContent.trim();
//     }
//   }
//   return 'Unknown Error';
// }

function LogInPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [Error, setError] = useState('')


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state: any) => state.auth)

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    //Submit Handler Fn
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await login({
                email,
                password
            }).unwrap();
            dispatch(setCredentials({ ...res }))
            navigate('/')
            toast.success("Successfully Logged In")
        } catch (err) {
            console.log(err);
            // const error = parseHtmlToString(err.data)
            // console.log(error);
            // setError(error.Error)
        }
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='email'>
                    <span style={{ color: 'red' }}>{Error}</span>
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

                <Button type='submit' variant='primary' className='mt-3'>Sign In</Button>

                <Row className='py-3'>
                    <Col>
                        New User? <Link to='/register'>Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LogInPage
