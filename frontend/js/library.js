const librarySongs = [
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
const suggestionsBox = document.getElementById("search-suggestions");
const sortSelect = document.getElementById("sort-songs");
const songCount = document.querySelector(".song-count");

if (!songGrid || !searchInput || !suggestionsBox || !sortSelect || !songCount) {
    console.warn("Library page elements were not found.");
} else {
    let currentSongs = [...librarySongs];

    function hideSuggestions() {
        suggestionsBox.innerHTML = "";
        suggestionsBox.classList.remove("visible");
    }

    function renderSuggestions(value) {
        const query = value.toLowerCase().trim();
        const matches = librarySongs.filter(song =>
            song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query) ||
            song.key.toLowerCase().includes(query)
        ).slice(0, 5);

        suggestionsBox.innerHTML = "";

        if (!matches.length) {
            hideSuggestions();
            return;
        }

        matches.forEach(song => {
            const suggestion = document.createElement("button");
            suggestion.type = "button";
            suggestion.className = "suggestion-item";
            suggestion.setAttribute("role", "option");
            suggestion.innerHTML = `
                <strong>${song.title}</strong>
                <span>${song.artist} · Key ${song.key}</span>
            `;

            suggestion.addEventListener("click", () => {
                searchInput.value = song.title;
                currentSongs = [song];
                renderSongs(currentSongs);
                hideSuggestions();
            });

            suggestionsBox.appendChild(suggestion);
        });

        suggestionsBox.classList.add("visible");
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

        songCount.textContent = `${list.length} ${list.length === 1 ? "song" : "songs"}`;
    }

    searchInput.addEventListener("input", function () {
        const value = this.value.toLowerCase().trim();

        renderSuggestions(this.value);

        currentSongs = librarySongs.filter(song =>
            song.title.toLowerCase().includes(value) ||
            song.artist.toLowerCase().includes(value) ||
            song.key.toLowerCase().includes(value)
        );

        renderSongs(currentSongs);
    });

    searchInput.addEventListener("focus", function () {
        renderSuggestions(this.value);
    });

    searchInput.addEventListener("keydown", function (event) {
        if (event.key !== "Enter") return;

        const firstSuggestion = suggestionsBox.querySelector(".suggestion-item");
        if (!firstSuggestion) return;

        event.preventDefault();
        firstSuggestion.click();
    });

    document.addEventListener("click", function (event) {
        if (!event.target.closest(".search-box")) {
            hideSuggestions();
        }
    });

    sortSelect.addEventListener("change", function () {
        let sortedSongs = [...currentSongs];

        if (this.value === "az") {
            sortedSongs.sort((a, b) => a.title.localeCompare(b.title));
        } else if (this.value === "key") {
            sortedSongs.sort((a, b) => a.key.localeCompare(b.key));
        }

        renderSongs(sortedSongs);
    });

    songGrid.addEventListener("click", function (event) {
        const button = event.target.closest(".more-btn");
        if (!button) return;

        const index = Number(button.dataset.index);
        const song = currentSongs[index];

        const action = prompt(
            `${song.title}\n\nType:\n1 - Open Chords\n2 - Remove`
        );

        if (action === "1") {
            alert(`Opening chord sheet for "${song.title}".`);
        } else if (action === "2") {
            const position = librarySongs.indexOf(song);
            if (position !== -1) {
                librarySongs.splice(position, 1);
            }

            currentSongs = currentSongs.filter(item => item !== song);
            renderSongs(currentSongs);
            alert(`${song.title} was removed from your library.`);
        }
    });

    renderSongs(currentSongs);
}
