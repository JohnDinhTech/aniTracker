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

	saveTracking(tracking) {
		chrome.storage.sync.set({ tracking });
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
					console.log("opening options page");
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

	closeSelectionPage() {
		chrome.storage.sync.set({ selection: false }, () => {
			chrome.storage.local.set({ selected: null }, () => {
				chrome.tabs.getCurrent((tab) => chrome.tabs.remove(tab.id));
			});
		});
	}

	async addAnime(
		{ mal_id, episodes, image_url, title },
		{ episodeCount, urlTitle, watchUrl }
	) {
		const list = await this.get("list");
		const condition = list.find((anime, index) => {
			if (anime.mal_id === mal_id) {
				console.log("FOUND");
				list[index].episodeCount = episodeCount;
				list[index].urlTitle.push(urlTitle);
				list.unshift(list.splice(index, 1)[0]);
			}
			return anime.mal_id === mal_id;
		});
		if (!condition) {
			console.log(watchUrl);
			list.unshift({
				episodeCount,
				mal_id,
				image_url,
				title,
				watchUrl,
				episodeTotal: episodes,
				urlTitle: [urlTitle]
			});
		}
		console.log(list);
		this.saveList(list);
		this.closeSelectionPage();
	}

	// TEMPORARY
	resetList() {
		chrome.storage.sync.set({ list: {} });
	}
}

export default ChromeStorage;
