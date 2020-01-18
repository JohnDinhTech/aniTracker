import React from "react";

import "./list-item.styles.css";

import { Checkbox } from "../checkbox/checkbox.component";
import { ListTitle } from "./list-title.component";
import { Button } from "../button/button.component";

export const ListItem = ({
	title,
	image_url,
	mal_id,
	checkboxHandler,
	totalEpisodes,
	url,
	selectHandler,
	episodeCount,
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
					<div>{episodeCount}</div>
				</div>
			);
		case "selection":
			return (
				<div className='list-item-selection'>
					<ListTitle title={title} image_url={image_url} />
					<div>{totalEpisodes === 0 ? "Unkown" : totalEpisodes}</div>
					<div>
						<a className='mal-link' href={url}>
							MyAnimeList
						</a>
					</div>
					<div>
						<Button
							color='#11cdef'
							text='Select'
							handler={selectHandler}
							mal_id={mal_id}
						/>
					</div>
				</div>
			);
		default:
			return <div></div>;
	}
};
