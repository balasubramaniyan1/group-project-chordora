const songs = [
    {
        title: "Midnight Melody",
        artist: "Demo Artist",
        key: "C",
        bpm: 96,
        icon: "♫",
        art: "blue-art"
    },
    {
        title: "Golden Skies",
        artist: "Demo Artist",
        key: "G",
        bpm: 102,
        icon: "♪",
        art: "purple-art"
    },
    {
        title: "After The Rain",
        artist: "Demo Artist",
        key: "D",
        bpm: 88,
        icon: "♬",
        art: "gold-art"
    },
    {
        title: "Ocean Lights",
        artist: "Demo Artist",
        key: "Am",
        bpm: 94,
        icon: "♩",
        art: "blue-art"
    }
];

const songGrid = document.getElementById("song-grid");
const searchInput = document.getElementById("library-search");
const searchSuggestions = document.getElementById("search-suggestions");
const sortSelect = document.getElementById("sort-songs");
const songCount = document.querySelector(".song-count");

let currentSongs = [...songs];

function renderSuggestions(value) {

    const query = value.toLowerCase().trim();

    if (!query) {
        searchSuggestions.innerHTML = "";
        searchSuggestions.classList.remove("visible");
        return;
    }

    const matches = songs.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.key.toLowerCase().includes(query)
    ).slice(0, 5);

    searchSuggestions.innerHTML = matches.length
        ? matches.map(song => `
            <button class="suggestion-item" type="button" data-title="${song.title}">
                <strong>${song.title}</strong>
                <span>${song.artist} | Key ${song.key}</span>
            </button>
        `).join("")
        : `<div class="suggestion-item"><span>No matching songs</span></div>`;

    searchSuggestions.classList.add("visible");
}

function renderSongs(list) {

    songGrid.innerHTML = "";

    if (list.length === 0) {

        songGrid.innerHTML = `
            <div class="no-results">
                <h3>No songs found</h3>
                <p>Try searching for another song, artist, or key.</p>
            </div>
        `;

        songCount.textContent = "0 songs";
        return;
    }

    list.forEach((song, index) => {

        const card = document.createElement("article");

        card.className = "song-card";

        card.innerHTML = `
            <div class="song-art ${song.art}">
                ${song.icon}
            </div>

            <div class="song-info">

                <h3>${song.title}</h3>

                <p>${song.artist}</p>

                <div class="song-meta">
                    <span>Key ${song.key}</span>
                    <span>${song.bpm} BPM</span>
                </div>

            </div>

            <button
                class="more-btn"
                data-index="${index}"
                aria-label="More options">
                ⋮
            </button>
        `;

        songGrid.appendChild(card);
    });

    songCount.textContent =
        `${list.length} ${list.length === 1 ? "song" : "songs"}`;
}


/* SEARCH */

searchInput.addEventListener("input", function () {

    const value = this.value.toLowerCase().trim();

    currentSongs = songs.filter(song =>
        song.title.toLowerCase().includes(value) ||
        song.artist.toLowerCase().includes(value) ||
        song.key.toLowerCase().includes(value)
    );

    renderSongs(currentSongs);
    renderSuggestions(this.value);
});

searchSuggestions.addEventListener("click", function (event) {

    const suggestion = event.target.closest(".suggestion-item[data-title]");

    if (!suggestion) return;

    searchInput.value = suggestion.dataset.title;
    currentSongs = songs.filter(song =>
        song.title === suggestion.dataset.title
    );

    renderSongs(currentSongs);
    searchSuggestions.classList.remove("visible");
});

document.addEventListener("click", function (event) {

    if (!event.target.closest(".search-box")) {
        searchSuggestions.classList.remove("visible");
    }
});


/* SORT */

sortSelect.addEventListener("change", function () {

    let sortedSongs = [...currentSongs];

    if (this.value === "az") {

        sortedSongs.sort((a, b) =>
            a.title.localeCompare(b.title)
        );

    } else if (this.value === "key") {

        sortedSongs.sort((a, b) =>
            a.key.localeCompare(b.key)
        );
    }

    renderSongs(sortedSongs);
});


/* MORE BUTTON */

songGrid.addEventListener("click", function (event) {

    const button = event.target.closest(".more-btn");

    if (!button) return;

    const index = Number(button.dataset.index);
    const song = currentSongs[index];

    const action = prompt(
        `${song.title}\n\nType:\n1 - Open Chords\n2 - Remove`
    );

    if (action === "1") {

        alert(
            `Opening chord sheet for "${song.title}".`
        );

    } else if (action === "2") {

        const position = songs.indexOf(song);

        if (position !== -1) {
            songs.splice(position, 1);
        }

        currentSongs = currentSongs.filter(
            item => item !== song
        );

        renderSongs(currentSongs);

        alert(`${song.title} was removed from your library.`);
    }
});


/* INITIAL LOAD */

renderSongs(currentSongs);


