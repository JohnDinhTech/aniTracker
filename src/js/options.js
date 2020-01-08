import "../css/options.css";

const listContainer = document.getElementById("list");

chrome.storage.sync.get(["listObject"], (result) => {
	console.log(result.listObject);
	result.listObject.anime.forEach((anime) => {
		renderAnime(anime);
	});
});

function renderAnime({ episodeCount, episodeTotal, title, imgUrl, url }) {
	const animeContainer = document.createElement("div");

	// const imgUrl = "https://cdn.myanimelist.net/images/anime/1223/96541.jpg";
	// const title = "Fullmetal Alchemist: Brotherhood";
	// const episodeCount = 63;
	// const episodeTotal = 65;
	// const status = "Watching";
	let completionPercent = Math.floor((episodeCount / episodeTotal) * 100);
	let status = "Watching";
	let color = "#11cdef";
	if (episodeCount === episodeTotal) {
		status = "Completed";
		color = "#2DCE98";
	} else if (episodeTotal === 0) {
		completionPercent = "?";
	}

	animeContainer.innerHTML = `<label class="checkbox">
						<input type="checkbox" name="" id="" />
						<span class="checkmark"></span>
					</label>
                    <div class="title">
                    <img
                        src="${imgUrl}"
                    />
                    <a href="${url}" target="_blank"
                        <h2>${title}</h2>
                    </a>
					</div>
					<div class="episode-count">
						<span id="watched-episodes">${episodeCount}</span>
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
}

// addAnime();
