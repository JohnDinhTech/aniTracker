import React from "react";
import "./checkbox.styles.css";

export const Checkbox = (props) => (
	<label className='checkbox'>
		<input
			type='checkbox'
			mal_id={props.mal_id}
			onChange={props.checkboxHandler}
		/>
		<span className='checkmark'></span>
	</label>
);
