import React, { Component } from "react";

import ChromeStorage from "../../modules/ChromeStorage";

import { SearchBar } from "../search-bar/search-bar.component";
import { SortTitles } from "../sort-titles/sort-titles";
import { ListItemsContainer } from "../list-items-container/list-items-container.components";
import { Button } from "../button/button.component";
import "./modal.styles.css";

class Modal extends Component {
	constructor(props) {
		super(props);

		this.storage = new ChromeStorage();

		this.state = {
			renderList: props.listItems,
			mode: props.mode,
			selectedItems: [],
			searching: false,
			editState: false
		};

		this.header = {
			text: "Your List",
			style: { marginLeft: "5%", marginRight: "2%" }
		};

		this.titles = [
			{ text: "Title", buttons: false },
			{ text: "Episodes Watched", buttons: true },
			{ text: "Status", buttons: false },
			{ text: "Completion", buttons: true }
		];
	}

	filterList = (e) => {
		const term = e.target.value;
		const filteredList = this.props.listItems.filter((item) =>
			item.title.toLowerCase().includes(term.toLowerCase())
		);
		if (!this.state.searching) {
			this.setState({ searching: true });
		}
		this.setState({ renderList: filteredList });
	};

	addSelected = (e) => {
		let selectedItems = [...this.state.selectedItems];
		const mal_id = parseInt(e.target.getAttribute("mal_id"));
		if (e.target.checked) {
			selectedItems.push(mal_id);
		} else {
			selectedItems.splice(selectedItems.indexOf(mal_id), 1);
		}
		this.setState({ selectedItems: selectedItems });
	};

	deleteSelected = () => {
		const renderList = this.state.renderList.filter(
			(anime) => !this.state.selectedItems.includes(anime.mal_id)
		);
		this.storage.saveList(renderList);
		this.setState({ renderList }, () => {
			chrome.tabs.query(
				{
					active: true,
					currentWindow: true
				},
				(tabs) => {
					chrome.tabs.reload(tabs[0].id);
				}
			);
		});
	};

	editNumberHandler = (e) => {
		if (
			e.target.value === "" ||
			e.target.value < parseInt(e.target.getAttribute("min"))
		) {
			e.target.value = 1;
		} else if (
			e.target.value > parseInt(e.target.getAttribute("max")) &&
			parseInt(e.target.getAttribute("max")) !== 0
		) {
			e.target.value = parseInt(e.target.getAttribute("max"));
		} else if (e.target.value > 2500) {
			e.target.value = 2500;
		}
		const renderList = this.state.renderList;
		const mal_id = parseInt(e.target.getAttribute("mal_id"));
		const matchingAnime = renderList.find(
			(anime) => anime.mal_id === mal_id
		);
		matchingAnime.episodeCount = e.target.value;
		this.setState({ renderList });
		console.log(this.state.renderList);
	};

	editButtonHandler = () => {
		if (this.state.editState) {
			this.storage.saveList(this.state.renderList);
		}
		this.setState((prevState) => ({
			editState: !prevState.editState
		}));
	};

	componentDidUpdate() {
		if (
			this.props.listItems !== this.state.renderList &&
			!this.state.searching
		) {
			this.setList(this.props.listItems);
		} else if (this.props.mode !== this.state.mode) {
			this.titles = [
				{ text: "Title" },
				{ text: "Total Episodes" },
				{ text: "Link to MAL" }
			];

			this.header = {
				text:
					"Select the anime you're about to watch! (We only show this once for each anime)",
				style: { width: "100%", textAlign: "center" }
			};

			this.setState({ mode: this.props.mode });
		}
	}

	selectAllHandler = (e) => {
		const selectedItems = this.state.selectedItems;
		if (e.target.checked) {
			this.state.renderList.forEach((anime) => {
				selectedItems.push(anime.mal_id);
			});
			this.setState({ selectedItems });
		} else {
			this.setState({ selectedItems: [] });
		}
	};

	setList(renderList) {
		this.setState({ renderList });
	}

	render() {
		switch (this.state.mode) {
			case "home":
				return (
					<div className='modal-container'>
						<h1 style={this.header.style}>{this.header.text}</h1>
						<SearchBar
							mode={this.state.mode}
							onChangeHandler={this.filterList}
						/>
						<Button
							text={this.state.editState ? "Done" : "Edit"}
							color='#7764e4'
							outline={!this.state.editState}
							handler={this.editButtonHandler}
						/>
						<Button
							text='Delete'
							color='#cc3f29'
							outline={false}
							handler={this.deleteSelected}
							showButton={
								this.state.selectedItems.length > 0
									? {
											style: {
												opacity: 1,
												cursor: "pointer"
											},
											disabled: false
									  }
									: {
											style: {
												opacity: 0,
												cursor: "context-menu"
											},
											disabled: true
									  }
							}
						/>
						<SortTitles
							mode={this.state.mode}
							titles={this.titles}
							selectAllHandler={this.selectAllHandler}
						/>
						<ListItemsContainer
							listItems={this.state.renderList}
							checkboxHandler={this.addSelected}
							mode={this.state.mode}
							selectedItems={this.state.selectedItems}
							editState={this.state.editState}
							editNumberHandler={this.editNumberHandler}
						/>
					</div>
				);
			case "selection":
				return (
					<div className='modal-container'>
						<h1 style={this.header.style}>{this.header.text}</h1>
						<SearchBar
							mode={this.state.mode}
							onChangeHandler={this.filterList}
						/>
						<SortTitles
							mode={this.state.mode}
							titles={this.titles}
						/>
						<ListItemsContainer
							mode={this.state.mode}
							listItems={this.state.renderList}
							checkboxHandler={this.addSelected}
							selectHandler={this.props.selectHandler}
						/>
					</div>
				);
			default:
				return <div></div>;
		}
	}
}

export default Modal;
