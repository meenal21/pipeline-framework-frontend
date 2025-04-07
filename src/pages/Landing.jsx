import React, { useState } from "react";
import { Button, Offcanvas, Container } from "react-bootstrap";
import Login from "./Login";
import SignUp from "./SignUp";

const Landing = () => {
    const [showAuth, setShowAuth] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
  
    return (
      <Container className="d-flex flex-column align-items-center mt-5">
        <h1>Welcome to My Website</h1>
        <p className="text-center">
          Discover amazing content and interact with a great community.  
          Sign up today or log in to get started!
        </p>
  
        <Button variant="primary" onClick={() => setShowAuth(true)}>
          Login / Sign Up
        </Button>
  
        {/* Offcanvas Sidebar */}
        <Offcanvas show={showAuth} onHide={() => setShowAuth(false)} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{isLogin ? "Login" : "Sign Up"}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {isLogin ? (
              <Login toggleSignup={() => setIsLogin(false)} />
            ) : (
              <SignUp toggleLogin={() => setIsLogin(true)} />
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    );
  };
  
  export default Landing;