import React from "react";
import "./checkbox.styles.css";

export const Checkbox = () => (
	<label className='checkbox'>
		<input type='checkbox' />
		<span className='checkmark'></span>
	</label>
);
