// Select DOM elements
const videoElement = document.getElementById('video');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-bar');
const volumeSlider = document.getElementById('volume');
const speedSelect = document.getElementById('speed');

// Video data
const videos = [
    { 
        title: 'dhacar season', 
        artist: 'Local Media', 
        src: './media/dhacar.mp4'
    },
    { 
        title: 'Nature Video', 
        artist: 'Local Media', 
        src: './media/video2.mp4'
    },
    { 
        title: 'City Video', 
        artist: 'Local Media', 
        src: './media/video3.mp4'
    }
];

// Keep track of videos
let videoIndex = 0;
let isPlaying = false;
let speed = 1;

// Load video details
function loadVideo(video) {
    title.textContent = video.title;
    artist.textContent = video.artist;
    
    // Reset video source
    videoElement.src = video.src;
    
    // Add error handling
    videoElement.onerror = function() {
        console.error('Error loading video:', video.src);
        title.textContent = 'Error loading video';
        artist.textContent = 'Please try another video';
        
        // Try to load next video after 3 seconds if current one fails
        setTimeout(() => {
            nextVideo();
        }, 3000);
    };

    // Add loading indicator
    videoElement.onloadstart = function() {
        title.textContent = 'Loading...';
    };

    // Reset progress bar
    progress.style.width = '0%';
    currentTimeEl.textContent = '0:00';
    durationEl.textContent = '0:00';
    
    // Update title and artist once video is ready
    videoElement.oncanplay = function() {
        title.textContent = video.title;
        artist.textContent = video.artist;
    };
}

// Play video
function playVideo() {
    playBtn.querySelector('i').classList.replace('fa-play', 'fa-pause');
    videoElement.play();
    isPlaying = true;
}

// Pause video
function pauseVideo() {
    playBtn.querySelector('i').classList.replace('fa-pause', 'fa-play');
    videoElement.pause();
    isPlaying = false;
}

// Previous video
function prevVideo() {
    videoIndex = (videoIndex - 1 + videos.length) % videos.length;
    loadVideo(videos[videoIndex]);
    playVideo();
}

// Next video
function nextVideo() {
    videoIndex = (videoIndex + 1) % videos.length;
    loadVideo(videos[videoIndex]);
    playVideo();
}

// Update progress bar
function updateProgress() {
    const { duration, currentTime } = videoElement;
    if (!isNaN(duration)) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration % 60).toString().padStart(2, '0');
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set video time
function setProgress(e) {
    const newTime = (e.offsetX / progressContainer.clientWidth) * videoElement.duration;
    videoElement.currentTime = isFinite(newTime) ? newTime : 0;
}

// Event listeners
playBtn.addEventListener('click', () => isPlaying ? pauseVideo() : playVideo());
prevBtn.addEventListener('click', prevVideo);
nextBtn.addEventListener('click', nextVideo);
videoElement.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', e => videoElement.volume = e.target.value);
speedSelect.addEventListener('change', e => videoElement.playbackRate = parseFloat(e.target.value));

// Load initial video
loadVideo(videos[videoIndex]);

// Add these event listeners at the bottom of your file
videoElement.addEventListener('ended', nextVideo); // Auto play next video when current one ends
videoElement.addEventListener('loadedmetadata', () => {
    // Update duration once video metadata is loaded
    const durationMinutes = Math.floor(videoElement.duration / 60);
    const durationSeconds = Math.floor(videoElement.duration % 60).toString().padStart(2, '0');
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
});

// Add keyboard controls
document.addEventListener('keydown', (e) => {
    switch(e.key.toLowerCase()) {
        case ' ':
            e.preventDefault();
            isPlaying ? pauseVideo() : playVideo();
            break;
        case 'arrowright':
            nextVideo();
            break;
        case 'arrowleft':
            prevVideo();
            break;
        case 'm':
            videoElement.muted = !videoElement.muted;
            break;
    }
});
