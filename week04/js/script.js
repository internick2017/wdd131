// Display last modified date in the footer
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Set up Intersection Observer to handle fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('.lazy-image');

    // Create observer configuration
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Create the observer instance
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // Add the class that triggers the animation
                img.classList.add('loaded');

                // Once the animation has been triggered, unobserve the element
                observer.unobserve(img);
            }
        });
    }, observerOptions);

    // Begin observing each image
    lazyImages.forEach(image => {
        observer.observe(image);
    });
});