import React from "react";

import "./list-item.styles.css";

import { Checkbox } from "../checkbox/checkbox.component";
import { ListTitle } from "./list-title.component";

export const ListItem = ({ title, image_url }) => {
	console.log(title);
	return (
		<div className='list-item'>
			<Checkbox />
			<ListTitle title={title} image_url={image_url} />
		</div>
	);
};
