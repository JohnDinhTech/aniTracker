chrome.runtime.onInstalled.addListener(() => {
	console.log("Extension is installed");
	chrome.storage.sync.set({ listJSON: "{anime: {}, manga: {}}" }, () => {
		console.log("Empty list initiated");
	});

	chrome.storage.sync.set({ tracking: true }, () => {
		console.log("Tracking has been turned on");
	});
});

// this is code that runs everytime a page is updated
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === "complete") {
//         console.log(tab);
//     }
// });
