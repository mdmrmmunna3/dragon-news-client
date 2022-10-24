import React, { useContext } from 'react';
import { Button, Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/brands/Brand2.png'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import LeftSideNav from '../LeftSideNav/LeftSideNav';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error('error', error))
    }

    return (
        <Navbar className='mb-4' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand >
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top" /><Link to='/' className='text-decoration-none'> Dragon News</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">All News</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <span className='d-flex align-items-center text-white'>
                            {
                                user?.uid ?
                                    <>
                                        <span className='me-2'>{user?.displayName}</span>
                                        <Button className='text-white border-0' onClick={handleLogOut} variant='outline-secondary' size='sm' >Log Out</Button>
                                    </>
                                    :
                                    <>
                                        <Link className='text-decoration-none me-2' to='/login'>Login</Link>
                                        <Link className='text-decoration-none' to='/register'>Register</Link>
                                    </>
                            }
                        </span>
                        <Link to='/profile'>
                            {
                                user?.photoURL ?
                                    <Image roundedCircle src={user?.photoURL} style={{ height: '30px' }}></Image>
                                    : <FaUser></FaUser>
                            }
                        </Link>
                    </Nav>
                    <div className='d-lg-none'>
                        <LeftSideNav></LeftSideNav>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;