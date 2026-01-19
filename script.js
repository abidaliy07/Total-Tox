// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for sticky navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Appointment Form Handling with Formspree
const appointmentForm = document.getElementById('appointmentForm');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = appointmentForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Remove any existing success/error messages
        const existingMessage = appointmentForm.querySelector('.form-success, .form-error');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Get form data
        const formData = new FormData(appointmentForm);

        try {
            // Submit to Formspree
            const response = await fetch(appointmentForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Thank you! Your appointment request has been received. We will contact you within 24 hours to confirm.';
                appointmentForm.insertBefore(successMessage, appointmentForm.firstChild);

                // Reset form
                appointmentForm.reset();

                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                // Remove success message after 8 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 8000);
            } else {
                // Handle error
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-error';
                errorMessage.textContent = 'Sorry, there was an error submitting your request. Please call us at (914) 598-1268 or try again later.';
                appointmentForm.insertBefore(errorMessage, appointmentForm.firstChild);
                
                setTimeout(() => {
                    errorMessage.remove();
                }, 8000);
            }
        } catch (error) {
            // Network error
            const errorMessage = document.createElement('div');
            errorMessage.className = 'form-error';
            errorMessage.textContent = 'Network error. Please check your connection and try again, or call us at (914) 598-1268.';
            appointmentForm.insertBefore(errorMessage, appointmentForm.firstChild);
            
            setTimeout(() => {
                errorMessage.remove();
            }, 8000);
        } finally {
            // Reset button
            submitButton.classList.remove('loading');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Set minimum date for date input to today
const dateInput = document.getElementById('preferred-date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and feature cards
document.querySelectorAll('.service-card, .service-card-large, .feature-card, .contact-card, .method-card, .panel-card, .about-feature').forEach(card => {
    card.classList.add('fade-in');
    observer.observe(card);
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        e.target.value = value;
    });
}

// Form validation enhancement
const formInputs = document.querySelectorAll('.appointment-form input, .appointment-form select, .appointment-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#dc2626';
        } else {
            input.style.borderColor = '';
        }
    });

    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(220, 38, 38)') {
            input.style.borderColor = '';
        }
    });
});

// Add click-to-call functionality for mobile
if (window.innerWidth <= 768) {
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', (e) => {
            // Analytics tracking could go here
            console.log('Phone number clicked:', link.href);
        });
    });
}

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
};

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (!isNaN(number)) {
                    statNumber.textContent = '0';
                    animateCounter(statNumber, number);
                    entry.target.classList.add('animated');
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Console message for developers
console.log('%cTotal Tox - Drug Testing Services', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cWebsite developed with modern web technologies', 'color: #64748b; font-size: 12px;');
