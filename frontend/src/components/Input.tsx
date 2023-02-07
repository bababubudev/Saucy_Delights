import React, { useEffect } from "react";
import "../styles/input.scss";

interface InputProps {
  inputTitle: string;
  inputType: string;
  inputPlaceHolder: string;
  inputId: string;
  //   inputOnChange: string;
  inputValue: string;
  accept?: string;
}

function Input(props: InputProps) {
  return (
    <div className="input">
      <label for={props.inputId}>{props.inputTitle}</label>
      <input
        type={props.inputType}
        placeholder={props.inputPlaceHolder}
        id={props.inputId}
        // onChange={props.inputOnChange}
        value={props.inputValue}
        required
      />
      <p className="verifying">
        Verifying <span className="loader"></span>
      </p>
    </div>
  );
}

export default Input;
