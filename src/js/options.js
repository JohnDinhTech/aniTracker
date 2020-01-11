import "../css/options.css";
import jikanjs from "jikanjs";

const listModal = document.getElementById("list");
const listContainer = document.getElementById("anime-container");
const selectionModal = document.getElementById("select-new-anime");
const selectionContainer = document.getElementById("anime-selection-container");
const searchbar = document.querySelector(".list-searchbar");
const searchIcon = document.querySelector(".search-icon");
const deleteButton = document.getElementById("delete-button");
const selectAllCheckbox = document.getElementById("select-all");
const editButton = document.getElementById("edit-button");

let checkedAnime = [];
let editCondition = false;

let localListObject = {};
let episodeInputEls = [];

chrome.storage.sync.get(["selection"], (result) => {
	console.log(result.selection);
	if (result.selection) {
		listModal.style.display = "none";
		selectionModal.style.display = "block";
		chrome.storage.local.get(["selected"], (result) => {
			result.selected.searchResults.forEach((anime) => {
				renderAnimeSelection(
					anime,
					result.selected.currentEpisode,
					result.selected.urlTitle,
					result.selected.watchUrl
				);
			});
			chrome.storage.sync.set({ selection: false });
			chrome.storage.local.set({ selected: [] });
		});
	} else {
		chrome.storage.sync.get(["listObject"], (result) => {
			console.log(result.listObject);
			localListObject = result.listObject;
			localListObject.anime.forEach((anime) => {
				renderAnimeList(anime);
			});
			initCheckbox();
		});
	}
});

selectAllCheckbox.addEventListener("change", (e) => {
	let condition = false;
	if (e.target.checked) {
		condition = true;
	}
	checkAll(condition);
});

editButton.addEventListener("click", () => {
	editCondition = !editCondition;
	console.log(localListObject);
	chrome.storage.sync.get(["listObject"], (result) => {
		listContainer.innerHTML = "";
		result.listObject.anime.forEach((anime) => {
			renderAnimeList(anime, editCondition);
		});
	});
	if (editCondition) {
		editButton.textContent = "Done";
		editButton.style.backgroundColor = "#7764e4";
		editButton.style.color = "white";
	} else {
		editButton.textContent = "Edit";
		editButton.style.backgroundColor = "transparent";
		editButton.style.color = "#7764e4";
		updateEpisodes();
	}
});

function updateEpisodes() {
	for (let el of episodeInputEls) {
		const episodeCount = el.value;
		const animeId = parseInt(el.getAttribute("mal_id"));
		const matchingAnime = localListObject.anime.find((anime) => {
			if (anime.mal_id === animeId) {
				anime.episodeCount = episodeCount;
			}
			return anime.mal_id === animeId;
		});
		saveList(localListObject, true);
	}
}

deleteButton.addEventListener("click", () => {
	chrome.storage.sync.get(["listObject"], (result) => {
		const listObject = result.listObject;
		let aniList = listObject.anime;

		checkedAnime.forEach((id) => {
			const foundAnime = aniList.find((anime) => {
				return anime.mal_id === parseInt(id);
			});
			aniList.splice(aniList.indexOf(foundAnime), 1);
		});
		listObject.anime = aniList;
		saveList(listObject, true);
	});
});

function saveList(newList, reloadCondition) {
	chrome.storage.sync.set({ listObject: newList }, () => {
		if (reloadCondition) {
			chrome.tabs.query(
				{
					active: true,
					currentWindow: true
				},
				(tabs) => {
					chrome.tabs.reload(tabs[0].id);
				}
			);
		}
	});
}

searchbar.addEventListener("focus", () => {
	searchIcon.style.opacity = 0;
});

searchbar.addEventListener("focusout", () => {
	searchIcon.style.opacity = 1;
});

searchbar.addEventListener("keyup", (e) => {
	renderSearch(e.target.value);
});

function initCheckbox() {
	const checkBoxes = document.querySelectorAll("#checkbox");
	for (let checkbox of checkBoxes) {
		checkbox.addEventListener("change", () => {
			if (checkbox.checked) {
				checkedAnime.push(checkbox.value);
			} else {
				checkedAnime.splice(checkedAnime.indexOf(checkbox.value), 1);
			}
			if (checkedAnime.length === 0) {
				deleteButton.style.opacity = 0;
				deleteButton.disabled = true;
				deleteButton.style.cursor = "context-menu";
			} else {
				deleteButton.style.opacity = 1;
				deleteButton.disabled = false;
				deleteButton.style.cursor = "pointer";
			}
		});
	}
}

function checkAll(condition) {
	const checkBoxes = document.querySelectorAll("#checkbox");
	for (let checkbox of checkBoxes) {
		if (condition) {
			checkbox.checked = true;
			checkedAnime.push(checkbox.value);
			deleteButton.style.opacity = 1;
			deleteButton.style.zIndex = 0;
		} else {
			checkbox.checked = false;
			checkedAnime = [];
			deleteButton.style.opacity = 0;
			deleteButton.style.zIndex = -2;
		}
	}
	console.log(checkedAnime);
}

function renderSearch(searchTerm, editCondition) {
	listContainer.innerHTML = "";
	const filteredAnime = localListObject.anime.filter((anime) =>
		anime.title.toLowerCase().includes(searchTerm.toLowerCase())
	);
	filteredAnime.forEach((anime) => {
		renderAnimeList(anime, editCondition);
	});
	initCheckbox();
}

function renderAnimeSelection(
	{ mal_id, url, image_url, title, episodes },
	episodeCount,
	urlTitle,
	watchUrl
) {
	const animeContainer = document.createElement("div");
	animeContainer.innerHTML = `
                    <div class="title">
                        <img
                            src="${image_url}"
                        />
                        <h2>${title}</h2>
                    </div>
                    <div class="episode-count">
                        <span id="total-episodes">${
							episodes === 0 ? "Unknown" : episodes
						}</span>
                    </div>
                    <div class="link-to-mal">
                        <a
                            target="_blank"
                            href="${url}"
                            >MyAnimeList</a
                        >
                    </div>
                    <div class="select-button">
                        <button id="${mal_id}">Select</button>
                    </div>
    `;

	animeContainer
		.querySelector(".select-button")
		.addEventListener("click", () => {
			addAnime(
				{ mal_id, url, image_url, title, episodes },
				episodeCount,
				urlTitle,
				watchUrl
			);
			chrome.tabs.getCurrent((tab) => {
				chrome.tabs.remove(tab.id);
			});
		});

	animeContainer.classList.add("anime-display", "select");
	selectionContainer.appendChild(animeContainer);
}

function addAnime(
	{ mal_id, url, image_url, title, episodes },
	episodeCount,
	urlTitle,
	watchUrl
) {
	chrome.storage.sync.get(["listObject"], (result) => {
		const aniList = result.listObject;
		const condition = aniList.anime.find((obj, index) => {
			if (obj.mal_id === mal_id) {
				aniList.anime[index].episodeCount = episodeCount;
				aniList.anime[index].urlTitle.push(urlTitle);
				aniList.anime.push(aniList.anime.splice(index, 1)[0]);
			}
			return obj.mal_id === mal_id;
		});
		if (!condition) {
			aniList.anime.push({
				episodeCount,
				mal_id,
				image_url,
				url,
				title,
				watchUrl,
				episodeTotal: episodes,
				urlTitle: [urlTitle]
			});
			console.log(aniList);
		}
		saveList(aniList, false);
	});
}

function renderAnimeList(
	{ mal_id, url, image_url, title, episodeTotal, episodeCount, watchUrl },
	editCondition
) {
	const animeContainer = document.createElement("div");
	let completionPercent = Math.ceil((episodeCount / episodeTotal) * 100);
	let status = "Watching";
	let color = "#11cdef";
	const checkCondition = checkedAnime.find((id) => parseInt(id) === mal_id);
	let episodeNumber = episodeCount;
	if (episodeCount === episodeTotal) {
		status = "Completed";
		color = "#2DCE98";
	} else if (
		episodeTotal === 0 ||
		(episodeTotal !== 0 && episodeCount > episodeTotal)
	) {
		completionPercent = "?";
		episodeTotal = "?";
	}
	if (editCondition) {
		episodeNumber = `<input id="edit-box-${mal_id}" class="edit-box" type="number" value=${episodeCount} mal_id=${mal_id} />`;
	}

	animeContainer.innerHTML = `<label class="checkbox">
						<input type="checkbox" id="checkbox" ${
							checkCondition ? "checked" : ""
						} value="${mal_id}" />
						<span class="checkmark"></span>
					</label>
                    <div class="title">
                    <img
                        src="${image_url}"
                    />
                    <a href="${watchUrl}" target="_blank"
                        <h2>${title}</h2>
                    </a>
					</div>
					<div class="episode-count">
						<span id="watched-episodes">${episodeNumber}</span>
						/
						<span id="total-episodes">${episodeTotal}</span>
					</div>
					<div class="status">
						<span class="dot" style="background-color: ${color}"></span>
						<span class="status-text">${status}</span>
					</div>
					<div class="completion-progress">
						<span class="percent">${completionPercent}</span>%
						<div class="progress-bar-background">
							<div class="progress-bar-foreground" style="background-color: ${color}; width: ${
		completionPercent === "?" ? 0 : completionPercent
	}%"></div>
						</div>
                    </div>`;

	animeContainer.classList.add("anime-display");
	listContainer.appendChild(animeContainer);
	if (editCondition) {
		editBox(document.getElementById(`edit-box-${mal_id}`), episodeTotal);
		episodeInputEls.push(document.getElementById(`edit-box-${mal_id}`));
	}
}

function editBox(el, max) {
	el.addEventListener("change", (e) => {
		if (e.target.value < 0 || e.target.value === "") {
			e.target.value = 0;
		} else if (e.target.value > 2500) {
			e.target.value = 2500;
		} else if (e.target.value > max && max !== 0) {
			e.target.value = max;
		}
	});
}
