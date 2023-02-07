import React from "react";
import { useState, useEffect } from "react";
import Input from "../components/Input";

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
          <Input
            inputTitle="Email"
            inputType="text"
            inputPlaceHolder="example@gmail.com"
            inputId="login-email"
            inputValue={email}
          ></Input>
        
          <Input
            inputTitle="Password"
            inputType="password"
            inputPlaceHolder=""
            inputId="login-password"
            inputValue={password}
          ></Input>
        

          <button type="submit">Login</button>
        </form>
      </section>
    </>
  );
}

export default Login;
