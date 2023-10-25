import React from "react";

import { useState, useEffect } from "react";
import Input from "../components/Input";
import "../styles/login.scss";
import "../styles/global.scss";

function Register() {
  const [matchedPassword, setMatchedPassword] = useState(true);
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

  async function onSubmitHandler(e) {
    e.preventDefault();
    if (password !== password2) {
      setMatchedPassword(false);
      console.log(matchedPassword)
      return;
    }
    console.log("hello");
    await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  }
  return (
    <>
      <section className="form">
        <form onSubmit={onSubmitHandler}>
          <Input
            inputTitle="Email"
            inputType="text"
            inputPlaceHolder="example@gmail.com"
            inputId="register-email"
            inputValue={email}
            inputOnChange={onChangeHandler}
            inputName="email"
          ></Input>

          <Input
            inputTitle="Password"
            inputType="password"
            inputPlaceHolder="Your password"
            inputId="register-password"
            inputValue={password}
            inputName="password"
            inputOnChange={onChangeHandler}
          ></Input>
          <Input
            inputTitle="Confirm Password"
            inputType="password"
            inputPlaceHolder="Confirm Your Password"
            inputId="register-password2"
            inputValue={password2}
            inputName="password2"
            inputOnChange={onChangeHandler}
          ></Input>
          {!matchedPassword && (
            <p style={{ marginLeft: "2rem"}}>
              Passwords do not match
            </p>
          )}
          <button
            type="submit"
            className="button"
            style={{ marginTop: "1rem", marginLeft: "2rem" }}
          >
            Register
          </button>
        </form>
      </section>
    </>
  );
}

export default Register;
