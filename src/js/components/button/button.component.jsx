import React from "react";

import "./button.styles.css";

const getStyle = (outline, color, showButton) => {
	const outlineStyle = outline
		? {
				backgroundColor: "transparent",
				color: color,
				border: `2px solid ${color}`,
				transition: "all linear 200ms",
				padding: "10px 40px"
		  }
		: { backgroundColor: color };

	if (showButton) {
		return { ...outlineStyle, ...showButton.style };
	} else {
		return outlineStyle;
	}
};

export const Button = ({
	text,
	outline,
	color,
	handler,
	mal_id,
	showButton
}) => (
	<button
		style={getStyle(outline, color, showButton)}
		className='button'
		onClick={handler}
		mal_id={mal_id}
	>
		{text}
	</button>
);
