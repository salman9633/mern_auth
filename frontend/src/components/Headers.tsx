import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useLogoutMutation } from '../slices/userApiSlice';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../slices/authSlice';

const Headers = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo } = useSelector((state: any) => state.auth)
    const [logoutApiCall] = useLogoutMutation()
    const handleLogOut = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logOut());
            navigate('/')

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <Navbar.Brand href='/'>MERN Auth</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            {
                                userInfo ?
                                    (
                                        <>
                                            <NavDropdown title={userInfo.name} id='username'>
                                                <LinkContainer to='/profile'>
                                                    <NavDropdown.Item>
                                                        Profile
                                                    </NavDropdown.Item>
                                                </LinkContainer>
                                                <NavDropdown.Item onClick={handleLogOut}>
                                                    Log Out
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                    ) : (
                                        <>
                                            <LinkContainer to="/login">
                                                <Nav.Link>
                                                    <FaSignInAlt /> Sign In
                                                </Nav.Link>
                                            </LinkContainer>
                                            <LinkContainer to="/register">
                                                <Nav.Link>
                                                    <FaSignOutAlt /> Sign Up
                                                </Nav.Link>
                                            </LinkContainer>
                                        </>
                                    )

                            }


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Headers
