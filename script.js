document.addEventListener('DOMContentLoaded', () => {
    // Navigation menu functionality
    const navToggle = document.getElementById('navToggle');
    const navClose = document.getElementById('navClose');
    const sideNav = document.querySelector('.side-nav');
    
    if (navToggle && navClose && sideNav) {
        const navOverlay = document.createElement('div');
        navOverlay.classList.add('nav-overlay');
        document.body.appendChild(navOverlay);

        navToggle.addEventListener('click', () => {
            sideNav.classList.add('active');
            navOverlay.classList.add('active');
            navToggle.classList.add('hidden');
        });

        [navClose, navOverlay].forEach(elem => {
            elem.addEventListener('click', () => {
                sideNav.classList.remove('active');
                navOverlay.classList.remove('active');
                navToggle.classList.remove('hidden');
            });
        });
    }

    // Slider functionality
    const slides = document.querySelectorAll('.slide-card');
    const prevButton = document.querySelector('.slide-button.prev');
    const nextButton = document.querySelector('.slide-button.next');
    const slideContainer = document.querySelector('.slide-container');

    if (slides.length && prevButton && nextButton && slideContainer) {
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        // Event listeners for slide buttons
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);

        // Auto slide every 5 seconds
        let slideInterval = setInterval(nextSlide, 5000);

        // Pause auto slide on hover
        slideContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slideContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });

        // Initialize first slide
        showSlide(0);
    }
});
