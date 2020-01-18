import React from "react";

import "./list-item.styles.css";

import { Checkbox } from "../checkbox/checkbox.component";
import { ListTitle } from "./list-title.component";

export const ListItem = ({
	title,
	image_url,
	mal_id,
	checkboxHandler,
	mode
}) => {
	switch (mode) {
		case "home":
			return (
				<div className='list-item'>
					<Checkbox
						mal_id={mal_id}
						checkboxHandler={checkboxHandler}
					/>
					<ListTitle title={title} image_url={image_url} />
				</div>
			);
		case "selection":
			return (
				<div className='list-item-selection'>
					<ListTitle title={title} image_url={image_url} />
				</div>
			);
	}
};
