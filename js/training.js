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
    const announcement = document.getElementById('announcement');
    let lastScrollTop = 0;

    if (nav) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove shrink class based on scroll direction
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                nav.classList.add('shrink');
                if (announcement) announcement.style.display = 'none';
            } else {
                nav.classList.remove('shrink');
                if (announcement) announcement.style.display = 'flex';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Course card hover effects
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add hover class to trigger animations
            card.classList.add('hover');
            
            // Animate feature items sequentially
            const features = card.querySelectorAll('.feature-item');
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.classList.add('animate');
                }, index * 100);
            });
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
            
            // Remove animation classes from features
            const features = card.querySelectorAll('.feature-item');
            features.forEach(feature => {
                feature.classList.remove('animate');
            });
        });
    });

    // Button click effects
    const buttons = document.querySelectorAll('.download-btn, .request-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            // Position the ripple
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Handle button actions
            if (this.classList.contains('download-btn')) {
                handleDownload(this);
            } else if (this.classList.contains('request-btn')) {
                handleRequest(this);
            }
        });
    });

    // Download brochure handler
    function handleDownload(button) {
        // Get the course title from the closest course card
        const courseCard = button.closest('.course-card');
        const courseTitle = courseCard.querySelector('.course-title').textContent;
        
        // Add loading state
        button.classList.add('loading');
        button.textContent = 'Preparing...';
        
        // Simulate download delay
        setTimeout(() => {
            button.classList.remove('loading');
            button.textContent = 'Download Brochure';
            
            // Show success message
            const message = document.createElement('div');
            message.classList.add('success-message');
            message.textContent = 'Brochure download started';
            courseCard.appendChild(message);
            
            setTimeout(() => {
                message.remove();
            }, 3000);
        }, 1500);
    }

    // Request training handler
    function handleRequest(button) {
        // Get the course title
        const courseCard = button.closest('.course-card');
        const courseTitle = courseCard.querySelector('.course-title').textContent;
        
        // Add loading state
        button.classList.add('loading');
        button.textContent = 'Sending...';
        
        // Simulate request delay
        setTimeout(() => {
            button.classList.remove('loading');
            button.textContent = 'Request Training';
            
            // Show modal or success message
            const message = document.createElement('div');
            message.classList.add('success-message');
            message.textContent = 'Request sent successfully';
            courseCard.appendChild(message);
            
            setTimeout(() => {
                message.remove();
            }, 3000);
        }, 1500);
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe course cards for scroll animations
    courseCards.forEach(card => {
        observer.observe(card);
    });

    // Hero section parallax effect
    const heroSection = document.querySelector('.training-hero');
    const heroContent = document.querySelector('.training-hero-content');

    if (heroSection && heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            // Parallax effect
            heroContent.style.transform = `translate3d(0, ${rate}px, 0)`;
            
            // Fade effect
            const opacity = 1 - (scrolled / heroSection.offsetHeight);
            heroContent.style.opacity = Math.max(opacity, 0);
        });
    }

    // Initialize AOS (if using Animate On Scroll library)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // Generate binary text
    const binaryText = document.querySelector('.binary-text');
    if (binaryText) {
        const generateBinary = () => {
            let binary = '';
            for (let i = 0; i < 1000; i++) {
                binary += Math.random() > 0.5 ? '1' : '0';
                if (i % 20 === 0) binary += '\n';
            }
            return binary;
        };
        binaryText.textContent = generateBinary();
    }

    // Create particles
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const angle = Math.random() * Math.PI * 2;
            const radius = 150;
            const startX = Math.cos(angle) * radius;
            const startY = Math.sin(angle) * radius;
            
            particle.style.left = `calc(50% + ${startX}px)`;
            particle.style.top = `calc(50% + ${startY}px)`;
            
            // Random movement
            const endX = (Math.random() - 0.5) * 100;
            const endY = (Math.random() - 0.5) * 100;
            particle.style.setProperty('--x', `${endX}px`);
            particle.style.setProperty('--y', `${endY}px`);
            
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            particle.addEventListener('animationend', () => {
                particle.remove();
            });
        };

        // Create particles periodically
        setInterval(createParticle, 200);
    }

    // Add interaction effects
    const visualContainer = document.querySelector('.visual-container');
    if (visualContainer) {
        visualContainer.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = visualContainer.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) / 20;
            const y = (e.clientY - top - height / 2) / 20;

            visualContainer.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
            
            // Adjust icon positions based on mouse
            document.querySelectorAll('.security-icon').forEach(icon => {
                const factor = 0.1;
                const rect = icon.getBoundingClientRect();
                const iconX = (rect.left + rect.width / 2 - e.clientX) * factor;
                const iconY = (rect.top + rect.height / 2 - e.clientY) * factor;
                
                icon.style.transform = `translate(${-iconX}px, ${-iconY}px)`;
            });
        });

        visualContainer.addEventListener('mouseleave', () => {
            visualContainer.style.transform = '';
            document.querySelectorAll('.security-icon').forEach(icon => {
                icon.style.transform = '';
            });
        });
    }
});