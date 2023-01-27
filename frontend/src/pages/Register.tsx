import React from "react";

import { useState, useEffect } from "react";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const { email, password, password2 } = formData;

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
          <input
            type="password"
            id="password2"
            name="password2"
            value={password2}
            placeholder="Confirm Your Password"
            onChange={onChangeHandler}
          />
          <button type="submit">Register</button>
        </form>
      </section>
    </>
  );
}

export default Register;
