import React from "react";

import "./list-item.styles.css";

import { Checkbox } from "../checkbox/checkbox.component";
import { ListTitle } from "./list-title.component";
import { Button } from "../button/button.component";
import { StatusDot } from "../status-dot/status-dot.components";
import { ProgressBar } from "../progress-bar/progress-bar.component";

const calculateStatus = (episodeCount, episodeTotal) => {
	if (episodeTotal === 0) {
		return {
			status: "Watching",
			completion: "?%",
			progressBarWidth: 0,
			progressColor: "#11cdef"
		};
	} else if (episodeCount === episodeTotal) {
		return {
			status: "Completed",
			completion: "100%",
			progressBarWidth: "100%",
			progressColor: "#2DCE98"
		};
	} else {
		return {
			status: "Watching",
			completion: Math.ceil((episodeCount / episodeTotal) * 100),
			progressBarWidth: `${Math.ceil(
				(episodeCount / episodeTotal) * 100
			)}%`,
			progressColor: "#11cdef"
		};
	}
};

export const ListItem = ({
	title,
	image_url,
	mal_id,
	checkboxHandler,
	totalEpisodes,
	url,
	selectHandler,
	episodeCount,
	episodeTotal,
	watchUrl,
	mode
}) => {
	switch (mode) {
		case "home":
			const statusData = calculateStatus(episodeCount, episodeTotal);
			return (
				<div className='list-item'>
					<Checkbox
						mal_id={mal_id}
						checkboxHandler={checkboxHandler}
					/>
					<ListTitle
						title={title}
						image_url={image_url}
						watchUrl={watchUrl}
					/>
					<div>
						<span>{episodeCount}</span>/
						{episodeTotal === 0 ? "?" : episodeTotal}
					</div>
					<div>
						<StatusDot color={statusData.progressColor} />
						<span>{statusData.status}</span>
					</div>
					<ProgressBar
						color={statusData.progressColor}
						text={statusData.completion}
						width={statusData.progressBarWidth}
					/>
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
