import React from 'react';
import './TextInput.css';

function TextInput({ label, placeholder, value, onChange, rightText, type = 'text' }) {
  return (
    <label className="input-block">
      {label && <span className="input-label">{label}</span>}
      <span className="input-wrap">
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
        {rightText ? <em>{rightText}</em> : null}
      </span>
    </label>
  );
}

export default TextInput;