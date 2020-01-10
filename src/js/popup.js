import "../css/popup.css";

const test = {
	anime: [
		{
			episodeCount: 3,
			episodeTotal: 13,
			image_url:
				"https://cdn.myanimelist.net/images/anime/7/86743.jpg?s=60123ac001429ff9d15a9726a824cabb",
			mal_id: 35248,
			title: "18if",
			url: "https://myanimelist.net/anime/35248/18if",
			urlTitle: ["18if"],
			watchUrl: "https://www.wcostream.com/18if-episode-3-english-dubbed"
		}
	],
	manga: []
};
const switchColor = document.querySelector(".switch-selection");
const offSwitch = document.getElementById("off");
const onSwitch = document.getElementById("on");
const trackStatus = document.querySelector(".track-status");
const listButton = document.getElementById("list");
const exportDataBtn = document.getElementById("export");
const textArea = document.querySelector("textarea");

exportDataBtn.addEventListener("click", () => {
	chrome.storage.sync.get(["listObject"], (result) => {
		textArea.value = JSON.stringify(result.listObject);
	});
});

listButton.addEventListener("click", () => {
	chrome.runtime.openOptionsPage();
});

// const noTrack = document.querySelector(".no-track");

chrome.tabs.getSelected(null, (tab) => {
	chrome.storage.sync.get(["tracking"], (result) => {
		const isCompatible = tab.url.toLowerCase().includes("episode");

		if (!result.tracking) {
			offSwitch.checked = true;
			switchColor.style.backgroundColor = "#F08080";
		}
		offSwitch.addEventListener("click", () => {
			if (isCompatible) {
				reloadPage(tab);
				trackStatus.textContent = "Not Tracking";
				trackStatus.classList.remove("track-status-active");
			}
			switchColor.style.backgroundColor = "#F08080";
			chrome.storage.sync.set({ tracking: false }, () => {
				console.log("Tracking has been turned off");
			});
		});

		onSwitch.addEventListener("click", () => {
			if (isCompatible) {
				reloadPage(tab);
				trackStatus.textContent = "Currently Tracking";
				trackStatus.classList.add("track-status-active");
			}
			switchColor.style.backgroundColor = "#65bd63";
			chrome.storage.sync.set({ tracking: true }, () => {
				console.log("Tracking has been turned on");
			});
		});

		if (!isCompatible) {
			trackStatus.textContent = "Page Not Compatible";
		} else if (result.tracking && isCompatible) {
			trackStatus.classList.add("track-status-active");
			trackStatus.textContent = "Currently Tracking";
		} else if (!result.tracking && isCompatible) {
			trackStatus.textContent = "Not Tracking";
			switchColor.style.backgroundColor = "#F08080";
		}
	});
});

function reloadPage(tab) {
	const reloadCode = "window.location.reload();";
	chrome.tabs.executeScript(tab.id, { code: reloadCode });
}

const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", () => {
	chrome.storage.sync.set({ listObject: { anime: [], manga: [] } });
});
