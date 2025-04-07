import  { Outlet, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const NavbarCustom = () => {
    return (
        <div>
            <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm">
                <Container>
                    {/* Brand Logo */}
                    <Navbar.Brand as={Link} to="/">MyWebsite</Navbar.Brand>

                    {/* Mobile Toggle Button */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>            
            </Navbar>
        </div>
    );
};

export default NavbarCustom;