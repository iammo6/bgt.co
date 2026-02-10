// Mobile Menu Toggle
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("open");
    
    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
    
    // Prevent body scrolling when menu is open
    document.body.style.overflow = isOpen ? "hidden" : "auto";
});

// Close menu when clicking on a link
navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
        menuBtnIcon.setAttribute("class", "ri-menu-line");
        document.body.style.overflow = "auto";
    }
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        navLinks.classList.remove("open");
        menuBtnIcon.setAttribute("class", "ri-menu-line");
        document.body.style.overflow = "auto";
    }
});

// ScrollReveal Animations
const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
    easing: "cubic-bezier(0.5, 0, 0, 1)",
    reset: false
};

// Initialize ScrollReveal
if (typeof ScrollReveal !== 'undefined') {
    // Header animations
    ScrollReveal().reveal(".header__content h1", {
        ...scrollRevealOption,
        delay: 200
    });
    
    ScrollReveal().reveal(".header__subtitle", {
        ...scrollRevealOption,
        delay: 400
    });
    
    ScrollReveal().reveal(".header__content .btn", {
        ...scrollRevealOption,
        delay: 600
    });
    
    ScrollReveal().reveal(".header__image", {
        ...scrollRevealOption,
        origin: "right",
        delay: 800
    });
    
    // About section animations
    ScrollReveal().reveal(".about__content", {
        ...scrollRevealOption,
        delay: 300
    });
    
    ScrollReveal().reveal(".service__item", {
        ...scrollRevealOption,
        interval: 200,
        delay: 500
    });
    
    // Packages section animations
    ScrollReveal().reveal(".package__card", {
        ...scrollRevealOption,
        interval: 300,
        delay: 200
    });
    
    // Stats section animations
    ScrollReveal().reveal(".stats__content", {
        ...scrollRevealOption,
        delay: 300
    });
    
    ScrollReveal().reveal(".stats__card", {
        ...scrollRevealOption,
        interval: 200,
        delay: 500
    });
    
    ScrollReveal().reveal(".stats__image", {
        ...scrollRevealOption,
        origin: "right",
        delay: 700
    });
    
    // Blog section animations
    ScrollReveal().reveal(".blog__card", {
        ...scrollRevealOption,
        interval: 300,
        delay: 200
    });
    
    // Testimonials slider
    ScrollReveal().reveal(".testimonials__slider", {
        ...scrollRevealOption,
        delay: 300
    });
}

// Initialize Swiper for testimonials
let swiper;

function initSwiper() {
    swiper = new Swiper(".swiper", {
        loop: true,
        grabCursor: true,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 2,
            },
        },
    });
}

// Initialize Swiper when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwiper);
} else {
    initSwiper();
}

// Package selection functionality
const packageButtons = document.querySelectorAll('.package__card .btn');
packageButtons.forEach(button => {
    button.addEventListener('click', function() {
        const packageName = this.closest('.package__card').querySelector('h3').textContent;
        
        // Show a confirmation message (you can replace this with actual form submission)
        alert(`Thank you for selecting the ${packageName} package! We'll contact you shortly to discuss your requirements.`);
        
        // In a real implementation, you would:
        // 1. Open a contact form
        // 2. Pre-fill the package selection
        // 3. Submit to a backend
    });
});

// Form submission handling
const subscribeForm = document.querySelector('.subscribe__container form');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        
        // Show success message
        alert(`Thank you ${name}! You have successfully subscribed to our newsletter.`);
        
        // In a real implementation, you would submit to Web3Forms
        // For now, we'll reset the form
        this.reset();
    });
}

// Sticky header on scroll
let lastScrollTop = 0;
const nav = document.querySelector('nav');
const headerHeight = document.querySelector('header').offsetHeight;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Make header sticky when scrolled past header
    if (scrollTop > headerHeight) {
        nav.style.position = 'fixed';
        nav.style.top = '0';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = 'rgba(17, 24, 39, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
        nav.style.zIndex = '1000';
        nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.position = 'relative';
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.boxShadow = 'none';
    }
    
    // Hide/show navbar on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        nav.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        nav.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', function() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__links a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (navLink) {
                document.querySelectorAll('.nav__links a').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        }
    });
});

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Add loading animation for page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove loading indicator if present
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
});

// Back to top button (optional addition)
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="ri-arrow-up-line"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.setAttribute('aria-label', 'Back to top');

document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

// Add CSS for back to top button
const backToTopCSS = `
.back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-lg);
}

.back-to-top:hover {
    background: var(--primary-dark);
    transform: translateY(-3px);
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = backToTopCSS;
document.head.appendChild(styleSheet);