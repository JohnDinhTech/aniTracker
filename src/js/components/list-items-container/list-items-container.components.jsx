import React, { useState } from "react";
import { ListItem } from "../list-item/list-item.component";
import FlipMove from "react-flip-move";
import "./list-items-container.styles.css";

export const ListItemsContainer = (props) => {
	if (props.listItems.length > 0) {
		return (
			<div className='list-container'>
				<FlipMove
					duration={350}
					enterAnimation='accordionVertical'
					leaveAnimation='accordionVertical'
					typeName='div'
				>
					{props.listItems.map(
						({
							title,
							image_url,
							mal_id,
							episodes,
							url,
							episodeTotal,
							episodeCount,
							watchUrl
						}) => (
							<div key={mal_id} className='item'>
								<ListItem
									title={title}
									image_url={image_url}
									mal_id={mal_id}
									checkboxHandler={props.checkboxHandler}
									mode={props.mode}
									totalEpisodes={episodes}
									url={url}
									selectHandler={props.selectHandler}
									episodeCount={episodeCount}
									episodeTotal={episodeTotal}
									watchUrl={watchUrl}
								/>
							</div>
						)
					)}
				</FlipMove>
			</div>
		);
	} else {
		return <div></div>;
	}
};
