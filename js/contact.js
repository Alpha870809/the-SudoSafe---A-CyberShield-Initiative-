document.addEventListener('DOMContentLoaded', () => {
    // Form handling
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm?.querySelector('.submit-btn');
    const formGroups = document.querySelectorAll('.form-group');

    // Animated label handling
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');

        if (input && label) {
            // Check initial state
            if (input.value) {
                label.classList.add('active');
            }

            // Handle input events
            input.addEventListener('focus', () => {
                label.classList.add('active');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.classList.remove('active');
                }
            });
        }
    });

    // Form submission handling
    contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic validation
        const formData = new FormData(contactForm);
        let isValid = true;
        let firstInvalidField = null;

        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const errorMessage = group.querySelector('.error-message');

            if (input?.required && !input.value.trim()) {
                isValid = false;
                if (!firstInvalidField) firstInvalidField = input;
                
                // Add error state
                input.classList.add('error');
                if (!errorMessage) {
                    const error = document.createElement('div');
                    error.className = 'error-message';
                    error.textContent = 'This field is required';
                    group.appendChild(error);
                }
            } else {
                // Remove error state
                input?.classList.remove('error');
                errorMessage?.remove();
            }
        });

        if (!isValid) {
            firstInvalidField?.focus();
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message. We\'ll get back to you soon!';
            
            // Remove any existing success message
            const existingMessage = contactForm.querySelector('.success-message');
            if (existingMessage) {
                existingMessage.remove();
            }

            contactForm.appendChild(successMessage);
            successMessage.classList.add('show');

            // Reset form
            contactForm.reset();
            formGroups.forEach(group => {
                const label = group.querySelector('label');
                label?.classList.remove('active');
            });

        } catch (error) {
            console.error('Form submission error:', error);
            // Handle error state
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
        }
    });

    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.animate-text, .animate-text-delay, .animate-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });

    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks?.classList.toggle('active');
    });

    // Scroll-based navigation effects
    let lastScroll = 0;
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            nav?.classList.add('nav-hidden');
        } else {
            // Scrolling up
            nav?.classList.remove('nav-hidden');
        }

        if (currentScroll < 100) {
            nav?.classList.remove('nav-scrolled');
        } else {
            nav?.classList.add('nav-scrolled');
        }

        lastScroll = currentScroll;
    });
});