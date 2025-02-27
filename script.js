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

 // JavaScript untuk menggeser slider dengan mouse
 const slider = document.getElementById('.slide-container');
 let isDragging = false;
 let startX, scrollLeft;

 slider.addEventListener('mousedown', (e) => {
     isDragging = true;
     startX = e.pageX - slider.offsetLeft;
     scrollLeft = slider.scrollLeft;
     slider.style.cursor = 'grabbing'; // Ubah kursor saat menggeser
 });

 slider.addEventListener('mouseleave', () => {
     isDragging = false;
     slider.style.cursor = 'grab'; // Kembalikan kursor ke default
 });

 slider.addEventListener('mouseup', () => {
     isDragging = false;
     slider.style.cursor = 'grab'; // Kembalikan kursor ke default
 });

 slider.addEventListener('mousemove', (e) => {
     if (!isDragging) return;
     e.preventDefault();
     const x = e.pageX - slider.offsetLeft;
     const walk = (x - startX) * 2; // Sesuaikan kecepatan geser
     slider.scrollLeft = scrollLeft - walk;
 });
 // Tambahkan event listener untuk touch devices
slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchend', () => {
    isDragging = false;
});

slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
});

document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener("click", function (e) {
            e.stopPropagation(); // Mencegah event bubbling
            const menu = this.querySelector(".dropdown-menu");
            menu.style.display = menu.style.display === "block" ? "none" : "block";
        });
    });

    // Tutup dropdown saat klik di luar
    document.addEventListener("click", function () {
        dropdowns.forEach((dropdown) => {
            dropdown.querySelector(".dropdown-menu").style.display = "none";
        });
    });
});