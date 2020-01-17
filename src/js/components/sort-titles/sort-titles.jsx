import React from "react";
import "./sort-titles.styles.css";

import { Checkbox } from "../checkbox/checkbox.component";
import { ArrowButtons } from "../arrow-buttons/arrow-buttons.component";

export const SortTitles = (props) => {
	if (props.mode === "home") {
		return (
			<div className='sort-titles'>
				<Checkbox />
				{props.titles.map((title) => {
					if (title.buttons) {
						return (
							<h3 key={title.text}>
								{title.text}
								<ArrowButtons />
							</h3>
						);
					} else {
						return (
							<h3 key={title.text} style={{ marginTop: "17px" }}>
								{title.text}
							</h3>
						);
					}
				})}
			</div>
		);
	} else {
		return (
			<div
				className='sort-titles'
				style={{ gridTemplateColumns: "25% 25% 15% 35%" }}
			>
				{props.titles.map((title) => {
					if (title.buttons) {
						return (
							<h3 key={title.text}>
								{title.text}
								<ArrowButtons />
							</h3>
						);
					} else {
						return (
							<h3 key={title.text} style={{ marginTop: "17px" }}>
								{title.text}
							</h3>
						);
					}
				})}
			</div>
		);
	}
};
