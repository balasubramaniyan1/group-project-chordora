/* =================================
   CHORDORA LOGIN + LOGOUT SYSTEM
================================= */

document.addEventListener("DOMContentLoaded", function () {

    const loginBar =
        document.getElementById("loginBar");

    const loginSymbol =
        document.getElementById("loginSymbol");

    const loginSmall =
        document.getElementById("loginSmall");

    const loginText =
        document.getElementById("loginText");

    const loginArrow =
        document.getElementById("loginArrow");


    /* ================= LOGIN STATE ================= */

    const isLoggedIn =
        localStorage.getItem("chordoraUserLoggedIn");


    /* ================= LOGGED IN ================= */

    if (isLoggedIn === "true") {

        loginSmall.textContent =
            "WELCOME BACK";

        loginText.textContent =
            "Logout";

        loginSymbol.textContent =
            "✓";

        loginArrow.textContent =
            "↗";

        loginBar.classList.add("logout-mode");


        /* ================= LOGOUT ================= */

        loginBar.addEventListener(
            "click",
            function () {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (confirmLogout) {

                    /* Remove login state */

                    localStorage.removeItem(
                        "chordoraUserLoggedIn"
                    );


                    /* Return button to Login */

                    loginSmall.textContent =
                        "WELCOME TO CHORDORA";

                    loginText.textContent =
                        "Login / Sign Up";

                    loginSymbol.textContent =
                        "♙";

                    loginArrow.textContent =
                        "→";

                    loginBar.classList.remove(
                        "logout-mode"
                    );


                    /* Make it open login page again */

                    loginBar.onclick = function () {

                        window.location.href =
                            "frontend/html/login_signup.html";

                    };

                }

            }
        );

    }


    /* ================= LOGGED OUT ================= */

    else {

        loginBar.addEventListener(
            "click",
            function () {

                window.location.href =
                    "frontend/html/login_signup.html";

            }
        );

    }


    /* ================= SONG DATABASE ================= */

    const songs = [

        {
            title: "Munbe Vaa",
            artist: "Sillunu Oru Kadhal",
            key: "C",
            chords: ["C", "G", "Am", "F"]
        },

        {
            title: "Vaseegara",
            artist: "Minnale",
            key: "G",
            chords: ["G", "Em", "C", "D"]
        },

        {
            title: "Maruvaarthai",
            artist: "Enai Noki Paayum Thota",
            key: "C",
            chords: ["C", "Am", "F", "G"]
        },

        {
            title: "Why This Kolaveri Di",
            artist: "3",
            key: "Am",
            chords: ["Am", "F", "G", "Em"]
        }

    ];


    /* ================= SEARCH ELEMENTS ================= */

    const songSearch =
        document.getElementById("songSearch");

    const songResults =
        document.getElementById("songResults");

    const songResultCard =
        document.getElementById("songResultCard");

    const songTitle =
        document.getElementById("songTitle");

    const songArtist =
        document.getElementById("songArtist");

    const songKey =
        document.getElementById("songKey");

    const songChords =
        document.getElementById("songChords");

    const searchMessage =
        document.getElementById("searchMessage");


    if (!songSearch) {
        return;
    }


    /* ================= DISPLAY SONG ================= */

    function showSong(song) {

        songTitle.textContent =
            song.title;

        songArtist.textContent =
            song.artist +
            " · Simplified Chords";

        songKey.textContent =
            "Key: " + song.key;

        songChords.innerHTML = "";


        song.chords.forEach(
            function (chord, index) {

                const chordBox =
                    document.createElement("div");

                chordBox.className =
                    "chord";

                chordBox.innerHTML = `
                    <small>
                        ${String(index + 1).padStart(2, "0")}
                    </small>

                    <strong>
                        ${chord}
                    </strong>

                    <span>
                        Chord ${index + 1}
                    </span>
                `;

                songChords.appendChild(
                    chordBox
                );

            }
        );


        songResultCard.classList.remove(
            "empty"
        );

        songResultCard.classList.add(
            "search-highlight"
        );

        searchMessage.textContent =
            "Here are the simplified playable chords for your song.";


        setTimeout(
            function () {

                songResultCard.classList.remove(
                    "search-highlight"
                );

            },
            1200
        );

    }


    /* ================= NO RESULT ================= */

    function showNoResult(searchText) {

        songTitle.textContent =
            "Song not found";

        songArtist.textContent =
            "Try one of the available Tamil songs.";

        songKey.textContent = "";

        songChords.innerHTML = `
            <div class="chord">
                <small>SEARCH</small>
                <strong>?</strong>
                <span>No matching song</span>
            </div>
        `;

        songResultCard.classList.remove(
            "empty"
        );

        searchMessage.textContent =
            'No song found for "' +
            searchText +
            '". Try Munbe Vaa, Vaseegara, Maruvaarthai or Why This Kolaveri Di.';

    }


    /* ================= SEARCH SONG ================= */

    function searchSong() {

        const searchText =
            songSearch.value.trim().toLowerCase();


        if (searchText === "") {

            songResultCard.classList.add(
                "empty"
            );

            return;

        }


        const foundSong =
            songs.find(
                function (song) {

                    return (
                        song.title
                            .toLowerCase()
                            .includes(searchText) ||

                        song.artist
                            .toLowerCase()
                            .includes(searchText)
                    );

                }
            );


        /* Scroll to result */

        songResults.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        if (foundSong) {

            showSong(foundSong);

        } else {

            showNoResult(
                searchText
            );

        }

    }


    /* ================= ENTER SEARCH ================= */

    songSearch.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                searchSong();

            }

        }
    );


    /* ================= CLEAR SEARCH ================= */

    songSearch.addEventListener(
        "input",
        function () {

            const searchText =
                songSearch.value.trim();

            if (searchText === "") {

                songResultCard.classList.add(
                    "empty"
                );

                searchMessage.textContent =
                    "Search for one of the available Tamil songs.";

            }

        }
    );

});