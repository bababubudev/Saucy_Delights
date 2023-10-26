import React from "react";
import { useState, useEffect } from "react";
import Input from "../components/Input";
import "../styles/login.scss";
import "../styles/global.scss";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [correctLogin, setCorrectLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { email, password } = formData;

  function onChangeHandler(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.status !== 200) {
      setCorrectLogin(false);
      return;
    }
    setIsLoggedIn(true);
  }
  return (
    <>
      <h1>Login</h1>
      <section className="form">
        <form onSubmit={onSubmitHandler}>
          <Input
            inputTitle="Email"
            inputType="text"
            inputPlaceHolder="example@gmail.com"
            inputId="login-email"
            inputValue={email}
            inputOnChange={onChangeHandler}
            inputName="email"
          ></Input>

          <Input
            inputTitle="Password"
            inputType="password"
            inputPlaceHolder="Your password"
            inputId="login-password"
            inputValue={password}
            inputName="password"
            inputOnChange={onChangeHandler}
          ></Input>

          {!correctLogin && (
            <p style={{ color: "red", marginLeft:"2rem" }}>Incorrect email or password</p>
          )}
          <button
            type="submit"
            className="button"
            style={{ marginTop: "1rem", marginLeft: "2rem" }}
          >
            Login
          </button>
        </form>
      </section>
    </>
  );
}

export default Login;
