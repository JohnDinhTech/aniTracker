import "../img/aniTracker32.png";
import ChromeStorage from "./modules/ChromeStorage";
import ChromeTabs from "./modules/ChromTabs";

const storage = new ChromeStorage();
const tabs = new ChromeTabs();
chrome.runtime.onInstalled.addListener(() => {
	storage.onInstall();
});

tabs.listenToUrl();
