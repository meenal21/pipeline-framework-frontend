import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const SignUp = ({ toggleLogin }) => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder="Enter full name" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Create a password" />
      </Form.Group>
      <Button variant="dark" className="w-100">
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