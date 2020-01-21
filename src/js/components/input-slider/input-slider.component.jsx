import React from "react";

import "./input-slider.styles.css";

export const InputSlider = (props) => (
	<label className='switch'>
		<input
			type='checkbox'
			checked={props.tracking}
			onChange={props.checkHandler}
		/>
		<span className='slider'></span>
	</label>
);
