import React from 'react';

const Cell = ({ id, name, text, value, checked, onChange }) => (
    <label htmlFor={id}>
	<input
	    type="radio"
	    id={id}
	    name={name}
	    value={value}
	    onChange={onChange}
	    checked={checked}
	/>
	<span>{text}</span>
    </label>
);

function ExpressionControls({ controlOptions, changeOptions }) {
    return (
	<div className="controls">
	</div>
    );
}

export default ExpressionControls;
