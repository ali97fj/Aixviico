// Social Media Sharing Functions
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
}

function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://api.whatsapp.com/send?text=${title}%20${url}`, '_blank');
}

function shareOnTelegram() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://t.me/share/url?url=${url}&text=${title}`, '_blank');
}

// Wait for DOM to be fully loaded
window.addEventListener('DOMContentLoaded', function() {
    // Get slider elements
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const prevButton = document.querySelector('.slider-nav.prev');
    const nextButton = document.querySelector('.slider-nav.next');
    const paginationContainer = document.querySelector('.slider-pagination');
    const cards = document.querySelectorAll('.slider-card');

    // Initialize state
    let currentSlide = 0;
    const totalSlides = Math.ceil(cards.length / 3); // Show 3 cards at a time
    const cardWidth = cards[0].offsetWidth + 32; // Including gap

    // Create pagination dots
    function createPagination() {
        paginationContainer.innerHTML = ''; // Clear existing dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = `pagination-dot ${i === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dot.onclick = () => goToSlide(i);
            paginationContainer.appendChild(dot);
        }
    }

    // Update pagination dots
    function updatePagination() {
        const dots = paginationContainer.querySelectorAll('.pagination-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Update navigation buttons
    function updateNavigation() {
        prevButton.style.display = currentSlide <= 0 ? 'none' : 'flex';
        nextButton.style.display = currentSlide >= totalSlides - 1 ? 'none' : 'flex';
    }

    // Go to specific slide
    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        currentSlide = index;
        const scrollAmount = index * (cardWidth * 3); // Scroll 3 cards at a time
        sliderWrapper.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        updatePagination();
        updateNavigation();
    }

    // Event listeners
    prevButton.onclick = () => goToSlide(currentSlide - 1);
    nextButton.onclick = () => goToSlide(currentSlide + 1);

    // Handle scroll events
    let scrollTimeout;
    sliderWrapper.onscroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const newSlide = Math.round(sliderWrapper.scrollLeft / (cardWidth * 3));
            if (newSlide !== currentSlide) {
                currentSlide = newSlide;
                updatePagination();
                updateNavigation();
            }
        }, 100);
    };

    // Handle window resize
    let resizeTimeout;
    window.onresize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate card width and total slides
            const newCardWidth = cards[0].offsetWidth + 32;
            const newTotalSlides = Math.ceil(cards.length / 3);
            if (newCardWidth !== cardWidth || newTotalSlides !== totalSlides) {
                goToSlide(currentSlide);
            }
        }, 100);
    };

    // Initialize slider
    createPagination();
    updateNavigation();
});
