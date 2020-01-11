import "../img/aniTracker32.png";
import jikanjs from "jikanjs";

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set(
		{
			listObject: {
				anime: [
					// {
					// 	episodeCount: 8,
					// 	episodeTotal: 10,
					// 	image_url:
					// 		"https://cdn.myanimelist.net/images/anime/1739/101117.jpg?s=ff72930b88ed36269078b82f9ff9fcdc",
					// 	mal_id: 37985,
					// 	title: "Aggressive Retsuko (ONA) 2nd Season",
					// 	url:
					// 		"https://myanimelist.net/anime/37985/Aggressive_Retsuko_ONA_2nd_Season",
					// 	urlTitle: ["Aggressive Retsuko Ona 2nd Season"],
					// 	watchUrl:
					// 		"https://gogoanime.video/aggressive-retsuko-ona-2nd-season-episode-8"
					// },
					// {
					// 	episodeCount: 1,
					// 	episodeTotal: 0,
					// 	image_url:
					// 		"https://cdn.myanimelist.net/images/anime/1075/104854.jpg?s=23baccca49ae62a12f702c45b8392442",
					// 	mal_id: 35252,
					// 	title: "Hatena☆Illusion",
					// 	url:
					// 		"https://myanimelist.net/anime/35252/Hatena☆Illusion",
					// 	urlTitle: ["Hatenaillusion"],
					// 	watchUrl:
					// 		"https://gogoanime.video/hatenaillusion-episode-1"
					// },
					// {
					// 	episodeCount: 1,
					// 	episodeTotal: 0,
					// 	image_url:
					// 		"https://cdn.myanimelist.net/images/anime/1764/104365.jpg?s=ed7287aa70c41ed6aa7002c06eb53c0f",
					// 	mal_id: 38909,
					// 	title: "Infinite Dendrogram",
					// 	url:
					// 		"https://myanimelist.net/anime/38909/Infinite_Dendrogram",
					// 	urlTitle: ["Infinite Dendrogram"],
					// 	watchUrl:
					// 		"https://gogoanime.video/infinite-dendrogram-episode-2"
					// },
					// {
					// 	episodeCount: 1,
					// 	episodeTotal: 0,
					// 	image_url:
					// 		"https://cdn.myanimelist.net/images/anime/1716/104880.jpg?s=5f122477e8eaae952f3ca083802e3e9e",
					// 	mal_id: 38924,
					// 	title: "Nekopara",
					// 	url: "https://myanimelist.net/anime/38924/Nekopara",
					// 	urlTitle: ["Nekopara"],
					// 	watchUrl: "https://gogoanime.video/nekopara-episode-1"
					// },
					// {
					// 	episodeCount: 11,
					// 	episodeTotal: 20,
					// 	image_url:
					// 		"https://cdn.myanimelist.net/images/anime/1568/90241.jpg?s=21d460eb158ba684259bd4c6ca3364a6",
					// 	mal_id: 37187,
					// 	title: "Kuiba Yao Xia Zhuan",
					// 	url:
					// 		"https://myanimelist.net/anime/37187/Kuiba_Yao_Xia_Zhuan",
					// 	urlTitle: ["Ni Zhuan Ci Yuan Ai Jue Qi"],
					// 	watchUrl:
					// 		"https://gogoanime.video/ni-zhuan-ci-yuan-ai-jue-qi-episode-11"
					// },
					// {
					// 	episodeCount: 13,
					// 	episodeTotal: 24,
					// 	image_url:
					// 		"https://cdn.myanimelist.net/images/anime/1546/103418.jpg?s=867faa8e1ea7a2aaf0edf99f6afbf8df",
					// 	mal_id: 39701,
					// 	title: "Nanatsu no Taizai: Kamigami no Gekirin",
					// 	url:
					// 		"https://myanimelist.net/anime/39701/Nanatsu_no_Taizai__Kamigami_no_Gekirin",
					// 	urlTitle: ["Nanatsu No Taizai Kamigami No Gekirin"],
					// 	watchUrl:
					// 		"https://gogoanime.video/nanatsu-no-taizai-kamigami-no-gekirin-episode-13"
					// },
					// {
					// 	episodeCount: 1,
					// 	episodeTotal: 0,
					// 	image_url:
					// 		"https://cdn.myanimelist.net/images/anime/1001/102512.jpg?s=697361e09466597fef472dcc6611d63a",
					// 	mal_id: 40230,
					// 	title: "Housekishou Richard-shi no Nazo Kantei",
					// 	url:
					// 		"https://myanimelist.net/anime/40230/Housekishou_Richard-shi_no_Nazo_Kantei",
					// 	urlTitle: ["Housekishou Richard Shi No Nazo Kantei"],
					// 	watchUrl:
					// 		"https://gogoanime.video/housekishou-richard-shi-no-nazo-kantei-episode-1"
					// },
					// {
					// 	episodeCount: 1,
					// 	episodeTotal: 1,
					// 	image_url:
					// 		"https://cdn.myanimelist.net/images/anime/7/83694.jpg?s=20114720633e9da96194db27be09ec6a",
					// 	mal_id: 33363,
					// 	title: '"Eiyuu" Kaitai',
					// 	url: "https://myanimelist.net/anime/33363/Eiyuu_Kaitai",
					// 	urlTitle: ["Eiyuu Kaitai"],
					// 	watchUrl:
					// 		"https://gogoanime.video/eiyuu-kaitai-episode-1"
					// },
					// {
					// 	episodeCount: 19,
					// 	episodeTotal: 0,
					// 	image_url:
					// 		"https://cdn.myanimelist.net/images/anime/1480/92990.jpg?s=69859c186f3fcf49020f89909194dafe",
					// 	mal_id: 37885,
					// 	title: "Dragon Ball Heroes",
					// 	url:
					// 		"https://myanimelist.net/anime/37885/Dragon_Ball_Heroes",
					// 	urlTitle: ["Dragon Ball Heroes"],
					// 	watchUrl:
					// 		"https://gogoanime.video/dragon-ball-heroes-episode-19"
					// }
				],
				manga: []
			},
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
