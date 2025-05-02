import { Form, Button } from "react-bootstrap";
import { signup } from "../api";  
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = ({ onSuccess, toggleLogin }) => {


  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const handleSignUp = (e) => { 
    e.preventDefault();
    signup(firstName, lastName, email, password)
        .then((res) => {
                localStorage.setItem("auth", true);
                onSuccess();
                localStorage.setItem("token", res.token);
                localStorage.setItem("pipelineList", res.pipelines);
                localStorage.setItem("pipelineListx", res.pipelinesX);
                localStorage.setItem("userId", res.user.userId);
                console.log(res.token);
                window.location.reload(); //force reload of nav
        })
  }
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter full name" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter full name" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" />
      </Form.Group>
      <Button variant="dark" className="w-100" onClick={handleSignUp}>
        Sign Up
      </Button>
      <p className="text-center mt-3">
        Already have an account?{" "}
        <span
          className="text-primary"
          style={{ cursor: "pointer" }}
          onClick={toggleLogin}
        >
          Login
        </span>
      </p>
    </Form>
  );
};

export default SignUp;