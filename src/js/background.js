import "../img/weeb_track32.png";
import jikanjs from "jikanjs";

chrome.runtime.onInstalled.addListener(() => {
	console.log("Extension is installed");
	chrome.storage.sync.set({ listObject: { anime: [], manga: [] } }, () => {
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
						const imgUrl = response.results[0].image_url;
						const title = response.results[0].title;
						const episodeTotal = response.results[0].episodes;
						const url = response.results[0].url;
						const weebList = result.listObject;
						console.log(response.results[0]);

						const condition = weebList.anime.find((obj, index) => {
							if (obj.id === animeId) {
								weebList.anime[
									index
								].episodeCount = episodeNumber;
								weebList.anime.push(
									weebList.anime.splice(index, 1)[0]
								);
							}
							return obj.id === animeId;
						});
						console.log(weebList);
						if (!condition) {
							weebList.anime.push({
								imgUrl,
								title,
								episodeTotal,
								url,
								title: response.results[0].title,
								id: response.results[0].mal_id,
								episodeCount: episodeNumber
							});
						}
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
