/* ================================
   PLAYLIST DATA
================================ */

let playlists = [
    {
        name: "Sunday Worship",
        description: "Songs for worship and practice.",
        songs: 6,
        icon: "♫"
    },
    {
        name: "Practice Songs",
        description: "Songs I am currently learning.",
        songs: 4,
        icon: "♪"
    },
    {
        name: "My Favorites",
        description: "Songs I never get tired of.",
        songs: 8,
        icon: "♬"
    }
];


/* ================================
   ELEMENTS
================================ */

const createBtn =
    document.getElementById("create-playlist-btn");

const emptyCreateBtn =
    document.getElementById("empty-create-btn");

const modal =
    document.getElementById("playlist-modal");

const closeModal =
    document.getElementById("close-modal");

const form =
    document.getElementById("playlist-form");

const nameInput =
    document.getElementById("playlist-name");

const descriptionInput =
    document.getElementById("playlist-description");

const playlistGrid =
    document.getElementById("playlist-grid");

const emptyPlaylist =
    document.getElementById("empty-playlist");

const playlistCount =
    document.getElementById("playlist-count");

const toast =
    document.getElementById("playlist-toast");


/* ================================
   RENDER PLAYLISTS
================================ */

function renderPlaylists() {

    playlistGrid.innerHTML = "";

    playlistCount.textContent =
        `${playlists.length} ${playlists.length === 1
            ? "playlist"
            : "playlists"}`;

    if (playlists.length === 0) {
        emptyPlaylist.style.display = "block";
        return;
    }

    emptyPlaylist.style.display = "none";

    playlists.forEach((playlist, index) => {

        const card = document.createElement("article");

        card.className = "playlist-card";

        card.innerHTML = `
            <div class="playlist-icon">
                ${playlist.icon}
            </div>

            <h3>${playlist.name}</h3>

            <p>${playlist.description}</p>

            <span class="song-count">
                ${playlist.songs}
                ${playlist.songs === 1 ? "song" : "songs"}
            </span>

            <div class="playlist-actions">

                <button
                    class="open-btn"
                    data-index="${index}">
                    Open
                </button>

                <button
                    class="delete-btn"
                    data-index="${index}">
                    Delete
                </button>

            </div>
        `;

        playlistGrid.appendChild(card);
    });
}


/* ================================
   OPEN MODAL
================================ */

function openModal() {

    modal.classList.remove("hidden");

    nameInput.value = "";
    descriptionInput.value = "";

    nameInput.focus();
}

function hideModal() {
    modal.classList.add("hidden");
}

createBtn.addEventListener("click", openModal);

emptyCreateBtn.addEventListener("click", openModal);

closeModal.addEventListener("click", hideModal);


/* ================================
   CLOSE WHEN CLICKING OUTSIDE
================================ */

modal.addEventListener("click", function (event) {

    if (event.target === modal) {
        hideModal();
    }
});


/* ================================
   CREATE PLAYLIST
================================ */

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = nameInput.value.trim();

    const description =
        descriptionInput.value.trim() ||
        "A new collection of songs.";

    if (!name) {
        nameInput.focus();
        return;
    }

    const newPlaylist = {
        name: name,
        description: description,
        songs: 0,
        icon: "♫"
    };

    playlists.push(newPlaylist);

    renderPlaylists();

    hideModal();

    showToast("Playlist created!");
});


/* ================================
   PLAYLIST ACTIONS
================================ */

playlistGrid.addEventListener("click", function (event) {

    const button =
        event.target.closest("button");

    if (!button) return;

    const index =
        Number(button.dataset.index);

    if (button.classList.contains("open-btn")) {

        const playlist = playlists[index];

        alert(
            `Opening "${playlist.name}" playlist.\n\n` +
            `${playlist.songs} songs saved.`
        );
    }

    if (button.classList.contains("delete-btn")) {

        const playlist = playlists[index];

        const confirmDelete = confirm(
            `Delete "${playlist.name}" playlist?`
        );

        if (!confirmDelete) return;

        playlists.splice(index, 1);

        renderPlaylists();

        showToast("Playlist deleted.");
    }
});


/* ================================
   TOAST MESSAGE
================================ */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 2200);
}


/* ================================
   INITIAL LOAD
================================ */

renderPlaylists();