document.addEventListener('DOMContentLoaded', () => {
    // Existing DOMContentLoaded code here...

    // Page transition logic
    const links = document.querySelectorAll('a:not([target="_blank"])');
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const destination = link.href;

            document.body.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = destination;
            }, 500); // This should match the transition duration in CSS
        });
    });
});


// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Apply animations to elements
document.addEventListener('DOMContentLoaded', () => {
    // Animate header elements
    const logo = document.querySelector('.logo');
    const titleContainer = document.querySelector('.title-container');
    
    logo.classList.add('slide-in');
    titleContainer.classList.add('slide-in');
    
    observer.observe(logo);
    observer.observe(titleContainer);

    // Animate navigation buttons
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach((button, index) => {
        button.classList.add('fade-in');
        button.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(button);
    });

    // Smooth scroll handling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Parallax effect for cards
document.querySelectorAll('.nav-button').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function handleReducedMotion() {
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition', 'none');
        // Remove parallax effects
        document.querySelectorAll('.nav-button').forEach(card => {
            card.removeEventListener('mousemove');
            card.removeEventListener('mouseleave');
        });
    }
}

handleReducedMotion();
prefersReducedMotion.addListener(handleReducedMotion);


window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // Page was loaded from cache (user clicked back button)
        document.body.classList.remove('fade-out');
    }
});