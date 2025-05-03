import { useState }  from "react";
import { useNavigate } from 'react-router-dom'
import { Form, Button } from "react-bootstrap";
import { login } from "../api";

const Login = ({onSuccess, toggleSignup}) => {

        const [ email, setEmail ] = useState("");
        const [ password, setPassword ] = useState("");

        const handleLogin = (e) => {
            e.preventDefault();
        
            login(email, password)
                .then((res) => {
                    if (res.status === 200) {
                        return res.json();  // return the parsed JSON
                    } else {
                        throw new Error("Invalid credentials");
                    }
                    
                })
                .then((data) => {
                    // add if data.message exists then error!
                    localStorage.setItem("auth", true);
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("userId", data.user.userId);
                    localStorage.setItem("pipelineList", JSON.stringify(data.pipelines));
                    localStorage.setItem("pipelineListx", JSON.stringify(data.pipelinesX));
                    
                    onSuccess();
                    localStorage.setItem('user', JSON.stringify(data.user));
                    //window.location.reload();
                    console.log("Login successful:", data);
                })
                .catch((err) => {
                    console.error("Login failed:", err);
                    alert("Login failed: " + err.message);
                });
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
                <Button variant="dark" className="w-100" onClick={handleLogin}>
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