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
            // Prevent the default form submission
            e.preventDefault();
            
            // Form validation is handled by HTML5 required attribute
            
            // Store form data in localStorage for thank you page
            const name = document.getElementById('name').value;
            localStorage.setItem('submitterName', name);
            
            // Get the form data
            const formData = new FormData(contactForm);
            
            // Submit the form data using fetch
            fetch('https://getform.io/f/bolmoqya', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // If the submission was successful, redirect to the thank you page
                    window.location.href = 'thank-you.html';
                } else {
                    // If there was an error, show an alert
                    alert('There was an error submitting the form. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting the form. Please try again.');
            });
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
