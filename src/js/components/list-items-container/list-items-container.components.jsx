import React, { useState } from "react";
import { ListItem } from "../list-item/list-item.component";
import FlipMove from "react-flip-move";
import "./list-items-container.styles.css";

export const ListItemsContainer = (props) => {
	console.log(props.mode);
	if (props.mode === "home") {
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
	} else {
		console.log(props.listItems);
		return <div className='list-container'></div>;
	}
};
