import ChromeStorage from "./ChromeStorage";
import jikanjs from "jikanjs";
class ChromeTabs {
	constructor() {
		this.storage = new ChromeStorage();
	}

	listenToUrl() {
		chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
			const isTracking = await this.storage.get("tracking");
			const isCompatible = tab.url.toLowerCase().includes("episode");
			console.log(isTracking);
			if (
				isCompatible &&
				isTracking &&
				changeInfo.status === "complete"
			) {
				const url = tab.url.toLowerCase();
				const episodeNumberUrl = url.match(/episode\D+\d+/g);
				const episodeNumber = parseInt(
					episodeNumberUrl[0].match(/\d+/g)
				);
				const baseUrlLength = url.match(/\w+:\/\/[\w+.]+\//g)[0].length;
				let titleName = url.slice(
					baseUrlLength,
					url.indexOf(episodeNumberUrl) - 1
				);
				titleName = titleName
					.replace(/-/g, " ")
					.split(" ")
					.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
					.join(" ");

				this.openSelection(
					titleName,
					episodeNumber,
					url,
					episodeNumberUrl
				);
			}
		});
	}

	async openSelection(titleName, episodeNumber, url, episodeNumberUrl) {
		const list = await this.storage.get("list");
		let searchResults = await jikanjs.search("anime", titleName);
		searchResults = searchResults.results;
		const condition = list.find((listItem, index) => {
			const currentAnime = list.anime[index];
			if (listItem.urlTitle.indexOf(titleName) >= 0) {
				if (
					episodeNumber < listItem.episodeTotal ||
					listItem.episodeTotal === 0
				) {
					list[index].watchUrl = updateWatchUrl(
						url,
						episodeNumberUrl[0],
						episodeNumber
					);
				}
			}

			list[index].episodeCount = episodeNumber;
			list.splice(index, 1);
			list.unshift(currentAnime);
			return true;
		});
		console.log(condition);

		if (!condition) {
			this.storage.selectionPage({
				searchResults,
				watchUrl: url,
				urlTitle: titleName,
				currentEpisode: episodeNumber
			});
		} else {
			this.storage.saveList(list);
		}
	}

	updateWatchUrl(url, episodeUrl, currentEpisode) {
		const isGoGo = url.indexOf("gogoanime");
		const isAnimeFreak = url.indexOf("animefreak");
		const isWcoStream = url.indexOf("wcostream");
		if (isGoGo > 0 || isAnimeFreak > 0 || isWcoStream > 0) {
			const updatedEpisodeUrl = episodeUrl.replace(
				/\d+/g,
				currentEpisode + 1
			);
			return url.replace(episodeUrl, updatedEpisodeUrl);
		} else {
			return url;
		}
	}
}

export default ChromeTabs;
