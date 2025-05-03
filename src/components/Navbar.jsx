import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { MdToken } from 'react-icons/md';

const NavbarCustom = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem("token");
            console.log(token);
            setLoggedIn(!!token);
        };
        checkLoginStatus();
    },[]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setLoggedIn(false);
        navigate("/");
    };

    return (
        <Navbar expand="md" bg="dark" variant="dark" className="shadow-sm">
            <Container fluid className="px-5">
                <Navbar.Brand as={Link} to="/">StageFlow</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to={loggedIn ? "/home" : "/"}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                        {loggedIn && (
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>            
        </Navbar>
    );
};

export default NavbarCustom;