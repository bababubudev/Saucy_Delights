import React from "react";
import { useState, useEffect } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;


  function onChangeHandler(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmitHandler(e) {
    e.preventDefault();
  }
  return (
    <>
      <section className="form">
        <form onSubmit={onSubmitHandler}>
    
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={onChangeHandler}
          />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={onChangeHandler}
          />

          <button type="submit">Login</button>
        </form>
      </section>
    </>
  );
}

export default Login;
