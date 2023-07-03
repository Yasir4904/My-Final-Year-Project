import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "./design.css";
// here we have the login function that has two props SetLoggedIn and setUserName
//use state hook to create the states in smaller parts such as emai, passowrd, error and login status
const Login = ({ setLoggedIn, setUserName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const history = useHistory();
  
// the form is a post request to the backend server link "http://localhost:5001/login"
// if successful the users data will be added to the local storage and their login will be set to success
// so IsLoggedIn will be set to true 
  const submitForm = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
  //sends a post request with the users details. if the request is successful it will store user information in the local storage
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data)); // store data in localStorage
        setLoginStatus("success");
        setLoggedIn(true); // setLoggedIn state to true
        setUserName(data.name); // setUserName state to the user's name
        history.push("/"); // redirect to the  home page
      } else {
        setError(data.message);
        setLoginStatus("failed");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred");
      setLoginStatus("failed");
    }
  };

  return (
    <>
    
      <section className="forms top">  
        <div className="container">
          <div className="sign-box">
            {loginStatus === "success" ? (
              <p className="login-message success">Login successful!</p>
            ) : loginStatus === "failed" ? (
              <p className="login-message failed">
                Login failed. Please try again.
              </p>
            ) : null}
            <form onSubmit={submitForm}>
              <h1>Login</h1>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />

              <div className="flex_space">
                <div className="flex">
                  <input type="checkbox" />
                  <label>Remember Me</label>
                </div>
                <div className="flex">
                  <span>I forgot my password</span>
                </div>
              </div>

              <button type="submit" className="primary-btn">
                Sign In
              </button>
              <p>
                Don't have account? <Link to="/register">Signup!</Link>
              </p>
              {error && <p className="error">{error}</p>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
