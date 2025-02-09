document.addEventListener('DOMContentLoaded', () => {
    // Initialize matrix background
    initMatrixBackground();
    
    // Initialize animations and interactions
    initializeServiceCards();
    initializeStats();
    initScrollAnimations();
    
    // Handle navigation and mobile menu
    setupNavigation();
});

// Matrix Background Animation
function initMatrixBackground() {
    const matrixBg = document.getElementById('matrixBg');
    if (!matrixBg) return;

    // Create matrix characters
    const characters = '01';
    const fontSize = 14;
    const columns = Math.floor(matrixBg.clientWidth / fontSize);
    const drops = Array(columns).fill(1);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = matrixBg.clientWidth;
    canvas.height = matrixBg.clientHeight;
    matrixBg.appendChild(canvas);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#c92727';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);
}

// Service Cards Interactions
function initializeServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        // Add hover animations
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.service-icon');
            const features = card.querySelectorAll('.feature-list li');
            
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
            
            features.forEach((feature, index) => {
                feature.style.transform = 'translateX(10px)';
                feature.style.transition = `transform 0.3s ease ${index * 0.1}s`;
            });
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.service-icon');
            const features = card.querySelectorAll('.feature-list li');
            
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
            
            features.forEach(feature => {
                feature.style.transform = 'translateX(0)';
            });
        });

        // Add click interaction for mobile
        card.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                cards.forEach(c => c !== card && c.classList.remove('active'));
                card.classList.toggle('active');
            }
        });
    });
}

// Animate Statistics
function initializeStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    function animateStat(stat) {
        const value = parseFloat(stat.getAttribute('data-value'));
        const suffix = stat.getAttribute('data-suffix') || '';
        let current = 0;
        const duration = 2000; // 2 seconds
        const step = value / (duration / 16); // 60fps

        function update() {
            if (current < value) {
                current = Math.min(current + step, value);
                stat.textContent = Math.floor(current).toLocaleString() + suffix;
                requestAnimationFrame(update);
            }
        }

        update();
    }

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    stats.forEach(stat => observer.observe(stat));
}

// Scroll Animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .feature, .stat');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    elements.forEach(element => observer.observe(element));
}

// Navigation and Mobile Menu
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('nav');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Shrink navigation on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.classList.add('shrink');
        } else {
            nav.classList.remove('shrink');
        }
        
        lastScroll = currentScroll;
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks?.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                navLinks?.classList.remove('active');
                hamburger?.classList.remove('active');
            }
        });
    });
}

// Form handling
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitBtn = this.querySelector('button[type="submit"]');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Simulate form submission
    setTimeout(() => {
        submitBtn.textContent = 'Sent Successfully!';
        
        // Show success message
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = 'Thank you for your interest. We will contact you soon!';
        this.appendChild(message);

        // Reset form
        this.reset();

        // Reset button after delay
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Request Demo';
            message.remove();
        }, 3000);
    }, 1500);
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    document.body.classList.add('resize-animation-stopper');
    
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
        initMatrixBackground(); // Reinitialize matrix background on resize
    }, 400);
});