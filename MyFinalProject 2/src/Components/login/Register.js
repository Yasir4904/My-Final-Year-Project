import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "./design.css";

// here we have the register function 
//use state hook to create the states in smaller parts such as name, emai, passowrd, and confirm password 
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const history = useHistory();

//form will be submitted and its a post request to the backend link "http://localhost:5001/register",
//new user will be created with those details and be stored in the program
  const submitForm = async (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
      cpassword: cpassword,
    };

    try {
      const response = await axios.post("http://localhost:5001/register", newUser);
      console.log(response.data);
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="forms top">
        <div className="container">
          <div className="sign-box">
            <p>
              Don't have an account? Create your account, it takes less than a
              minute.
            </p>
            <form action="" onSubmit={submitForm}>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
              <input
                type="email"
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
              <input
                type="password"
                name="cpassword"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />

              <button type="submit" className="primary-btn">
                Create an Account
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
