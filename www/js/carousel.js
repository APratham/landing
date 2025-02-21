let currentIndex = 0;
const totalSlides = document.querySelectorAll(".carousel-item").length;
const track = document.querySelector(".carousel-track");
const dots = document.querySelectorAll(".dot");

let player1, player2;  // YouTube players

// YouTube API ready function
function onYouTubeIframeAPIReady() {
  player1 = new YT.Player('video1', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });

  player2 = new YT.Player('video2', {
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

let isPlaying = false;  // Track whether any video is playing

// Event handler for video state changes
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    isPlaying = true;  // Video is playing
    clearTimeout(autoSwipeTimeout); // Cancel the swipe timeout if video starts playing
  } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
    isPlaying = false; // Video is paused or ended
    startAutoSwipe();  // Start auto swipe after 5 seconds
  }
}

let autoSwipeTimeout; // Store the timeout ID for auto swipe

// Function to move to a specific slide
function moveToSlide(index) {
  if (index >= 0 && index < totalSlides) {
    currentIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }
}

// Function to update the dots
function updateDots() {
  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

// Start auto swipe after 5 seconds if no video is playing
function startAutoSwipe() {
  if (!isPlaying) {
    autoSwipeTimeout = setTimeout(() => {
      moveToSlide((currentIndex + 1) % totalSlides);
    }, 5000); // Delay the swipe by 5 seconds
  }
}

// Initialize YouTube API
function loadYouTubeAPI() {
  const script = document.createElement('script');
  script.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(script);
}

loadYouTubeAPI();
