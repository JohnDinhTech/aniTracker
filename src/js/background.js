import "../img/aniTracker32.png";
import jikanjs from "jikanjs";

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set(
		{
			listObject: { anime: [], manga: [] },
			tracking: true,
			selection: false
		},
		() => {
			console.log("Extension storage has been set up");
		}
	);
});

function updateWatchUrl(url, episodeUrl, currentEpisode) {
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
				console.log(titleName);
				titleName = titleName
					.replace(/-/g, " ")
					.split(" ")
					.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
					.join(" ");

				jikanjs.search("anime", titleName).then((response) => {
					chrome.storage.sync.get(["listObject"], (result) => {
						const aniList = result.listObject;
						const condition = aniList.anime.find((obj, index) => {
							const isIndex = obj.urlTitle.indexOf(titleName);
							if (isIndex >= 0) {
								console.log(episodeNumber, obj.episodeTotal);
								if (
									episodeNumber < obj.episodeTotal ||
									obj.episodeTotal === 0
								) {
									aniList.anime[
										index
									].watchUrl = updateWatchUrl(
										url,
										episodeNumberUrl[0],
										episodeNumber
									);
									console.log(aniList);
								}
								aniList.anime[
									index
								].episodeCount = episodeNumber;
								aniList.anime.push(
									aniList.anime.splice(index, 1)[0]
								);
								return true;
							}
						});
						if (!condition) {
							chrome.storage.sync.set({ selection: true }, () => {
								chrome.storage.local.set(
									{
										selected: {
											currentEpisode: episodeNumber,
											searchResults: response.results,
											urlTitle: titleName,
											watchUrl: url
										}
									},
									() => {
										chrome.runtime.openOptionsPage(() => {
											chrome.tabs.query(
												{
													active: true,
													currentWindow: true
												},
												(tabs) => {
													chrome.tabs.reload(
														tabs[0].id
													);
												}
											);
										});
									}
								);
							});
						} else {
							chrome.storage.sync.set(
								{
									listObject: aniList
								},
								() => {
									console.log("Anime list has been updated");
								}
							);
						}
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
