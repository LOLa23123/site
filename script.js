document.addEventListener('DOMContentLoaded', () => {
    // Create SVG paths for statistics
    const statistics = document.querySelector('.statistics');
    const statsContainer = document.querySelector('.stats-container');
    
    // Create SVG element for curved lines
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('stat-line');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    
    // Create paths between stat cards
    const statCards = document.querySelectorAll('.stat-card');
    const paths = [];
    
    for (let i = 0; i < statCards.length - 1; i++) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        paths.push(path);
        svg.appendChild(path);
    }
    
    // Create glow effect element
    const glowElement = document.createElement('div');
    glowElement.classList.add('stat-glow');
    statistics.appendChild(glowElement);
    
    // Add SVG to statistics section
    statistics.insertBefore(svg, statsContainer);
    
    // Update paths on window resize
    function updatePaths() {
        paths.forEach((path, i) => {
            const start = statCards[i].getBoundingClientRect();
            const end = statCards[i + 1].getBoundingClientRect();
            const statisticsRect = statistics.getBoundingClientRect();
            
            const startX = start.left + start.width - statisticsRect.left;
            const startY = start.top + start.height / 2 - statisticsRect.top;
            const endX = end.left - statisticsRect.left;
            const endY = end.top + end.height / 2 - statisticsRect.top;
            
            // Create curved path
            const controlPoint1X = startX + (endX - startX) * 0.2;
            const controlPoint1Y = startY;
            const controlPoint2X = endX - (endX - startX) * 0.2;
            const controlPoint2Y = endY;
            
            const d = `M ${startX} ${startY} 
                       C ${controlPoint1X} ${controlPoint1Y},
                         ${controlPoint2X} ${controlPoint2Y},
                         ${endX} ${endY}`;
            path.setAttribute('d', d);
        });
    }
    
    // Handle scroll reveal animations
    const observerOptions = {
        root: null, // use viewport as root
        threshold: 0.1, // trigger when 10% of element is visible
        rootMargin: '0px' // no margin
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add 'active' class when element enters viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Remove 'active' class when element leaves viewport
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    // Observe all sections and elements that should animate
    const sections = document.querySelectorAll('section');
    const featureCards = document.querySelectorAll('.feature-card');
    const trustItems = document.querySelectorAll('.trust-item');
    const faqItems = document.querySelectorAll('.faq-item');

    // Add reveal class to all elements we want to animate
    [...sections, ...statCards, ...featureCards, ...trustItems, ...faqItems].forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });

    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // If the clicked item wasn't active, open it
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Update paths on load and resize
    window.addEventListener('resize', updatePaths);
    window.addEventListener('load', updatePaths);
});

// Add smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 