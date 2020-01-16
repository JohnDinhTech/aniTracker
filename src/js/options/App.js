import React, { Component } from "react";

import { SideMenu } from "../components/side-menu/side-menu.component";
import "./App.css";

import homeIcon from "../../img/icons/home.svg";
import copyIcon from "../../img/icons/copy.svg";
import heartIcon from "../../img/icons/heart.svg";
import settingsIcon from "../../img/icons/settings.svg";

import Modal from "../components/modal/modal.classComponent";

class App extends Component {
	constructor() {
		super();

		this.state = {
			currentView: "home",
			listItems: [
				{
					episodeCount: 8,
					episodeTotal: 10,
					image_url:
						"https://cdn.myanimelist.net/images/anime/1739/101117.jpg?s=ff72930b88ed36269078b82f9ff9fcdc",
					mal_id: 37985,
					title: "Aggressive Retsuko (ONA) 2nd Season",
					url:
						"https://myanimelist.net/anime/37985/Aggressive_Retsuko_ONA_2nd_Season",
					urlTitle: ["Aggressive Retsuko Ona 2nd Season"],
					watchUrl:
						"https://gogoanime.video/aggressive-retsuko-ona-2nd-season-episode-8"
				},
				{
					episodeCount: 1,
					episodeTotal: 0,
					image_url:
						"https://cdn.myanimelist.net/images/anime/1075/104854.jpg?s=23baccca49ae62a12f702c45b8392442",
					mal_id: 35252,
					title: "Hatena☆Illusion",
					url: "https://myanimelist.net/anime/35252/Hatena☆Illusion",
					urlTitle: ["Hatenaillusion"],
					watchUrl: "https://gogoanime.video/hatenaillusion-episode-1"
				},
				{
					episodeCount: 1,
					episodeTotal: 0,
					image_url:
						"https://cdn.myanimelist.net/images/anime/1764/104365.jpg?s=ed7287aa70c41ed6aa7002c06eb53c0f",
					mal_id: 38909,
					title: "Infinite Dendrogram",
					url:
						"https://myanimelist.net/anime/38909/Infinite_Dendrogram",
					urlTitle: ["Infinite Dendrogram"],
					watchUrl:
						"https://gogoanime.video/infinite-dendrogram-episode-2"
				},
				{
					episodeCount: 1,
					episodeTotal: 0,
					image_url:
						"https://cdn.myanimelist.net/images/anime/1716/104880.jpg?s=5f122477e8eaae952f3ca083802e3e9e",
					mal_id: 38924,
					title: "Nekopara",
					url: "https://myanimelist.net/anime/38924/Nekopara",
					urlTitle: ["Nekopara"],
					watchUrl: "https://gogoanime.video/nekopara-episode-1"
				},
				{
					episodeCount: 11,
					episodeTotal: 20,
					image_url:
						"https://cdn.myanimelist.net/images/anime/1568/90241.jpg?s=21d460eb158ba684259bd4c6ca3364a6",
					mal_id: 37187,
					title: "Kuiba Yao Xia Zhuan",
					url:
						"https://myanimelist.net/anime/37187/Kuiba_Yao_Xia_Zhuan",
					urlTitle: ["Ni Zhuan Ci Yuan Ai Jue Qi"],
					watchUrl:
						"https://gogoanime.video/ni-zhuan-ci-yuan-ai-jue-qi-episode-11"
				},
				{
					episodeCount: 13,
					episodeTotal: 24,
					image_url:
						"https://cdn.myanimelist.net/images/anime/1546/103418.jpg?s=867faa8e1ea7a2aaf0edf99f6afbf8df",
					mal_id: 39701,
					title: "Nanatsu no Taizai: Kamigami no Gekirin",
					url:
						"https://myanimelist.net/anime/39701/Nanatsu_no_Taizai__Kamigami_no_Gekirin",
					urlTitle: ["Nanatsu No Taizai Kamigami No Gekirin"],
					watchUrl:
						"https://gogoanime.video/nanatsu-no-taizai-kamigami-no-gekirin-episode-13"
				},
				{
					episodeCount: 1,
					episodeTotal: 0,
					image_url:
						"https://cdn.myanimelist.net/images/anime/1001/102512.jpg?s=697361e09466597fef472dcc6611d63a",
					mal_id: 40230,
					title: "Housekishou Richard-shi no Nazo Kantei",
					url:
						"https://myanimelist.net/anime/40230/Housekishou_Richard-shi_no_Nazo_Kantei",
					urlTitle: ["Housekishou Richard Shi No Nazo Kantei"],
					watchUrl:
						"https://gogoanime.video/housekishou-richard-shi-no-nazo-kantei-episode-1"
				},
				{
					episodeCount: 1,
					episodeTotal: 1,
					image_url:
						"https://cdn.myanimelist.net/images/anime/7/83694.jpg?s=20114720633e9da96194db27be09ec6a",
					mal_id: 33363,
					title: '"Eiyuu" Kaitai',
					url: "https://myanimelist.net/anime/33363/Eiyuu_Kaitai",
					urlTitle: ["Eiyuu Kaitai"],
					watchUrl: "https://gogoanime.video/eiyuu-kaitai-episode-1"
				},
				{
					episodeCount: 19,
					episodeTotal: 0,
					image_url:
						"https://cdn.myanimelist.net/images/anime/1480/92990.jpg?s=69859c186f3fcf49020f89909194dafe",
					mal_id: 37885,
					title: "Dragon Ball Heroes",
					url:
						"https://myanimelist.net/anime/37885/Dragon_Ball_Heroes",
					urlTitle: ["Dragon Ball Heroes"],
					watchUrl:
						"https://gogoanime.video/dragon-ball-heroes-episode-19"
				}
			]
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
				<Modal />
				{/* {this.state.currentView === "home" && <Button />} */}
			</div>
		);
	}
}

export default App;
