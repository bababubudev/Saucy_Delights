import React, { useEffect, ChangeEvent } from "react";
import "../styles/input.scss";

interface InputProps {
  inputTitle: string;
  inputType: string;
  inputPlaceHolder: string;
  inputId: string;
  inputOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputName: string;
  inputValue: string;
  accept?: string;
}

function Input(props: InputProps) {
  return (
    <div className="input">
      <label htmlFor={props.inputId}>{props.inputTitle}</label>
      <input
        type={props.inputType}
        placeholder={props.inputPlaceHolder}
        id={props.inputId}
        onChange={props.inputOnChange}
        value={props.inputValue}
        required
        name={props.inputName}
      />
      <p className="verifying">
        Verifying <span className="loader"></span>
      </p>
    </div>
  );
}

export default Input;
