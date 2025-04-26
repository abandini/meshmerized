/**
 * MESHMERIZED.COM - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Form submission handling for contact form
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Form validation is handled by HTML5 required attribute
            // This handles the redirect after form submission
            
            // Store form data in localStorage for thank you page
            const name = document.getElementById('name').value;
            localStorage.setItem('submitterName', name);
            
            // The form will submit to Getform.io as specified in the action attribute
            // After submission, we'll redirect to the thank you page
            // This is handled by the form's action attribute and the redirect setup in Getform.io
        });
    }

    // Thank you page personalization
    const thankYouMessage = document.getElementById('thankYouMessage');
    
    if (thankYouMessage) {
        const name = localStorage.getItem('submitterName');
        if (name) {
            thankYouMessage.textContent = `Thank you, ${name}!`;
            // Clear the storage after use
            localStorage.removeItem('submitterName');
        }
    }

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.value-item, .app-item, .insight-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
});
