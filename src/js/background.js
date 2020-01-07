import "../img/weeb_track32.png";

chrome.runtime.onInstalled.addListener(() => {
	console.log("Extension is installed");
	chrome.storage.sync.set({ listJSON: "{anime: {}, manga: {}}" }, () => {
		console.log("Empty list initiated");
	});

	chrome.storage.sync.set({ tracking: true }, () => {
		console.log("Tracking has been turned on");
	});
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	chrome.tabs.getSelected(null, (tab) => {
		const isCompatible = tab.url.toLowerCase().includes("episode");
		if (isCompatible && changeInfo.status === "complete") {
			const url = tab.url.toLowerCase();
			const episodeNumberUrl = url.match(/episode\D+\d+/g);
			const episodeNumber = parseInt(episodeNumberUrl[0].match(/\d+/g));
			const baseUrlLength = url.match(/\w+:\/\/[\w+.]+\//g)[0].length;
			let titleName = url.slice(
				baseUrlLength,
				url.indexOf(episodeNumberUrl) - 1
			);
			titleName = titleName.replace(/-/g, " ");
			titleName = titleName
				.split(" ")
				.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
				.join(" ");

			alert(titleName);
			// alert(url.indexOf(episodeNumberUrl));
			// alert(`You are on episode ${episodeNumber}`);
		}
	});
});
// this is code that runs everytime a page is updated
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === "complete") {
//         console.log(tab);
//     }
// });
