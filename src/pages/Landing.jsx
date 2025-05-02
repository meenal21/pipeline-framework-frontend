import React, { useState } from "react";
import { Button, Offcanvas, Container } from "react-bootstrap";
import Login from "./Login";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const [showAuth, setShowAuth] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
  
    const handleLoginSuccess = () => {
      setShowAuth(false);
      navigate("/home");
    };
    return (
      <Container className="d-flex flex-column align-items-center mt-5">
        <h1>Design, Configure, and Run Your Data Pipelines with Ease</h1>
        <h4 className="text-center">
            
          Sign up today or log in to get started!
        </h4>
  
        <Button variant="dark" onClick={() => setShowAuth(true)} >
          Login / Sign Up
        </Button>
  
        {/* Offcanvas Sidebar */}
        <Offcanvas show={showAuth} onHide={() => setShowAuth(false)} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{isLogin ? "Login" : "Sign Up"}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {isLogin ? (
              <Login toggleSignup={() => setIsLogin(false)} onSuccess={handleLoginSuccess}/>
            ) : (
              <SignUp toggleLogin={() => setIsLogin(true)} onSuccess={handleLoginSuccess}/>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    );
  };
  
  export default Landing;