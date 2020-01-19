import React from "react";

import "./progress-bar.styles.css";

export const ProgressBar = ({ color, text, width }) => (
	<div>
		<span>{text}</span>
		<div
			className='progress-bar-background'
			style={{ justifyContent: "left" }}
		>
			<div
				className='progress-bar-foreground'
				style={{ width, backgroundColor: color }}
			></div>
		</div>
	</div>
);
