import React, { useState } from "react";
import { ListItem } from "../list-item/list-item.component";
import { Checkbox } from "../checkbox/checkbox.component";
import { ListTitle } from "../list-item/list-title.component";
import FlipMove from "react-flip-move";
import "./list-items-container.styles.css";

export const ListItemsContainer = (props) => {
	const [data, setData] = useState(props.ListItems);

	return (
		<div className='list-container'>
			<FlipMove
				duration={350}
				enterAnimation='accordionVertical'
				leaveAnimation='accordionVertical'
				typeName='div'
			>
				{props.listItems.map(({ title, image_url, mal_id }) => (
					<div key={mal_id}>
						<ListItem
							title={title}
							image_url={image_url}
							mal_id={mal_id}
							checkboxHandler={props.checkboxHandler}
						/>
					</div>
				))}
			</FlipMove>
		</div>
	);
};
