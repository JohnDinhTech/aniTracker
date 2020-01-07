import "../img/weeb_track32.png";
import jikanjs from "jikanjs";

chrome.runtime.onInstalled.addListener(() => {
	console.log("Extension is installed");
	chrome.storage.sync.set({ listObject: { anime: {}, manga: {} } }, () => {
		console.log("Empty list initiated");
	});

	chrome.storage.sync.set({ tracking: true }, () => {
		console.log("Tracking has been turned on");
	});
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	chrome.tabs.getSelected(null, (tab) => {
		chrome.storage.sync.get(["tracking"], (result) => {
			const isCompatible = tab.url.toLowerCase().includes("episode");
			if (
				isCompatible &&
				changeInfo.status === "complete" &&
				result.tracking
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

				jikanjs.search("anime", titleName).then((response) => {
					chrome.storage.sync.get(["listObject"], (result) => {
						const animeId = response.results[0].mal_id;
						const weebList = result.listObject;
						weebList.anime[response.results[0].mal_id] = {
							episode: episodeNumber
						};
						chrome.storage.sync.set(
							{ listObject: weebList },
							() => {
								console.log("Anime list has been updated");
							}
						);
					});
				});
			}
		});
	});
});
// this is code that runs everytime a page is updated
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === "complete") {
//         console.log(tab);
//     }
// });
