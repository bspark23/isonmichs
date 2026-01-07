// Solar Company Enhancements JavaScript
// Version: 2.0 - Updated Contact Bubbles with Box Style
// Last Updated: 2024

// Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after page loads
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hide');
        }
    }, 1000); // Reduced from 2000ms to 1000ms for faster loading

    // Initialize all components
    initHeroCarousel();
    initStickyNavbar();
    initStatsCounter();
    initAboutCounters();
    initServiceCounters();
    initBannerSlideshow();
    initCircularProgress();
    initProjectFilters();
    initContactBubbles();
    initBackToTop();
    
    // Initialize mobile menu
    initMobileMenu();
});

// Hero Carousel Functionality
let currentSlideIndex = 0;
const totalSlides = 4;
let slideInterval;

function initHeroCarousel() {
    // Start auto-slide
    startAutoSlide();
    
    // Pause on hover
    const heroContainer = document.querySelector('.hero-carousel-container');
    if (heroContainer) {
        heroContainer.addEventListener('mouseenter', stopAutoSlide);
        heroContainer.addEventListener('mouseleave', startAutoSlide);
    }
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove active class from current slide
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    // Calculate new slide index
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    // Add active class to new slide
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

function currentSlide(slideIndex) {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove active class from current slide
    slides[currentSlideIndex].classList.remove('active');
    indicators[currentSlideIndex].classList.remove('active');
    
    // Set new slide index
    currentSlideIndex = slideIndex - 1;
    
    // Add active class to new slide
    slides[currentSlideIndex].classList.add('active');
    indicators[currentSlideIndex].classList.add('active');
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 6000); // Change slide every 6 seconds
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}



// Sticky Navbar
function initStickyNavbar() {
    const navbar = document.querySelector('.nav-bar');
    const headerTop = document.querySelector('.header-top');
    
    if (navbar && headerTop) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            
            if (scrollPosition > 50) {
                navbar.classList.add('sticky-navbar');
                document.body.style.paddingTop = '80px';
            } else {
                navbar.classList.remove('sticky-navbar');
                document.body.style.paddingTop = '0';
            }
        });
    }
    
    // Initialize mobile menu
    initMobileMenu();
}

// Mobile Menu Functionality
function initMobileMenu() {
    // Create mobile menu overlay if it doesn't exist
    let overlay = document.querySelector('.mobile-menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
    }
    
    // Setup mobile menu
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse) {
        setupMobileMenu(navbarCollapse, overlay);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (window.innerWidth >= 992) {
            if (navbarCollapse && overlay) {
                closeMobileMenu(navbarCollapse, overlay);
            }
        }
    });
}

function setupMobileMenu(navbarCollapse, overlay) {
    // Add mobile menu header if not exists
    if (!navbarCollapse.querySelector('.mobile-menu-header')) {
        const mobileHeader = document.createElement('div');
        mobileHeader.className = 'mobile-menu-header';
        mobileHeader.innerHTML = `
            <div class="mobile-menu-logo">
                <img src="ISON.jpeg" alt="ISONMICHS Solar and Electrical Technologies Limited">
                <span>ISONMICHS Solar and Electrical Technologies Limited</span>
            </div>
            <button class="mobile-menu-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        navbarCollapse.insertBefore(mobileHeader, navbarCollapse.firstChild);
        
        // Handle close button
        mobileHeader.querySelector('.mobile-menu-close').addEventListener('click', () => {
            closeMobileMenu(navbarCollapse, overlay);
        });
    }
    
    // Handle navbar toggler
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.removeEventListener('click', handleTogglerClick);
        navbarToggler.addEventListener('click', handleTogglerClick);
    }
    
    function handleTogglerClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (navbarCollapse.classList.contains('show')) {
            closeMobileMenu(navbarCollapse, overlay);
        } else {
            openMobileMenu(navbarCollapse, overlay);
        }
    }
    
    // Handle overlay click
    overlay.removeEventListener('click', handleOverlayClick);
    overlay.addEventListener('click', handleOverlayClick);
    
    function handleOverlayClick() {
        closeMobileMenu(navbarCollapse, overlay);
    }
    
    // Handle nav links - Direct navigation without cloning
    const navLinks = document.querySelectorAll('.navbar-nav .nav-item .nav-link:not(.dropdown-toggle)');
    navLinks.forEach((link) => {
        // Remove existing listeners
        link.removeEventListener('click', handleNavLinkClick);
        link.addEventListener('click', handleNavLinkClick);
        
        function handleNavLinkClick(e) {
            const href = link.getAttribute('href');
            
            if (href && href !== '#' && href !== '' && !href.startsWith('javascript:')) {
                // Allow default navigation behavior
                closeMobileMenu(navbarCollapse, overlay);
                // Don't prevent default - let the browser handle navigation
            } else {
                e.preventDefault();
            }
        }
    });
    
    // Handle dropdown items - Direct navigation
    const dropdownItems = document.querySelectorAll('.navbar-nav .dropdown-item');
    dropdownItems.forEach((item) => {
        // Remove existing listeners
        item.removeEventListener('click', handleDropdownItemClick);
        item.addEventListener('click', handleDropdownItemClick);
        
        function handleDropdownItemClick(e) {
            const href = item.getAttribute('href');
            
            if (href && href !== '#' && href !== '' && !href.startsWith('javascript:')) {
                // Allow default navigation behavior
                closeMobileMenu(navbarCollapse, overlay);
                // Don't prevent default - let the browser handle navigation
            } else {
                e.preventDefault();
            }
        }
    });
    
    // Handle dropdown toggles
    const dropdownToggles = document.querySelectorAll('.navbar-nav .dropdown-toggle');
    dropdownToggles.forEach((toggle) => {
        toggle.removeEventListener('click', handleDropdownToggle);
        toggle.addEventListener('click', handleDropdownToggle);
        
        function handleDropdownToggle(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdownMenu = toggle.nextElementSibling;
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            
            // Close all other dropdowns
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.setAttribute('aria-expanded', 'false');
                    const otherMenu = otherToggle.nextElementSibling;
                    if (otherMenu && otherMenu.classList.contains('dropdown-menu')) {
                        otherMenu.classList.remove('show');
                    }
                }
            });
            
            // Toggle current dropdown
            if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                if (isExpanded) {
                    toggle.setAttribute('aria-expanded', 'false');
                    dropdownMenu.classList.remove('show');
                } else {
                    toggle.setAttribute('aria-expanded', 'true');
                    dropdownMenu.classList.add('show');
                }
            }
        }
    });
}

function openMobileMenu(navbarCollapse, overlay) {
    navbarCollapse.classList.add('show');
    overlay.classList.add('show');
    document.body.classList.add('mobile-menu-open');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu(navbarCollapse, overlay) {
    navbarCollapse.classList.remove('show');
    overlay.classList.remove('show');
    document.body.classList.remove('mobile-menu-open');
    document.body.style.overflow = '';
    
    // Close all dropdowns
    const dropdownToggles = document.querySelectorAll('.navbar-nav .dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.setAttribute('aria-expanded', 'false');
        const dropdownMenu = toggle.nextElementSibling;
        if (dropdownMenu) {
            dropdownMenu.classList.remove('show');
        }
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const statsNumbers = document.querySelectorAll('.stats-number');
    let animated = false;

    function animateStats() {
        if (animated) return;
        
        statsNumbers.forEach(stat => {
            const targetText = stat.getAttribute('data-target');
            const hasPlus = targetText.includes('+');
            const target = parseInt(targetText);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + (hasPlus ? '+' : '');
            }, 16);
        });
        
        animated = true;
    }

    // Trigger animation when stats section is visible
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
}

// Contact Bubbles
function initContactBubbles() {
    // Remove any existing bubbles first to prevent duplicates
    const existingBubbles = document.querySelector('.floating-contacts');
    if (existingBubbles) {
        existingBubbles.remove();
    }
    
    // Create floating contact bubbles with hover-expandable box
    const floatingContacts = document.createElement('div');
    floatingContacts.className = 'floating-contacts';
    floatingContacts.innerHTML = `
        <div class="contact-bubble-group whatsapp-group">
            <div class="contact-bubble main-bubble whatsapp-main">
                <i class="fab fa-whatsapp"></i>
            </div>
            <div class="sub-bubbles">
                <a href="https://wa.me/2348163870873" target="_blank" class="sub-bubble whatsapp-bubble-1">
                    <i class="fab fa-whatsapp"></i>
                    <span>Manager<br><small>08163870873</small></span>
                </a>
                <a href="https://wa.me/2348035981539" target="_blank" class="sub-bubble whatsapp-bubble-2">
                    <i class="fab fa-whatsapp"></i>
                    <span>Finance Director<br><small>08035981539</small></span>
                </a>
            </div>
        </div>
        <div class="contact-bubble-group email-group">
            <div class="contact-bubble main-bubble email-main">
                <i class="fas fa-envelope"></i>
            </div>
            <div class="sub-bubbles">
                <a href="mailto:isonmichssolar@gmail.com" class="sub-bubble email-bubble-1">
                    <i class="fas fa-envelope"></i>
                    <span>Sales<br><small>isonmichssolar@gmail.com</small></span>
                </a>
                <a href="mailto:isonmichssolar@gmail.com" class="sub-bubble email-bubble-2">
                    <i class="fas fa-envelope"></i>
                    <span>Support<br><small>isonmichssolar@gmail.com</small></span>
                </a>
            </div>
        </div>
    `;
    
    document.body.appendChild(floatingContacts);
    
    // Prevent main bubbles from navigating
    setTimeout(() => {
        const mainBubbles = document.querySelectorAll('.main-bubble');
        mainBubbles.forEach(bubble => {
            bubble.style.cursor = 'pointer';
            bubble.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });
    }, 100);
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const previewSection = document.getElementById('previewSection');
    const previewContent = document.getElementById('previewContent');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const inquiry = formData.get('inquiry');
            const whatsappNumber = formData.get('whatsappNumber');
            
            // Validate form
            if (!name || !email || !inquiry || !whatsappNumber) {
                alert('Please fill in all fields');
                return;
            }
            
            // Show preview
            const numberLabel = whatsappNumber === '08036630578' ? 'Sales Team' : 'Support Team';
            previewContent.innerHTML = `
                <div class="preview-item">
                    <strong>Name:</strong> ${name}
                </div>
                <div class="preview-item">
                    <strong>Email:</strong> ${email}
                </div>
                <div class="preview-item">
                    <strong>Inquiry Type:</strong> ${inquiry}
                </div>
                <div class="preview-item">
                    <strong>WhatsApp Contact:</strong> ${numberLabel} (${whatsappNumber})
                </div>
            `;
            
            previewSection.style.display = 'block';
            previewSection.scrollIntoView({ behavior: 'smooth' });
            
            // Store data for WhatsApp message
            window.contactData = { name, email, inquiry, whatsappNumber };
        });
    }
}

function sendWhatsAppMessage() {
    const { name, email, inquiry, whatsappNumber } = window.contactData;
    const message = `Hello, my name is ${name} (${email}). I would like to talk about ${inquiry}.`;
    const whatsappUrl = `https://wa.me/234${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Circular Progress Animation
function initCircularProgress() {
    const progressCircles = document.querySelectorAll('.circular-progress');
    
    if (progressCircles.length === 0) {
        return;
    }
    
    let animated = false;

    function animateProgress() {
        if (animated) return;
        
        progressCircles.forEach(circle => {
            const progress = parseInt(circle.getAttribute('data-progress'));
            const progressRing = circle.querySelector('.progress-ring');
            const progressNumber = circle.querySelector('.progress-number');
            
            // Determine radius based on screen size
            let radius = 65;
            if (window.innerWidth <= 576) {
                radius = 40;
            } else if (window.innerWidth <= 768) {
                radius = 50;
            }
            
            const circumference = 2 * Math.PI * radius;
            
            if (!progressRing || !progressNumber) {
                return;
            }
            
            // Update the circle radius and stroke-dasharray for current screen size
            progressRing.setAttribute('r', radius);
            progressRing.style.strokeDasharray = circumference;
            
            let current = 0;
            const duration = 2000;
            const increment = progress / (duration / 16);
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= progress) {
                    current = progress;
                    clearInterval(timer);
                }
                
                const offset = circumference - (current / 100) * circumference;
                progressRing.style.strokeDashoffset = offset;
                progressNumber.textContent = Math.floor(current) + '%';
            }, 16);
        });
        
        animated = true;
    }

    // Trigger animation when impact section is visible
    const impactSection = document.querySelector('.impact-section');
    if (impactSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgress();
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(impactSection);
    }
    
    // Re-initialize on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (animated) {
                animated = false;
                animateProgress();
            }
        }, 250);
    });
}

// About Section Counters
function initAboutCounters() {
    const aboutCounters = document.querySelectorAll('.about-counter');
    
    if (aboutCounters.length === 0) {
        return;
    }
    
    let animated = false;

    function animateCounters() {
        if (animated) return;
        
        aboutCounters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current) + '+';
            }, 16);
        });
        
        animated = true;
    }

    // Trigger animation when about section is visible
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(aboutSection);
    }
}

// Banner Slideshow
function initBannerSlideshow() {
    const slides = document.querySelectorAll('.banner-slide');
    
    if (slides.length === 0) {
        return;
    }
    
    let currentSlide = 0;
    
    function showNextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 4 seconds
    setInterval(showNextSlide, 4000);
}

// Service Counters Animation
function initServiceCounters() {
    const serviceCounters = document.querySelectorAll('.service-count');
    
    if (serviceCounters.length === 0) {
        return;
    }
    
    let animated = false;

    function animateServiceCounters() {
        if (animated) return;
        
        serviceCounters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });
        
        animated = true;
    }

    // Trigger animation when services section is visible
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateServiceCounters();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(servicesSection);
    }
}

// Project Filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterButtons.length === 0 || projectItems.length === 0) {
        return;
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                const btnFilter = btn.getAttribute('data-filter');
                if (btnFilter === 'commercial' || btnFilter === 'electrical') {
                    btn.style.background = 'white';
                    btn.style.color = '#ff8c00';
                } else {
                    btn.style.background = 'white';
                    btn.style.color = '#28a745';
                }
            });
            
            button.classList.add('active');
            if (filter === 'commercial' || filter === 'electrical') {
                button.style.background = '#ff8c00';
            } else {
                button.style.background = '#28a745';
            }
            button.style.color = 'white';
            
            // Filter projects
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all') {
                    item.classList.remove('hide');
                    item.style.display = 'block';
                } else {
                    if (category.includes(filter)) {
                        item.classList.remove('hide');
                        item.style.display = 'block';
                    } else {
                        item.classList.add('hide');
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-green);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}