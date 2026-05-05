// ===== DOM ELEMENTS =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const typewriterElement = document.querySelector('.typewriter-text');
const scrollAnimateElements = document.querySelectorAll('.scroll-animate');

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') root.setAttribute('data-theme', 'light');

themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// ===== TYPEWRITER EFFECT =====
const typewriterTexts = [
    'Cloud & DevOps Engineer',
    'AWS Infrastructure Specialist',
    'CI/CD Automation Expert',
    'Docker & Containerization',
    'Terraform Infrastructure as Code'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterSpeed = 100;

function typeWriter() {
    const currentText = typewriterTexts[textIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typewriterSpeed = 50;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typewriterSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        // Finished typing current text, pause before deleting
        isDeleting = true;
        typewriterSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next text
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        typewriterSpeed = 500; // Pause before typing next
    }
    
    setTimeout(typeWriter, typewriterSpeed);
}

// Start typewriter effect after a short delay
setTimeout(typeWriter, 1000);

// ===== MOBILE NAVIGATION =====
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class for navbar styling
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== SMOOTH SCROLLING FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});


// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered animation for children
            if (entry.target.classList.contains('skills-grid') || 
                entry.target.classList.contains('projects-grid') ||
                entry.target.classList.contains('achievements-grid')) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('visible');
                });
            }
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    section.classList.add('scroll-animate');
    observer.observe(section);
});

// Observe individual cards
document.querySelectorAll('.skill-card, .project-card, .deployment-card, .achievement-card, .goal-item').forEach(card => {
    card.classList.add('scroll-animate');
    observer.observe(card);
});

// ===== SKILL BARS ANIMATION =====
const skillBarsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBar = entry.target.querySelector('.skill-progress');
            if (skillBar) {
                const width = skillBar.style.width;
                skillBar.style.width = '0';
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 100);
            }
            skillBarsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-card').forEach(card => {
    skillBarsObserver.observe(card);
});

// ===== ACTIVE NAVIGATION LINK =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksItems.forEach(link => link.style.color = '');
            if (navLink) {
                navLink.style.color = 'var(--accent-primary)';
            }
        }
    });
});

// ===== PARTICLE MOUSE INTERACTION =====
const heroSection = document.querySelector('.hero');
const particles = document.querySelectorAll('.particle');

heroSection.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 10;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

heroSection.addEventListener('mouseleave', () => {
    particles.forEach(particle => {
        particle.style.transform = 'translate(0, 0)';
    });
});

// ===== TILT EFFECT FOR CARDS (Disabled - user preference) =====
// Tilt effect removed as per user feedback


// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero content on load
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'all 0.8s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 200);
});

// ===== CONTACT LINK ANIMATIONS =====
document.querySelectorAll('.contact-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// ===== ACHIEVEMENT COUNTER ANIMATION =====
const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.achievement-number');
            if (number) {
                animateNumber(number);
            }
            achievementObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

function animateNumber(element) {
    const text = element.textContent;
    const match = text.match(/^(\d+)/);
    if (match) {
        const target = parseInt(match[1]);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = text;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + text.substring(match[1].length);
            }
        }, 30);
    }
}

document.querySelectorAll('.achievement-card').forEach(card => {
    achievementObserver.observe(card);
});

// ===== GOALS TIMELINE ANIMATION ON SCROLL =====
const goalsSection = document.querySelector('.goals-section');
const goalItems = document.querySelectorAll('.goal-item');

const goalsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            goalItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.15}s`;
            });
        }
    });
}, { threshold: 0.2 });

if (goalsSection) {
    goalsObserver.observe(goalsSection);
}

// ===== CONSOLE EASTER EGG =====
console.log('%c👋 Hello, Developer!', 'font-size: 24px; font-weight: bold; color: #38bdf8;');
console.log('%cWelcome to Sanjay Krishna\'s Portfolio', 'font-size: 14px; color: #94a3b8;');
console.log('%cBuilt with HTML, CSS, and vanilla JavaScript', 'font-size: 12px; color: #64748b;');
console.log('%cFeel free to reach out: tnsk1908@gmail.com', 'font-size: 12px; color: #38bdf8;');

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for mouse events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll-based animations
window.addEventListener('scroll', throttle(() => {
    // Any heavy scroll operations can go here
}, 100));

// ===== CONTACT FORM (EMAILJS) =====
emailjs.init('F2C8G6XHddb45MXDM');

const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formStatus  = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation
        const name    = document.getElementById('from_name').value.trim();
        const email   = document.getElementById('from_email').value.trim();
        const mobile  = document.getElementById('mobile').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !subject || !message) {
            formStatus.className = 'form-status error';
            formStatus.textContent = '✗ Please fill in all fields.';
            return;
        }

        // Loading state
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        formStatus.className = 'form-status';
        formStatus.textContent = '';

        const templateParams = {
            name:    name,
            email:   email,
            mobile:  mobile || 'Not provided',
            subject: subject,
            message: message,
        };

        emailjs.send('service_yvez5q6', 'template_auaz8v8', templateParams)
            .then(() => {
                formStatus.className = 'form-status success';
                formStatus.textContent = "✓ Message sent! I'll get back to you soon.";
                contactForm.reset();
            })
            .catch((err) => {
                formStatus.className = 'form-status error';
                formStatus.textContent = `✗ Failed to send: ${err.text || 'Please try again.'}`;
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').textContent = 'Send Message';
            });
    });
}
