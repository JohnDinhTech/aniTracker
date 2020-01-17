import React from "react";
import "./search-bar.styles.css";

import searchIcon from "../../../img/icons/search.svg";

export const SearchBar = (props) => {
	if (props.mode === "home") {
		return (
			<div className='searchbar-container'>
				<img src={searchIcon} alt='Magnifying Glass Icon' />
				<input
					type='search'
					placeholder='Search Anime By Title'
					onChange={props.onChangeHandler}
				/>
			</div>
		);
	} else {
		return (
			<div className='searchbar-container' style={{ display: "block" }}>
				<img
					src={searchIcon}
					alt='Magnifying Glass Icon'
					style={{ left: "5%" }}
				/>
				<input
					type='search'
					placeholder='Search Anime By Title'
					style={{ textAlign: "center", width: "100%" }}
				/>
			</div>
		);
	}
};
