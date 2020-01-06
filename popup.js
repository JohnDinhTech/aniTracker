const switchColor = document.querySelector(".switch-selection");
const offSwitch = document.getElementById("off");
const onSwitch = document.getElementById("on");
const trackStatus = document.querySelector(".track-status");

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
