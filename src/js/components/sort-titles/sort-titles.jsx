import React from "react";
import "./sort-titles.styles.css";

import { Checkbox } from "../checkbox/checkbox.component";
import { ArrowButtons } from "../arrow-buttons/arrow-buttons.component";

export const SortTitles = (props) => {
	if (props.mode === "list") {
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
	}
};
