import React from 'react';
import './TextInput.css';

function TextInput({ label, rightText, type = 'text', ...inputProps }) {
  return (
    <label className="input-block">
      {label && <span className="input-label">{label}</span>}
      <span className="input-wrap">
        <input type={type} {...inputProps} />
        {rightText ? <em>{rightText}</em> : null}
      </span>
    </label>
  );
}

export default TextInput;