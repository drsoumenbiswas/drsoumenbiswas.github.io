// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with .fade-in class
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
    
    // Add dynamic hover effects for metric cards
    const metrics = document.querySelectorAll('.metric');
    metrics.forEach(metric => {
        metric.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        metric.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Tab Navigation Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => {
                c.style.display = 'none';
                c.classList.remove('active');
            });

            // Set active class perfectly
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            targetContent.style.display = 'block';
            
            // Allow css display update before triggering animation
            setTimeout(() => {
                targetContent.classList.add('active');
            }, 10);
        });
    });

    // Theme Switch Logic
    const themeBtn = document.getElementById('theme-btn');
    themeBtn.addEventListener('click', () => {
        const root = document.documentElement;
        if (root.getAttribute('data-theme') === 'light') {
            root.removeAttribute('data-theme');
            themeBtn.textContent = '🌓';
        } else {
            root.setAttribute('data-theme', 'light');
            themeBtn.textContent = '🌘';
        }
    });

});

// Global Carousel Logic
window.prevSlide = function(id) {
    const carousel = document.getElementById(id);
    const inner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    let currentIndex = parseInt(carousel.getAttribute('data-index') || '0');
    
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
    inner.style.transform = `translateX(-${currentIndex * 100}%)`;
    carousel.setAttribute('data-index', currentIndex);
}

window.nextSlide = function(id) {
    const carousel = document.getElementById(id);
    const inner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    let currentIndex = parseInt(carousel.getAttribute('data-index') || '0');
    
    currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
    inner.style.transform = `translateX(-${currentIndex * 100}%)`;
    carousel.setAttribute('data-index', currentIndex);
}
