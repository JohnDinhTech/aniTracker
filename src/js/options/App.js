import React, { Component } from "react";

import { SideMenu } from "../components/side-menu/side-menu.component";
import ChromeStorage from "../modules/ChromeStorage";
import "./App.css";

import homeIcon from "../../img/icons/home.svg";
import copyIcon from "../../img/icons/copy.svg";
import heartIcon from "../../img/icons/heart.svg";
import settingsIcon from "../../img/icons/settings.svg";

import Modal from "../components/modal/modal.classComponent";

class App extends Component {
	constructor() {
		super();

		this.storage = new ChromeStorage();

		this.state = {
			currentView: "home",
			listItems: [],
			selected: {}
		};

		this.links = [
			{
				icon: homeIcon,
				iconAlt: "Home Icon",
				text: "Home",
				className: "home-icon",
				key: "home"
			},
			{
				icon: copyIcon,
				iconAlt: "Copy Icon",
				text: "Sync With MyAnimeList",
				className: "copy-icon",
				key: "sync"
			},
			{
				icon: heartIcon,
				iconAlt: "Heart Icon",
				text: "Support",
				className: "heart-icon",
				key: "support"
			},
			{
				icon: settingsIcon,
				iconAlt: "Settings Icon",
				text: "Settings",
				className: "settings-icon",
				key: "settings"
			}
		];
	}

	async componentDidMount() {
		if (await this.storage.get("selection")) {
			this.setState({
				currentView: "selection"
			});
			this.storage
				.getLocal("selected")
				.then((selected) => this.setState({ selected }));
		} else {
		}
	}

	handleLinkClick = (e) => {
		this.setState({ currentView: e.target.getAttribute("view") });
	};

	render() {
		return (
			<div className='App'>
				<SideMenu
					links={this.links}
					currentView={this.state.currentView}
					handleLinkClick={this.handleLinkClick}
				/>
				{this.state.currentView === "home" && (
					<Modal mode='home' listItems={this.state.listItems} />
				)}
				{this.state.selected && (
					<Modal
						mode='selection'
						listItems={this.state.selected.searchResults}
					/>
				)}
			</div>
		);
	}
}

export default App;
