import React, { useState } from 'react';
 
function LoginForm() {
  const [details, setDetails] = useState({ name: "", email: "", password: "" });

  const submitHandler = e => {
    e.preventDefault();
    Login(details);
  }

  const adminUser = {
    email: "admin@gmail.com",
    password: "admin"
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const Login = details => {
    console.log(details);
    if (details.email === adminUser.email && details.password === adminUser.password) {
      console.log("loggedin");
      setUser({
        name: details.name,
        email: details.email
      });
    } else {
      console.log("not matched");
      setErrorMessage("Username or password is incorrect");
    }
  };

  const handleLogout = () => {
    setUser({ name: "", email: "" });
  };

  const Layout = () => {
    return (
      <>
        {user.email !== "" ? (
          <div className="welcome">
            <h2>Welcome</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="form-inner">
              {errorMessage !== "" && <div className="error">{errorMessage}</div>}
              <div className="form-inner">
                <label htmlFor="name">Username:</label>
                <input type="text" name="name" id="name" autoComplete="username" value={details.name} onChange={e => setDetails({ ...details, name: e.target.value })} />
              </div>
              <div className="form-inner">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" autoComplete="username" value={details.email} onChange={e => setDetails({ ...details, email: e.target.value })} />
              </div>
              <div className="form-inner">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" autoComplete="current-password" value={details.password} onChange={e => setDetails({ ...details, password: e.target.value })} />
              </div>
              <input type="submit" onClick={Login} value="LOGIN" />
            </div>
          </form>
        )}
      </>
    );
  };

  return <Layout />;
}

export default LoginForm;