// Sample tracks array — Swap these URLs out with your live audio links
const nohaList = [
    {
        title: "Noha 1 Title Sample",
        artist: "Nadeem Sarwar",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Noha 2 Title Sample",
        artist: "Mir Hasan Mir",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Noha 3 Title Sample",
        artist: "Ali Shanawar",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

let currentTrackIndex = 0;
let isPlaying = false;

// DOM Selectors
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('btn-play');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('total-duration');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const playlistContainer = document.getElementById('playlist');

// Initialize Player App
function initPlayer() {
    buildPlaylistUI();
    loadTrack(currentTrackIndex);
}

function buildPlaylistUI() {
    playlistContainer.innerHTML = '';
    nohaList.forEach((noha, index) => {
        const li = document.createElement('li');
        li.dataset.index = index;
        if(index === currentTrackIndex) li.classList.add('active');
        
        li.innerHTML = `
            <span>${noha.title}</span>
            <span class="reciter">${noha.artist}</span>
        `;
        
        li.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            playTrack();
        });
        playlistContainer.appendChild(li);
    });
}

function loadTrack(index) {
    audio.src = nohaList[index].url;
    trackTitle.innerText = nohaList[index].title;
    trackArtist.innerText = nohaList[index].artist;
    
    // Update active highlight class in list elements
    const trackItems = playlistContainer.querySelectorAll('li');
    trackItems.forEach(item => item.classList.remove('active'));
    if(trackItems[index]) trackItems[index].classList.add('active');

    progressBar.value = 0;
}

function playTrack() {
    isPlaying = true;
    audio.play().catch(err => console.log("Audio playback user trigger safety flag checked: ", err));
    playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

function pauseTrack() {
    isPlaying = false;
    audio.pause();
    playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
}

// Toggle Play / Pause Event Link
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
});

// Skip Controls
prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + nohaList.length) % nohaList.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) playTrack();
});

nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % nohaList.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) playTrack();
});

// Update Progress Timeline
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
        
        // Format values into readable mm:ss blocks
        currentTimeEl.innerText = formatTime(audio.currentTime);
        durationTimeEl.innerText = formatTime(audio.duration);
    }
});

// Manual Scrub on Timeline Progress Bar
progressBar.addEventListener('input', () => {
    const targetTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = targetTime;
});

// Track ends -> Auto skip logic
audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % nohaList.length;
    loadTrack(currentTrackIndex);
    playTrack();
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Fire application initialization scripts
window.addEventListener('DOMContentLoaded', initPlayer);
