const switchColor = document.querySelector(".switch-selection");
const offSwitch = document.getElementById("off");
const onSwitch = document.getElementById("on");
const trackStatus = document.querySelector(".track-status");
// const noTrack = document.querySelector(".no-track");

offSwitch.addEventListener("click", () => {
	switchColor.style.backgroundColor = "#F08080";
	console.log(switchColor.style.backgroundColor);
});

onSwitch.addEventListener("click", () => {
	switchColor.style.backgroundColor = "#65bd63";
});

chrome.tabs.getSelected(null, (tab) => {
	if (tab.url.toLowerCase().includes("episode")) {
		trackStatus.textContent = "Currently Tracking";
		trackStatus.classList.add("track-status-active");
		// noTrack.classList.add("no-track-off");
	}
});
