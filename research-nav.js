// research-nav.js
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.research-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Update active link based on scroll position
    const updateActiveLink = () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) { // 100px offset for better UX
                currentSectionId = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    // Smooth scroll to section when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateActiveLink);
    });

    // Initial update
    updateActiveLink();
});