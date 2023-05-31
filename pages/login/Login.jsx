import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import newRequest from "../../utils/newRequest";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (username !== "admin" && password !== "123") {
        const res = await newRequest.post("/auth/login", { username, password });
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        navigate("/");
      } else {
        navigate("/admin");
      }
    } catch (err) {
      setError(err.response.data);
      console.log(err.response.data);
    }
  };

  return (
    <div className="login">
      <div>
        <LoginSocialGoogle
          client_id={"237475897877-3n6169vpq7mbag40c4l6e3h81johuetm.apps.googleusercontent.com"}
          scope="openid profile email"
          discoveryDocs="claims_supported"
          access_type="offline"
          onResolve={({ provider, data }) => {
            console.log(provider, data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <GoogleLoginButton />
        </LoginSocialGoogle>
      </div>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <span>{error}</span>}
      </form>
    </div>
  );
}

export default Login;
