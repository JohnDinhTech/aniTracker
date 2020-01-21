import React from "react";

import "./list-title.styles.css";

export const ListTitle = ({ image_url, title, watchUrl, style }) => (
	<div className='list-title' style={style}>
		<img src={image_url} />

		<a href={watchUrl} target='_blank'>
			<h2>{title}</h2>
		</a>
	</div>
);
