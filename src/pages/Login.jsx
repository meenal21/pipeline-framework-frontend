import { useState }  from "react";
import { useNavigate } from 'react-router-dom'
import { Form, Button } from "react-bootstrap";

const Login = ({toggleSignup}) => {

        const [ email, setEmail ] = useState("");
        const [ password, setPassword ] = useState("");
        const navigate = useNavigate();

        const handleLogin = (e) =>  {
            e.preventDefault();
            if ( email === "mpbjain@gmail.com" && password === "12345"){
                localStorage.setItem("auth", true);
                navigate("/createpipeline");
                window.location.reload(); //force reload of nav
            }
            else{
                alert("Invalid creds");
            }
        };
        return (
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                </Form.Group>
                <Button variant="primary" className="w-100" onClick={handleLogin}>
                    Login
                </Button>
                <p className="text-center mt-3">
                    Don't have an account?{" "}
                    <span
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={toggleSignup}
                    >
                    Sign Up
                    </span>
                </p>
            </Form>
    )
}

export default Login;