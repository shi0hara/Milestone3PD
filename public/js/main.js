console.log('Portfolio loaded');

// ===== LOADING SCREEN ANIMATION =====
const loadingScreen = document.getElementById('loading-screen');
const percentage = document.querySelector('.percentage');

let startTime = null;
const loadingDuration = 3000; // 3 seconds in milliseconds

function updateLoadingProgress(timestamp) {
    if (!startTime) startTime = timestamp;
    
    const elapsed = timestamp - startTime;
    const progress = Math.min((elapsed / loadingDuration) * 100, 100);
    
    // Update percentage display only (no progress bar to update)
    percentage.textContent = Math.floor(progress) + '%';
    
    if (progress < 100) {
        // Continue animation
        requestAnimationFrame(updateLoadingProgress);
    } else {
        // Loading complete
        percentage.textContent = '100%';
        
        // Hide loading screen after a brief delay
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            // Remove from DOM after fade
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 500);
    }
}

// Start loading animation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    setTimeout(() => {
        requestAnimationFrame(updateLoadingProgress);
    }, 100);
});

// ===== 4 OPPOSING BALLS CURSOR EFFECT =====
const canvas = document.getElementById('cursorCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let targetX = mouseX;
let targetY = mouseY;
let isMouseInHero = false;

// 4 balls with different positions and behaviors
const balls = [
    { x: mouseX, y: mouseY, targetX: mouseX, targetY: mouseY, factor: 1, offsetX: 1, offsetY: 1 },    // Normal
    { x: mouseX, y: mouseY, targetX: mouseX, targetY: mouseY, factor: 1, offsetX: -1, offsetY: 1 },   // Horizontal flip
    { x: mouseX, y: mouseY, targetX: mouseX, targetY: mouseY, factor: 1, offsetX: 1, offsetY: -1 },   // Vertical flip
    { x: mouseX, y: mouseY, targetX: mouseX, targetY: mouseY, factor: 1, offsetX: -1, offsetY: -1 }   // Both flipped
];

let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

// Smooth interpolation
const lerp = (start, end, factor) => start + (end - start) * factor;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    
    // Check if mouse is in hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        isMouseInHero = (
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom &&
            e.clientX >= rect.left &&
            e.clientX <= rect.right
        );
    }
});

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerX = window.innerWidth / 2;
    centerY = window.innerHeight / 2;
});

function animateCursor() {
    // Calculate offset from center for mirroring effect
    const offsetX = targetX - centerX;
    const offsetY = targetY - centerY;
    
    // Update each ball's target position based on its offset multipliers
    balls.forEach(ball => {
        ball.targetX = centerX + (offsetX * ball.offsetX);
        ball.targetY = centerY + (offsetY * ball.offsetY);
        
        // Smooth interpolation
        ball.x = lerp(ball.x, ball.targetX, 0.12);
        ball.y = lerp(ball.y, ball.targetY, 0.12);
    });
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (isMouseInHero) {
        // read current theme to adapt colors and blending for visibility
        const themeNow = document.documentElement.getAttribute('data-theme') || 'dark';
        // use additive blending on dark theme, normal/source-over on light
        ctx.globalCompositeOperation = themeNow === 'light' ? 'source-over' : 'lighter';

        // high-contrast color sets for each theme
        const darkColors = [
            { inner: 'rgba(0,255,150,0.8)', middle: 'rgba(0,230,180,0.5)', outer: 'rgba(0,180,200,0.25)' },
            { inner: 'rgba(0,240,200,0.8)', middle: 'rgba(0,200,190,0.5)', outer: 'rgba(0,150,180,0.25)' },
            { inner: 'rgba(50,255,180,0.8)', middle: 'rgba(30,220,170,0.5)', outer: 'rgba(0,180,150,0.25)' },
            { inner: 'rgba(0,200,220,0.8)', middle: 'rgba(0,180,200,0.5)', outer: 'rgba(0,160,180,0.25)' }
        ];

        // darker, saturated tones for light background so they remain visible
        const lightColors = [
            { inner: 'rgba(139,92,246,0.9)', middle: 'rgba(167,139,250,0.6)', outer: 'rgba(196,181,253,0.3)' },
            { inner: 'rgba(124,58,237,0.9)', middle: 'rgba(139,92,246,0.6)', outer: 'rgba(167,139,250,0.3)' },
            { inner: 'rgba(167,139,250,0.9)', middle: 'rgba(196,181,253,0.6)', outer: 'rgba(221,214,254,0.3)' },
            { inner: 'rgba(109,40,217,0.9)', middle: 'rgba(124,58,237,0.6)', outer: 'rgba(139,92,246,0.3)' }
        ];

        const colors = themeNow === 'light' ? lightColors : darkColors;

        balls.forEach((ball, index) => {
            // Extra large outer flare
            const megaGradient = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, 350);
            megaGradient.addColorStop(0, colors[index].outer);
            megaGradient.addColorStop(0.3, colors[index].outer.replace(/0\.35|0\.25/, '0.15'));
            megaGradient.addColorStop(0.7, colors[index].outer.replace(/0\.35|0\.25/, '0.05'));
            megaGradient.addColorStop(1, 'transparent');
            ctx.fillStyle = megaGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Large outer glow
            const outerGradient = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, 200);
            outerGradient.addColorStop(0, colors[index].middle);
            outerGradient.addColorStop(0.4, colors[index].outer);
            outerGradient.addColorStop(1, 'transparent');
            ctx.fillStyle = outerGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Medium glow
            const mediumGradient = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, 100);
            mediumGradient.addColorStop(0, colors[index].inner);
            mediumGradient.addColorStop(0.5, colors[index].middle);
            mediumGradient.addColorStop(1, 'transparent');
            ctx.fillStyle = mediumGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Bright core
            const coreGradient = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, 40);
            coreGradient.addColorStop(0, 'rgba(255,255,255,0.95)');
            coreGradient.addColorStop(0.3, colors[index].inner);
            coreGradient.addColorStop(1, 'transparent');
            ctx.fillStyle = coreGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });

        // Keep only glowing balls (no lines)
        ctx.shadowBlur = 0;
        // reset composite for other drawings
        ctx.globalCompositeOperation = 'source-over';
    }
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add pulse animation
    themeToggle.style.animation = 'pulse 0.3s ease';
    setTimeout(() => {
        themeToggle.style.animation = '';
    }, 300);
});

// Mouse reactivity for theme toggle
themeToggle.addEventListener('mousemove', (e) => {
    const rect = themeToggle.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 5;
    const rotateY = (centerX - x) / 5;
    
    themeToggle.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});

themeToggle.addEventListener('mouseleave', () => {
    themeToggle.style.transform = 'perspective(500px) rotateX(0) rotateY(0) scale(1)';
});

// Add pulse animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);

// Simple smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Trigger Animation
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Observe service cards with stagger effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    setTimeout(() => {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 150); // Stagger animation
                }
            });
        }, observerOptions);
        cardObserver.observe(card);
    }, 0);
});

// Observe project items
document.querySelectorAll('.project-item').forEach(item => {
    observer.observe(item);
});

// Parallax Scrolling Effect
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContent = hero.querySelector('.container');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 600);
        }
    }
    
    // Section parallax for project images
    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach((img, index) => {
        const rect = img.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
        
        if (scrollPercent > 0 && scrollPercent < 1) {
            img.style.transform = `translateY(${scrollPercent * -30}px)`;
        }
    });
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Initial parallax update
updateParallax();

// Stacking Cards Effect - Enhanced
window.addEventListener('scroll', () => {
    const servicesSection = document.querySelector('#leistung');
    if (!servicesSection) return;
    
    const cards = servicesSection.querySelectorAll('.service-card');
    const sectionRect = servicesSection.getBoundingClientRect();
    
    cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - cardRect.top) / window.innerHeight));
        
        // Scale effect as cards stack
        const scale = 0.95 + (scrollProgress * 0.05);
        const brightness = 0.7 + (scrollProgress * 0.3);
        
        if (cardRect.top < window.innerHeight && cardRect.bottom > 0) {
            card.style.transform = `scale(${scale})`;
            card.style.filter = `brightness(${brightness})`;
        }
    });
});

// ===== PROJECT CAROUSEL =====
let currentIndex = 0;
const carouselItems = document.querySelectorAll('.carousel-item');
const totalItems = carouselItems.length;

function updateCarousel() {
    carouselItems.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next', 'hidden');
        
        if (index === currentIndex) {
            item.classList.add('active');
        } else if (index === (currentIndex - 1 + totalItems) % totalItems) {
            item.classList.add('prev');
        } else if (index === (currentIndex + 1) % totalItems) {
            item.classList.add('next');
        } else {
            item.classList.add('hidden');
        }
    });
}

function nextProject() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
}

function prevProject() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
}

// Carousel controls
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevProject);
    nextBtn.addEventListener('click', nextProject);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevProject();
    } else if (e.key === 'ArrowRight') {
        nextProject();
    }
});

// Initialize carousel
if (carouselItems.length > 0) {
    updateCarousel();
}

// Tech Stack Animation on Scroll
const techStackObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Animate progress bars
            animateProgressBars();
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px'
});

const techSection = document.querySelector('.tech-stack-section');
if (techSection) {
    techStackObserver.observe(techSection);
}

function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach((fill, index) => {
        const progress = fill.getAttribute('data-progress');
        setTimeout(() => {
            fill.style.width = progress + '%';
        }, index * 100);
    });
}

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const formMessage = document.getElementById('form-message');
        const originalBtnText = submitBtn.innerHTML;
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... ⏳';
        formMessage.style.display = 'none';
        
        try {
            const formData = new FormData(contactForm);
            
            // Log for debugging
            console.log('Sending form data to Web3Forms...');
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            // Log response for debugging
            console.log('Web3Forms response:', data);
            
            if (response.ok && data.success) {
                // Success message
                formMessage.textContent = '✓ Message sent successfully! Check your spam folder if you don\'t see it.';
                formMessage.style.display = 'block';
                formMessage.style.backgroundColor = 'rgba(13, 255, 171, 0.1)';
                formMessage.style.color = '#0dffab';
                formMessage.style.border = '1px solid rgba(13, 255, 171, 0.3)';
                
                // Reset form
                contactForm.reset();
            } else {
                // Show specific error message from Web3Forms
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (error) {
            // Error message with details
            console.error('Form submission error:', error);
            formMessage.textContent = `✗ Error: ${error.message}. Please check console for details or email me directly at hoyianjerome@email.com`;
            formMessage.style.display = 'block';
            formMessage.style.backgroundColor = 'rgba(255, 82, 82, 0.1)';
            formMessage.style.color = '#ff5252';
            formMessage.style.border = '1px solid rgba(255, 82, 82, 0.3)';
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}
