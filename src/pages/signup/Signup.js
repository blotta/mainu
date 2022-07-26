import { Link } from "react-router-dom";
import { useState } from "react";
import MainuLogo from "../../components/MainuLogo";
import { useSignup } from "../../hooks/useSignup";

// styles
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    signup(email, password);
  };

  return (
    <>
      <MainuLogo margin="1em" />
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="page-title">Sign up</h2>
        <label>
          <span>Email:</span>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        {isPending && (
          <button className="btn" disabled>
            Signup
          </button>
        )}
        {!isPending && (
          <>
            <button className="btn">Signup</button>
            <Link className="d-block a-plain mt-1"  to="/login">login</Link>
          </>
        )}
        {error && <p className="error">{error}</p> }
      </form>
    </>
  );
}
