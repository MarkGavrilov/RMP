
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let title = document.getElementById("title");
let artist = document.getElementById("artist");
let progress = document.getElementById("progress");
let thumbnail = document.getElementById("thumbnail");
let themeTog = 0;
let background = document.getElementById("background");

let songs = [
    //1
    { src: "songs/Mercy.mp3", artist: "BOSSFIGHT x F.O.O.L", title: "Mercy", img: "thumbnails/mercy.jpg" },
    //2
    { src: "songs/Evolution.mp3", artist:"Creo", title: "Evolution", img:"thumbnails/evolution.jpg" },
    //3
    { src: "songs/Sugar Rush.mp3", artist:"PIXL", title: "Sugar Rush", img:"thumbnails/sugar rush.jpg" },
    //4
    { src: "songs/The Stains Of Time.mp3", artist:"Logan Mader & Jamie Christopherson", title: "The Stains Of Time", img:"thumbnails/mgr.jpg" },
    //5
    { src: "songs/Apex.mp3", artist:"Vicetone", title: "Apex", img:"thumbnails/RLxMC vol 1.jpg" },
    //6
    { src: "songs/Horsepower Remix.mp3", artist:"MUZZ (F.O.O.L & TOKYO ROSE REMIX)", title: "Horsepower", img:"thumbnails/horsepower remix.jpg" },
    //7
    { src: "songs/The One.mp3", artist:"Habstrakt", title: "The One", img:"thumbnails/the one.jpg" },
    //8
    { src: "songs/Power Stone.mp3", artist:"Crankdat", title: "Power Stone", img:"thumbnails/power stone.jpg" },
    //9
    { src: "songs/Bust It Out.mp3", artist:"FWLR", title: "Bust It Out", img:"thumbnails/bust it out.jpg" },
    //10
    { src: "songs/Fake.mp3", artist:"BOSSFIGHT", title: "Fake", img:"thumbnails/fake.jpg" },
    //11
    { src: "songs/Awaken.mp3", artist:"Creo", title: "Awaken", img:"thumbnails/awaken.jpg" },
    //12
    { src: "songs/Horsepower.mp3", artist:"MUZZ", title: "Horsepower", img:"thumbnails/horsepower.jpg" },
    //13
    { src: "songs/BARRICADE.mp3", artist:"REAPER", title: "BARRICADE", img:"thumbnails/barricade.jpg" },
    //14
    { src: "songs/Tokyo Drift.mp3", artist:"KUURO x Saint Punk", title: "Tokyo Drift", img:"thumbnails/tokyo drift.jpg" },
    //15
    { src: "songs/Damage.mp3", artist:"F.O.O.L", title: "Damage", img:"thumbnails/damage.jpg" },
    //16
    { src: "songs/DRIFTER.mp3", artist:"THIRST & CHYL", title: "DRIFTER", img:"thumbnails/drifter.jpg" },
    //17
    { src: "songs/Pressure on the Masses.mp3", artist:"MUZZ", title: "Pressure on the Masses", img:"thumbnails/pressure on the masses.jpg" },
    //18
    { src: "songs/Encounter.mp3", artist:"F.O.O.L & Waveshaper", title: "Encounter", img:"thumbnails/encounter.jpg" },
    //19
    { src: "songs/AGONIZE.mp3", artist:"F.O.O.L & Extra Terra", title: "AGONIZE", img:"thumbnails/agonize.jpg" },
    //20
    { src: "songs/LAND OF FIRE.mp3", artist:"KORDHELL", title: "LAND OF FIRE", img:"thumbnails/land of fire.jpg" },
    //21
    { src: "songs/HOT SHOT.mp3", artist:"Tokyo Machine", title: "HOT SHOT", img:"thumbnails/hot shot.jpg" },
    //22
    { src: "songs/Revenge.mp3", artist:"Dirtyphonics & BOSSFIGHT", title: "Revenge", img:"thumbnails/revenge.jpg" },
    //23
    { src: "songs/Burbank Nights.mp3", artist:"Dirtyphonics", title: "Burbank Nights", img:"thumbnails/burbank nights.jpg" },
    //24
    { src: "songs/You Want Me.mp3", artist:"Dirtyphonics", title: "You Want Me", img:"thumbnails/you want me.jpg" },
    //25
    { src: "songs/MURDER PLOT.mp3", artist:"KORDHELL", title: "MURDER PLOT", img:"thumbnails/murder plot.jpg" },
];

shuffleSongs(songs);

let currentSongIndex = 0;
let history = [];

function shuffleSongs(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadSong(index) {
    song.src = songs[index].src;
    title.innerHTML = songs[index].title;
    thumbnail.src = songs[index].img;
    artist.innerHTML = songs[index].artist;
    song.load();
    if(themeTog == 0){
        ctrlIcon.src = "icons/play-dark.png";
    }
    else{
        ctrlIcon.src = "icons/play-light.png";
    }
    progress.value = 0;
    background.src = songs[index].img;
}

function playPause() {
    if (song.paused) {
        song.play();
        if(themeTog == 0){
            ctrlIcon.src = "icons/pause-dark.png";
        }
        else{
            ctrlIcon.src = "icons/pause-light.png";
        }
    } else {
        song.pause();
        if(themeTog == 0){
        ctrlIcon.src = "icons/play-dark.png";
    }
    else{
        ctrlIcon.src = "icons/play-light.png";
    }
    }
}

function nextSong() {
    if (currentSongIndex + 1 < songs.length){
        if (history.length === 0 || history[history.length - 1] !== currentSongIndex) {
            history.push(currentSongIndex);
        }
        currentSongIndex += 1;
    }
    else{
        shuffleSongs(songs);
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    song.play();
}

function previousSong() {
    if (song.currentTime >= 10) {
        song.currentTime = 0;
    }
    else{
        if (history.length > 0) {
            currentSongIndex = history.pop();
            loadSong(currentSongIndex);
            song.play();
        }
        else{
            song.currentTime = 0;
        }
    }
}

let repToggle = 0;

function repeat(){
    if(repToggle == 0){
        document.getElementById("repeat-light").style.backgroundColor = "limegreen";
        repToggle = 1;
    }
    else{
        document.getElementById("repeat-light").style.backgroundColor = "red";
        repToggle = 0;
    }
}

song.onloadedmetadata = function() {
    progress.max = song.duration;
    progress.value = song.currentTime;
    updateProgressBar();
}

song.ontimeupdate = function() {
    progress.value = song.currentTime;
    updateProgressBar();
}

progress.oninput = function() {
    song.currentTime = progress.value;
    updateProgressBar();
}

function updateProgressBar() {
    const percent = (song.currentTime / song.duration) * 100;
    progress.style.background = `linear-gradient(to right, black ${percent}%, white ${percent}%)`;
}

song.onended = function() {
    if(repToggle == 0){
        nextSong();
    }
    else{
        song.currentTime = 0;
        song.play();
    }
}

song.onpause = function() {
    if(themeTog == 0){
        ctrlIcon.src = "icons/play-dark.png";
    }
    else{
        ctrlIcon.src = "icons/play-light.png";
    }
}

song.onplay = function() {
    if(themeTog == 0){
        ctrlIcon.src = "icons/pause-dark.png";
    }
    else{
        ctrlIcon.src = "icons/pause-light.png";
    }
}


// Initial load
loadSong(currentSongIndex);

// Headphone controls
navigator.mediaSession.setActionHandler('previoustrack', function() {
    previousSong();
});
navigator.mediaSession.setActionHandler('nexttrack', function() {
    nextSong();
});
navigator.mediaSession.setActionHandler('play', function() {
    song.play();
});
navigator.mediaSession.setActionHandler('pause', function() {
    song.pause();
});

// Dark mode controls

let buttons = document.getElementsByClassName("buttons");

function themeToggle(){
    if(themeTog == 0){
        title.style.color = "white";
        artist.style.color = "white";
        document.getElementById("bcwImg").src = "icons/backward-light.png";
        if(song.paused == 1){
            ctrlIcon.src = "icons/play-light.png";
        }
        else{
            ctrlIcon.src = "icons/pause-light.png";
        }
        document.getElementById("frwImg").src = "icons/forward-light.png";
        document.getElementById("repeat").style.backgroundColor = "#111";
        document.getElementById("rptImg").src = "icons/repeat-light.png";
        document.getElementById("music-player").style.backgroundColor = "#333";
        if (bgToggler == 0){
            document.getElementById("music-player").style.outline = "gray solid 1px";
        }
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = "#111";
        }
        document.getElementById("night-mode").innerHTML = "Light Mode";
        themeTog = 1;
    }
    else{
        title.style.color = "black";
        artist.style.color = "black";
        document.getElementById("bcwImg").src = "icons/backward-dark.png";
        if(song.paused == 1){
            ctrlIcon.src = "icons/play-dark.png";
        }
        else{
            ctrlIcon.src = "icons/pause-dark.png";
        }
        document.getElementById("frwImg").src = "icons/forward-dark.png";
        document.getElementById("rptImg").src = "icons/repeat-dark.png";
        document.getElementById("repeat").style.backgroundColor = "rgb(245, 245, 245)";
        document.getElementById("music-player").style.backgroundColor = "rgb(235, 235, 188)";
        document.getElementById("music-player").style.border = "none";
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = "rgb(245, 245, 245)";
        }
        document.getElementById("night-mode").innerHTML = "Dark Mode";
        themeTog = 0;
    }
}

// Button hovering effects

function prevOver(){
    if(themeTog == 0){
        document.getElementById("backward").style.backgroundColor = "white";
    }
    else{
        document.getElementById("backward").style.backgroundColor = "#222";
    }
}
function prevOut(){
    if(themeTog == 0){
        document.getElementById("backward").style.backgroundColor = "rgb(245, 245, 245)";
    }
    else{
        document.getElementById("backward").style.backgroundColor = "#111";
    }
}

function playOver(){
    if(themeTog == 0){
        document.getElementById("play").style.backgroundColor = "white";
    }
    else{
        document.getElementById("play").style.backgroundColor = "#222";
    }
}
function playOut(){
    if(themeTog == 0){
        document.getElementById("play").style.backgroundColor = "rgb(245, 245, 245)";
    }
    else{
        document.getElementById("play").style.backgroundColor = "#111";
    }
}

function nextOver(){
    if(themeTog == 0){
        document.getElementById("forward").style.backgroundColor = "white";
    }
    else{
        document.getElementById("forward").style.backgroundColor = "#222";
    }
}
function nextOut(){
    if(themeTog == 0){
        document.getElementById("forward").style.backgroundColor = "rgb(245, 245, 245)";
    }
    else{
        document.getElementById("forward").style.backgroundColor = "#111";
    }
}

function repOver(){
    if(themeTog == 0){
        document.getElementById("repeat").style.backgroundColor = "white";
    }
    else{
        document.getElementById("repeat").style.backgroundColor = "#222";
    }
}
function repOut(){
    if(themeTog == 0){
        document.getElementById("repeat").style.backgroundColor = "rgb(245, 245, 245)";
    }
    else{
        document.getElementById("repeat").style.backgroundColor = "#111";
    }
}

// Enable/Disable custom backgrounds

let bgToggler = 0;

function bgToggle(){
    if (bgToggler == 0){
        background.style.display = "inline-block";
        document.getElementById("cBgButton").innerHTML = "Disable Backgrounds";
        if (themeTog == 1){
            document.getElementById("music-player").style.border = "none";
        }
        bgToggler = 1;
    }
    else{
        background.style.display = "none";
        document.getElementById("cBgButton").innerHTML = "Enable Backgrounds";
        if (themeTog == 1){
            document.getElementById("music-player").style.outline = "gray solid 1px";
        }
        bgToggler = 0;
    }
}