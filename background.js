chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension is installed");

    const rules = {
        gogoAnime: {
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostPrefix: "gogoanime.", schemes: ["https"] }
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }
    };

    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([rules.gogoAnime]);
    });
});
