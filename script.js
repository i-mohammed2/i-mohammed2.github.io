// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initParticles();
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initTypingEffect();
    initParallaxEffect();
    initSkillBars();
    initMouseTrail();
    initThemeToggle();
    initHorizontalScroll();
    initFloatingElements();
    updateOrbitDials();
    animateTimelineNodes();
    startCodeRain();
    makeDraggable('.draggable-lab-box');
    const floatingInputs = document.querySelectorAll('.floating-label-group input.floating, .floating-label-group textarea.floating');
    floatingInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.classList.add('has-content');
        });
        input.addEventListener('blur', () => {
            if (!input.value) input.classList.remove('has-content');
        });
    });
    const footerEgg = document.getElementById('footer-easter-egg');
    const eggModal = document.getElementById('easter-egg-modal');
    const closeEgg = document.getElementById('close-easter-egg');
    if (footerEgg && eggModal && closeEgg) {
        footerEgg.addEventListener('click', () => {
            eggModal.classList.add('active');
            eggModal.style.display = 'flex';
        });
        closeEgg.addEventListener('click', () => {
            eggModal.classList.remove('active');
            eggModal.style.display = 'none';
        });
        eggModal.addEventListener('click', (e) => {
            if (e.target === eggModal) {
                eggModal.classList.remove('active');
                eggModal.style.display = 'none';
            }
        });
    }
});

// Particles.js Configuration
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#00FFF7'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.3,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00FFF7',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Mouse Trail Effect
function initMouseTrail() {
    const trail = [];
    const trailLength = 20;

    document.addEventListener('mousemove', function(e) {
        const dot = document.createElement('div');
        dot.className = 'mouse-trail';
        dot.style.left = e.pageX + 'px';
        dot.style.top = e.pageY + 'px';
        document.body.appendChild(dot);

        trail.push(dot);

        if (trail.length > trailLength) {
            const oldDot = trail.shift();
            oldDot.remove();
        }

        // Animate trail
        trail.forEach((dot, index) => {
            const opacity = (index / trailLength) * 0.5;
            const scale = (index / trailLength) * 0.5 + 0.5;
            dot.style.opacity = opacity;
            dot.style.transform = `scale(${scale})`;
        });
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        icon.className = 'fas fa-sun';
    }

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-theme');
        
        if (body.classList.contains('light-theme')) {
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
        } else {
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Horizontal Scroll for Projects
function initHorizontalScroll() {
    const container = document.querySelector('.horizontal-scroll-container');
    if (!container) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });

    // Mouse wheel horizontal scroll
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
    });
}

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            // Add glassmorphism effect
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.style.animation = 'slideDown 0.3s ease-out';
            }
        });

        // Close mobile menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add glow effect on scroll
                if (entry.target.classList.contains('glass-card')) {
                    entry.target.classList.add('glow');
                    setTimeout(() => {
                        entry.target.classList.remove('glow');
                    }, 2000);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.scroll-animate, .timeline-item, .project-card, .skill-category, .glass-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Enhanced navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('nav');
        const scrolled = window.scrollY;
        
        if (scrolled > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.backdropFilter = 'blur(16px)';
        }
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission with loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-3"></i>Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 z-50 p-6 rounded-2xl shadow-2xl transform translate-x-full transition-all duration-500 backdrop-blur-xl ${
        type === 'success' ? 'bg-emerald-500/90 text-white border border-emerald-400/50' :
        type === 'error' ? 'bg-red-500/90 text-white border border-red-400/50' :
        'bg-cyan-500/90 text-white border border-cyan-400/50'
    }`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-3"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// Enhanced Typing Effect for Hero Section
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Enhanced Parallax Effect
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('#home');
        const blobs = document.querySelectorAll('.blob');
        
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
        
        // Parallax effect for blobs
        blobs.forEach((blob, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            blob.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Enhanced Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                    progressBar.style.animation = 'skillProgress 1.5s ease-out forwards';
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-cyan-400');
        link.classList.add('text-slate-300');
        
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-slate-300');
            link.classList.add('text-cyan-400');
        }
    });
}

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Enhanced Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification('Copied to clipboard!', 'success');
    }).catch(function() {
        showNotification('Failed to copy to clipboard', 'error');
    });
}

// Add copy functionality to contact info
document.addEventListener('DOMContentLoaded', function() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.textContent.trim();
            copyToClipboard(text);
        });
        
        item.style.cursor = 'pointer';
        item.title = 'Click to copy';
    });
});

// Enhanced Project card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.classList.add('glow');
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.classList.remove('glow');
        });
    });
});

// Enhanced timeline animations
function revealTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for timeline dots
                const dot = entry.target.querySelector('::before');
                if (dot) {
                    dot.style.animation = 'pulse 2s infinite';
                }
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize timeline animations
document.addEventListener('DOMContentLoaded', revealTimelineItems);

// Add scroll to top functionality
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'fixed bottom-8 right-8 bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-900 p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 z-40 opacity-0 pointer-events-none backdrop-blur-sm';
    scrollToTopBtn.id = 'scroll-to-top';
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.pointerEvents = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes skillProgress {
        from {
            transform: scaleX(0);
        }
        to {
            transform: scaleX(1);
        }
    }
    
    .light-theme {
        background: #f8fafc !important;
        color: #1e293b !important;
    }
    
    .light-theme .glass-card {
        background: rgba(255, 255, 255, 0.3) !important;
        border-color: rgba(6, 182, 212, 0.3) !important;
    }
    
    .light-theme .nav-link {
        color: #475569 !important;
    }
    
    .light-theme .nav-link:hover {
        color: #06b6d4 !important;
    }
`;
document.head.appendChild(style);

// Orbiting Stat Dials Animation (ensure orbits stay in sync on resize)
function updateOrbitDials() {
    const center = document.querySelector('.profile-orbit-center');
    if (!center) return;
    const rect = center.getBoundingClientRect();
    const dials = document.querySelectorAll('.orbit-dial');
    dials.forEach((dial, i) => {
        dial.style.top = `${rect.top + rect.height / 2 + window.scrollY}px`;
        dial.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
    });
}
window.addEventListener('resize', updateOrbitDials);
window.addEventListener('scroll', updateOrbitDials);
document.addEventListener('DOMContentLoaded', updateOrbitDials);

// Interactive Profile Image Parallax/Tilt
const profileImg = document.querySelector('.profile-img');
if (profileImg) {
    profileImg.addEventListener('mousemove', (e) => {
        const rect = profileImg.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        profileImg.style.transform = `rotateY(${x / 15}deg) rotateX(${-y / 15}deg) scale(1.05)`;
    });
    profileImg.addEventListener('mouseleave', () => {
        profileImg.style.transform = '';
    });
}

// Zig-Zag Timeline Animation (pulse on scroll)
function animateTimelineNodes() {
    const nodes = document.querySelectorAll('.timeline-node');
    nodes.forEach((node, i) => {
        const rect = node.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            node.classList.add('animate');
        }
    });
}
window.addEventListener('scroll', animateTimelineNodes);
document.addEventListener('DOMContentLoaded', animateTimelineNodes);

// Exploding Project Gallery Interactions
const projectCards = document.querySelectorAll('.project-explode-card');
projectCards.forEach(card => {
  // 3D tilt effect on mouse move
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `rotateY(${x / 18}deg) rotateX(${-y / 18}deg) scale(1.08)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
  // Floating tag cloud animation
  const tags = card.querySelectorAll('.tech-tag');
  tags.forEach((tag, i) => {
    tag.style.animation = `tagFloat 2.2s ${i * 0.2}s infinite alternate cubic-bezier(0.77,0,0.18,1)`;
  });
});

// Tag float animation
const tagFloatKeyframes = `
@keyframes tagFloat {
  0% { transform: translateY(0px) scale(1); }
  100% { transform: translateY(-8px) scale(1.08); }
}
`;
if (!document.getElementById('tag-float-keyframes')) {
  const style = document.createElement('style');
  style.id = 'tag-float-keyframes';
  style.innerHTML = tagFloatKeyframes;
  document.head.appendChild(style);
}

// LAB: Code Rain Animation
function startCodeRain() {
  const canvas = document.getElementById('code-rain-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const cols = Math.floor(w / 18);
  const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const fontSize = 18;
  const drops = Array(cols).fill(1);
  function draw() {
    ctx.fillStyle = 'rgba(15,15,15,0.18)';
    ctx.fillRect(0, 0, w, h);
    ctx.font = fontSize + 'px monospace';
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = '#00FFF7';
      ctx.shadowColor = '#00FFF7';
      ctx.shadowBlur = 8;
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      ctx.shadowBlur = 0;
      if (drops[i] * fontSize > h && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(draw, 50);
}
startCodeRain();

// LAB: Draggable Lab Boxes
function makeDraggable(selector) {
  const boxes = document.querySelectorAll(selector);
  boxes.forEach(box => {
    let isDragging = false, offsetX = 0, offsetY = 0;
    box.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - box.offsetLeft;
      offsetY = e.clientY - box.offsetTop;
      box.style.zIndex = 1000;
      box.style.cursor = 'grabbing';
    });
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      box.style.left = (e.clientX - offsetX) + 'px';
      box.style.top = (e.clientY - offsetY) + 'px';
    });
    document.addEventListener('mouseup', () => {
      isDragging = false;
      box.style.zIndex = 10;
      box.style.cursor = 'grab';
    });
  });
}
makeDraggable('.draggable-lab-box');

// Animated Contact: Floating Labels
const floatingInputs = document.querySelectorAll('.floating-label-group input.floating, .floating-label-group textarea.floating');
floatingInputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.classList.add('has-content');
  });
  input.addEventListener('blur', () => {
    if (!input.value) input.classList.remove('has-content');
  });
});

// Footer Easter Egg Modal
const footerEgg = document.getElementById('footer-easter-egg');
const eggModal = document.getElementById('easter-egg-modal');
const closeEgg = document.getElementById('close-easter-egg');
if (footerEgg && eggModal && closeEgg) {
  footerEgg.addEventListener('click', () => {
    eggModal.classList.add('active');
    eggModal.style.display = 'flex';
  });
  closeEgg.addEventListener('click', () => {
    eggModal.classList.remove('active');
    eggModal.style.display = 'none';
  });
  eggModal.addEventListener('click', (e) => {
    if (e.target === eggModal) {
      eggModal.classList.remove('active');
      eggModal.style.display = 'none';
    }
  });
}

// Now/Spotlight Area Cycling
const nowSpotlightData = [
  {
    type: 'listening',
    title: "What I'm Listening To",
    media: `<img src='https://i.scdn.co/image/ab67616d0000b273e0e0e0e0e0e0e0e0e0e0e0e0' alt='Album Cover' />`,
    text: `"Malibu Nights" by LANY`,
    embed: `<iframe style='border-radius:12px' src='https://open.spotify.com/embed/track/2dLLR6qlu5UJ5gk0dKz0h3?utm_source=generator' width='100%' height='80' frameBorder='0' allowfullscreen='' allow='autoplay; clipboard-write; encrypted-media; picture-in-picture'></iframe>`
  },
  {
    type: 'photos',
    title: 'Life Lately',
    media: `<div style='display:flex;gap:0.5em;'>
      <img src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=80&h=80' alt='Beach' style='width:60px;height:60px;border-radius:0.7em;object-fit:cover;'>
      <img src='https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=80&h=80' alt='Carnival' style='width:60px;height:60px;border-radius:0.7em;object-fit:cover;'>
      <img src='https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=80&h=80' alt='Sunset' style='width:60px;height:60px;border-radius:0.7em;object-fit:cover;'>
    </div>`,
    text: 'Beach walks, carnival lights, and pastel sunsets.'
  },
  {
    type: 'thought',
    title: 'Recent Thought',
    media: `<span style='font-size:2.5em;'>💭</span>`,
    text: '“Simplicity is the ultimate sophistication.”'
  }
];

let nowSpotlightIndex = 0;
const nowSpotlight = document.getElementById('now-spotlight');

function renderNowSpotlight(idx) {
  if (!nowSpotlight) return;
  const data = nowSpotlightData[idx];
  nowSpotlight.innerHTML = `
    <div class="now-spotlight-title">${data.title}</div>
    <div class="now-spotlight-media">${data.media}${data.embed ? data.embed : ''}</div>
    <div class="now-spotlight-text">${data.text}</div>
  `;
}

function cycleNowSpotlight() {
  nowSpotlightIndex = (nowSpotlightIndex + 1) % nowSpotlightData.length;
  nowSpotlight.classList.add('fade-out');
  setTimeout(() => {
    renderNowSpotlight(nowSpotlightIndex);
    nowSpotlight.classList.remove('fade-out');
    nowSpotlight.classList.add('fade-in');
    setTimeout(() => nowSpotlight.classList.remove('fade-in'), 400);
  }, 400);
}

// Add fade-in/fade-out transitions
const style = document.createElement('style');
style.innerHTML = `
  .fade-in { animation: fadeInNow 0.4s; }
  .fade-out { animation: fadeOutNow 0.4s; }
  @keyframes fadeInNow { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }
  @keyframes fadeOutNow { from { opacity: 1; } to { opacity: 0; } }
`;
document.head.appendChild(style);

// Initial render and start cycling
renderNowSpotlight(nowSpotlightIndex);
setInterval(cycleNowSpotlight, 8000); 