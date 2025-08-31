let slideIndex = 1;
const totalSlides = 8;

function changeSlide(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    
    if (n > totalSlides) { slideIndex = 1; }
    if (n < 1) { slideIndex = totalSlides; }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    // Show current slide and activate current dot
    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");
    
    // Update slide counter
    document.getElementById("currentSlide").textContent = slideIndex;
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowLeft':
            changeSlide(-1);
            break;
        case 'ArrowRight':
            changeSlide(1);
            break;
        case 'Home':
            currentSlide(1);
            break;
        case 'End':
            currentSlide(totalSlides);
            break;
    }
});

// Auto-advance slides (optional - commented out for manual control)
/*
let autoSlideTimer;

function startAutoSlide() {
    autoSlideTimer = setInterval(function() {
        changeSlide(1);
    }, 10000); // Change slide every 10 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideTimer);
}

// Start auto-advance
startAutoSlide();

// Stop auto-advance when user interacts
document.addEventListener('click', stopAutoSlide);
document.addEventListener('keydown', stopAutoSlide);
*/

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    showSlide(slideIndex);
    document.getElementById("totalSlides").textContent = totalSlides;
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            changeSlide(1);
        } else {
            // Swipe right - previous slide
            changeSlide(-1);
        }
    }
}

// Fullscreen support
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Add fullscreen toggle on F key
document.addEventListener('keydown', function(event) {
    if (event.key === 'f' || event.key === 'F') {
        toggleFullscreen();
    }
});