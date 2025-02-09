document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Nav shrink on scroll
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.style.padding = '15px 50px';
            } else {
                nav.style.padding = '20px 50px';
            }
        });
    }

    // Simple and Reliable Testimonial Slider
    const track = document.querySelector('.testimonials-track');
    const slides = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progress = document.querySelector('.scroll-progress');
    
    if (!track || !slides.length) return;

    let currentIndex = 0;
    let isTransitioning = false;
    let interval;

    // Calculate number of visible slides based on screen width
    function getVisibleSlides() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1200) return 2;
        return 3;
    }

    // Calculate maximum index based on visible slides
    function getMaxIndex() {
        return Math.max(0, slides.length - getVisibleSlides());
    }

    function updateSlider() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // Calculate slide movement based on visible slides
        const slidePercentage = (currentIndex * 100) / Math.max(1, getMaxIndex());
        track.style.transform = `translateX(-${currentIndex * (100 / getVisibleSlides())}%)`;
        
        // Update progress bar
        if (progress) {
            progress.style.width = `${slidePercentage}%`;
        }

        // Update button states
        if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        if (nextBtn) nextBtn.style.opacity = currentIndex >= getMaxIndex() ? '0.5' : '1';

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    function nextSlide() {
        if (isTransitioning) return;
        if (currentIndex < getMaxIndex()) {
            currentIndex++;
            updateSlider();
        }
    }

    function prevSlide() {
        if (isTransitioning) return;
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }

    function startAutoSlide() {
        if (interval) clearInterval(interval);
        interval = setInterval(() => {
            if (currentIndex < getMaxIndex()) {
                nextSlide();
            } else {
                currentIndex = 0;
                updateSlider();
            }
        }, 2000);
    }

    // Event Listeners
    prevBtn?.addEventListener('click', () => {
        clearInterval(interval);
        prevSlide();
        startAutoSlide();
    });

    nextBtn?.addEventListener('click', () => {
        clearInterval(interval);
        nextSlide();
        startAutoSlide();
    });

    // Touch events
    let touchStartX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        clearInterval(interval);
    });

    track.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
        startAutoSlide();
    });

    // Pause on hover
    const sliderContainer = document.querySelector('.testimonials');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => clearInterval(interval));
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Handle resize
    window.addEventListener('resize', () => {
        // Reset position and update slider when screen size changes
        currentIndex = 0;
        updateSlider();
    });

    // Initialize
    updateSlider();
    startAutoSlide();
});