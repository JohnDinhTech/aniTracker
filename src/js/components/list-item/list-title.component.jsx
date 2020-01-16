import React from "react";

import "./list-title.styles.css";

export const ListTitle = ({ image_url, title }) => (
	<div className='list-title'>
		<img src={image_url} />

		<a href='#'>
			<h2>{title}</h2>
		</a>
	</div>
);
