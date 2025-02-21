let currentIndex = 0;
const totalSlides = document.querySelectorAll(".carousel-item").length;
const track = document.querySelector(".carousel-track");
const dots = document.querySelectorAll(".dot");

function moveToSlide(index) {
  if (index >= 0 && index < totalSlides) {
    currentIndex = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }
}

function updateDots() {
  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

// Auto Swipe (Optional)
setInterval(() => {
  moveToSlide((currentIndex + 1) % totalSlides);
}, 5000);
