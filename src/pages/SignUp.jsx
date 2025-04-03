import { Link } from "react-router-dom";

const SignUpUI = ({ handleSubmit, handleChange }) => (
  <div className="signup-container">
    <h2>Sign Up</h2>
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>
    <p>Already have an account? <Link to="/login">Login here</Link></p>
  </div>
);

export default SignUpUI;