import React from "react";

import "./button.styles.css";

export const Button = ({ text, outline, color, handler }) => (
	<button
		style={
			outline
				? {
						backgroundColor: "transparent",
						color: color,
						border: `2px solid ${color}`,
						transition: "all linear 200ms",
						padding: "10px 40px"
				  }
				: { backgroundColor: color }
		}
		className='button'
		onClick={handler}
	>
		{text}
	</button>
);
