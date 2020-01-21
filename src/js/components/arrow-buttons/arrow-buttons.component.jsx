import React from "react";

import "./arrow-buttons.styles.css";

import upArrow from "../../../img/icons/chevron-up.svg";
import downArrow from "../../../img/icons/chevron-down.svg";

export const ArrowButtons = (props) => (
	<div className='arrow-buttons'>
		<img
			className='up-arrow'
			src={upArrow}
			alt='Up Arrow Icon'
			onClick={() => props.handler()}
		/>
		<img
			className='down-arrow'
			src={downArrow}
			alt='Down Arrow Icon'
			onClick={() => props.handler(true)}
		/>
	</div>
);
