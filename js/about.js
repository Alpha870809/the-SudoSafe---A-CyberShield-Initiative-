document.addEventListener('DOMContentLoaded', () => {
    // Initialize Particles.js
   // Update this in your JavaScript file
   if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,  // Increased number of particles
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: ['#ff0000', '#ff3333', '#ff6666']  // Multiple shades of red
            },
            shape: {
                type: ['circle', 'triangle'],  // Added triangles for variety
                stroke: {
                    width: 1,
                    color: '#ff0000'
                }
            },
            opacity: {
                value: 0.8,  // Increased base opacity
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.4,
                    sync: false
                }
            },
            size: {
                value: 4,  // Larger base size
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 2,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ff0000',
                opacity: 0.6,  // More visible lines
                width: 2  // Thicker lines
            },
            move: {
                enable: true,
                speed: 3,  // Faster movement
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'bounce',  // Particles bounce off edges
                bounce: true,
                attract: {  // Added attraction between particles
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: ['grab', 'repulse']  // Multiple hover effects
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 200,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                repulse: {
                    distance: 150,
                    duration: 0.4
                },
                push: {
                    particles_nb: 6  // Push more particles on click
                }
            }
        },
        retina_detect: true,
        fps_limit: 60  // Added FPS limit for better performance
    });
}

// Optional: Add this for dynamic color changing effect
setInterval(() => {
    if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        const particles = window.pJSDom[0].pJS.particles;
        const hue = (Date.now() / 50) % 360;  // Changes color every 50ms
        particles.line_linked.color = `hsl(${hue}, 100%, 50%)`;
        particles.color.value = `hsl(${hue}, 100%, 50%)`;
    }
}, 50);
  // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Scroll reveal functionality
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('reveal');
                }, delay);
                
                observer.unobserve(element);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Observe elements with reveal classes
    const revealElements = document.querySelectorAll([
        '.reveal-on-scroll',
        '.section-title',
        '.vision-card',
        '.team-member',
        '.advisor-card',
        '.culture-point',
        '.career-cta'
    ].join(','));

    revealElements.forEach(element => {
        scrollObserver.observe(element);
    });

    // Nav shrink on scroll
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('nav-shrink');
            } else {
                nav.classList.remove('nav-shrink');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize counter animation for statistics
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const duration = 2000;
        const stepTime = duration / (target / increment);

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = Math.round(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current);
            }
        }, stepTime);
    }

    // Hover effect for team and advisor cards
    const cards = document.querySelectorAll('.team-member, .advisor-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Dynamic background effect for hero section
    const heroSection = document.querySelector('.about-hero');
    if (heroSection) {
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;

            const translateX = (mouseX - 0.5) * 20;
            const translateY = (mouseY - 0.5) * 20;

            heroSection.style.backgroundPosition = `${translateX}px ${translateY}px`;
        });
    }

    // Initialize custom cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add cursor effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });

    // Handle loading state
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});