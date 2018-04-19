import React from 'react';
import './Button.scss';

const Button = (props) => (
    <button type="submit" className="button-style" onClick={props.onClick} style={{width: props.width || 'auto' }}>
        <p>{props.text} </p>
    </button>
);

export default Button;