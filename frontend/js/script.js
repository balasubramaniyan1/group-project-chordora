
document.addEventListener("DOMContentLoaded", function(){

/* LOGIN / LOGOUT */

const loginBar=document.getElementById("loginBar");
const loginSymbol=document.getElementById("loginSymbol");
const loginSmall=document.getElementById("loginSmall");
const loginText=document.getElementById("loginText");
const loginArrow=document.getElementById("loginArrow");

function updateLogin(){
    const loggedIn=localStorage.getItem("chordoraUserLoggedIn")==="true";

    if(loggedIn){
        loginSmall.textContent="WELCOME BACK";
        loginText.textContent="Logout";
        loginSymbol.textContent="✓";
        loginArrow.textContent="↗";
        loginBar.classList.add("logout-mode");
    }else{
        loginSmall.textContent="WELCOME TO CHORDORA";
        loginText.textContent="Login / Sign Up";
        loginSymbol.textContent="♙";
        loginArrow.textContent="→";
        loginBar.classList.remove("logout-mode");
    }
}

if(loginBar){
    updateLogin();

    loginBar.addEventListener("click",function(){
        const loggedIn=localStorage.getItem("chordoraUserLoggedIn")==="true";

        if(loggedIn){
            if(confirm("Are you sure you want to logout?")){
                localStorage.removeItem("chordoraUserLoggedIn");
                updateLogin();
            }
        }else{
            window.location.href="frontend/html/login_signup.html";
        }
    });
}


/* THREE DOT MENU */

const menuButton=document.getElementById("mobileMenuButton");
const mobileMenu=document.getElementById("mobileMenu");

if(menuButton && mobileMenu){

    menuButton.addEventListener("click",function(event){
        event.stopPropagation();
        mobileMenu.classList.toggle("active");

        const open=mobileMenu.classList.contains("active");
        menuButton.setAttribute("aria-expanded",open);
    });

    mobileMenu.querySelectorAll("a").forEach(function(link){
        link.addEventListener("click",function(){
            mobileMenu.classList.remove("active");
            menuButton.setAttribute("aria-expanded","false");
        });
    });

    document.addEventListener("click",function(event){
        if(!mobileMenu.contains(event.target) &&
           !menuButton.contains(event.target)){
            mobileMenu.classList.remove("active");
            menuButton.setAttribute("aria-expanded","false");
        }
    });

    document.addEventListener("keydown",function(event){
        if(event.key==="Escape"){
            mobileMenu.classList.remove("active");
            menuButton.setAttribute("aria-expanded","false");
        }
    });
}


/* SONG DATABASE */

const songs=[
{
title:"Munbe Vaa",
artist:"Sillunu Oru Kadhal",
key:"C",
chords:["C","G","Am","F"]
},
{
title:"Vaseegara",
artist:"Minnale",
key:"G",
chords:["G","Em","C","D"]
},
{
title:"Maruvaarthai",
artist:"Enai Noki Paayum Thota",
key:"C",
chords:["C","Am","F","G"]
},
{
title:"Why This Kolaveri Di",
artist:"3",
key:"Am",
chords:["Am","F","G","Em"]
}
];


/* SEARCH ELEMENTS */

const songSearch=document.getElementById("songSearch");
const songResults=document.getElementById("songResults");
const songResultCard=document.getElementById("songResultCard");
const songTitle=document.getElementById("songTitle");
const songArtist=document.getElementById("songArtist");
const songKey=document.getElementById("songKey");
const songChords=document.getElementById("songChords");
const searchMessage=document.getElementById("searchMessage");

if(!songSearch)return;


/* SHOW SONG */

function showSong(song){

    songTitle.textContent=song.title;
    songArtist.textContent=song.artist+" · Simplified Chords";
    songKey.textContent="Key: "+song.key;
    songChords.innerHTML="";

    song.chords.forEach(function(chord,index){

        const box=document.createElement("div");
        box.className="chord";

        box.innerHTML=`
            <small>${String(index+1).padStart(2,"0")}</small>
            <strong>${chord}</strong>
            <span>Chord ${index+1}</span>
        `;

        songChords.appendChild(box);
    });

    songResultCard.classList.remove("empty");
    songResultCard.classList.add("search-highlight");

    searchMessage.textContent=
        "Here are the simplified playable chords for your song.";

    setTimeout(function(){
        songResultCard.classList.remove("search-highlight");
    },1200);
}


/* NO RESULT */

function showNoResult(text){

    songTitle.textContent="Song not found";
    songArtist.textContent="Try one of the available Tamil songs.";
    songKey.textContent="";

    songChords.innerHTML=`
        <div class="chord">
            <small>SEARCH</small>
            <strong>?</strong>
            <span>No matching song</span>
        </div>
    `;

    songResultCard.classList.remove("empty");

    searchMessage.textContent=
        'No song found for "'+text+
        '". Try Munbe Vaa, Vaseegara, Maruvaarthai or Why This Kolaveri Di.';
}


/* SEARCH */

function searchSong(){

    const text=songSearch.value.trim().toLowerCase();

    if(text===""){
        songResultCard.classList.add("empty");
        return;
    }

    const found=songs.find(function(song){
        return song.title.toLowerCase().includes(text) ||
               song.artist.toLowerCase().includes(text);
    });

    songResults.scrollIntoView({
        behavior:"smooth",
        block:"start"
    });

    if(found){
        showSong(found);
    }else{
        showNoResult(text);
    }
}


/* ENTER SEARCH */

songSearch.addEventListener("keydown",function(event){

    if(event.key==="Enter"){
        event.preventDefault();
        searchSong();
    }

});


/* CLEAR SEARCH */

songSearch.addEventListener("input",function(){

    if(songSearch.value.trim()===""){

        songResultCard.classList.add("empty");

        searchMessage.textContent=
            "Search for one of the available Tamil songs.";
    }

});

});