class ChromeStorage {
	constructor() {}

	onInstall() {
		chrome.storage.sync.set({
			list: [],
			tracking: true,
			selection: false,
			selected: {}
		});
	}

	saveList(list, callback) {
		chrome.storage.sync.set({ list }, callback);
	}

	get(key) {
		return new Promise((resolve, reject) => {
			chrome.storage.sync.get([key], (results) => {
				resolve(results[key]);
			});
		});
	}

	getLocal(key) {
		return new Promise((resolve, reject) => {
			chrome.storage.local.get([key], (results) => {
				resolve(results[key]);
			});
		});
	}

	selectionPage(selected) {
		chrome.storage.sync.set({ selection: true }, () => {
			chrome.storage.local.set({ selected }, () => {
				chrome.runtime.openOptionsPage(() => {
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
			});
		});
	}

	// TEMPORARY
	resetList() {
		chrome.storage.sync.set({ list: {} });
	}
}

export default ChromeStorage;
