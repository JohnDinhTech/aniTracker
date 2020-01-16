import React from "react";

import { ListItem } from "../list-item/list-item.component";

import "./list-items-container.styles.css";

export const ListItemsContainer = (props) => {
	return (
		<div className='list-container'>
			{props.listItems.map(({ title, image_url, mal_id }) => (
				<ListItem title={title} image_url={image_url} key={mal_id} />
			))}
		</div>
	);
};
