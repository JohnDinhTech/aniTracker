import React from "react";

import { Checkbox } from "../checkbox/checkbox.component";

export const ListItem = ({ title, image_url }) => {
	console.log(title);
	return (
		<div className='list-item'>
			<Checkbox />
			<div className='list-title'>
				<img src={image_url} />
				<a>
					<h2>{title}</h2>
				</a>
			</div>
		</div>
	);
};
