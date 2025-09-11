// FAQ Toggle Functionality
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {item.classList.remove('active');});
    // Open clicked item if it wasn't active
    if (!isActive) {faqItem.classList.add('active');}
}
// Enhanced Mobile Menu Toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');
const body = document.body;
function toggleMobileMenu() {
    const isOpen = navMenu.classList.contains('nav-open');
    if (isOpen) {
        // Close menu
        navMenu.classList.remove('nav-open');
        hamburgerBtn.classList.remove('hamburger-open');
        body.classList.remove('nav-open');
    } else {
        // Open menu
        navMenu.classList.add('nav-open');
        hamburgerBtn.classList.add('hamburger-open');
        body.classList.add('nav-open');
    }
}
// Event listeners for mobile menu
hamburgerBtn.addEventListener('click', toggleMobileMenu);
navOverlay.addEventListener('click', toggleMobileMenu);
// Close menu when clicking on nav items (mobile)
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
            toggleMobileMenu();
        }
    });
});
// Scroll Animation System
function initScrollAnimations() {
    const observerOptions = {threshold: 0.1,rootMargin: '0px 0px -10% 0px'};
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                // Handle staggered animations for child elements
                const animateItems = entry.target.querySelectorAll('.animate-item');
                animateItems.forEach((item, index) => {
                    setTimeout(() => {item.classList.add('animate-visible');}, index * 100);
                });
            }
        });
    }, observerOptions);
    // Observe all sections with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(section => {observer.observe(section);});
}
// Smooth scrolling for anchor links - Fixed querySelector error
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Check if href is a valid selector 
        if (href && href !== '#' && href.length > 1) {
            try {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } catch (error) {console.warn('Invalid selector for smooth scrolling:', href);}
        }
    });
});
// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {initScrollAnimations();});
// Handle window resize for mobile menu
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        navMenu.classList.remove('nav-open');
        hamburgerBtn.classList.remove('hamburger-open');
        body.classList.remove('nav-open');
    }
});
// Performance optimization: Throttle scroll events
let ticking = false;
function updateOnScroll() {ticking = false;}
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});