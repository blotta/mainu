import { Link } from "react-router-dom";
import { useState } from "react";
import MainuLogo from "../../components/MainuLogo";

import { useLogin } from "../../hooks/useLogin";

// styles
import "../signup/Signup.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isPending, error: loginError } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <MainuLogo margin="1em" />
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="page-title">Log in</h2>
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
          <>
            <button className="btn" disabled>
              Login
            </button>
          </>
        )}
        {!isPending && (
          <>
            <button className="btn">Login</button>
            <Link className="d-block a-plain mt-1"  to="/signup">signup</Link>
          </>
        )}
        {loginError && <p className="error">Failed to login</p>}
      </form>
    </>
  );
}
