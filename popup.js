const switchColor = document.querySelector(".switch-selection");
const offSwitch = document.getElementById("off");
const onSwitch = document.getElementById("on");
const noTrack = document.querySelector(".no-track");

offSwitch.addEventListener("click", () => {
	switchColor.style.backgroundColor = "#F08080";
	console.log(switchColor.style.backgroundColor);
});

onSwitch.addEventListener("click", () => {
	switchColor.style.backgroundColor = "#65bd63";
});

chrome.tabs.getSelected(null, (tab) => {
	if (tab.url.toLowerCase().includes("episode")) {
		noTrack.classList.add("no-track-off");
	}
});
