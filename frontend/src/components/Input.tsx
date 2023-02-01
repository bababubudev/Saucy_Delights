import React, { useEffect } from "react";
import "../styles/input.scss"

interface InputProps {
  inputTitle: string;
  inputType: string;
  inputPlaceHolder: string;
  inputId: string;
  //   inputOnChange: string;
  inputValue: string;
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
      <p>Verifying <div className="lds-spinner"></div></p>
    </div>
  );
}

export default Input;
