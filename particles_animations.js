// JavaScript
        // Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const numberOfParticles = 15;
            
            for (let i = 0; i < numberOfParticles; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random size between 3px and 8px
                const size = Math.random() * 5 + 3;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                // Random position
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                
                // Random animation delay
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
                
                // Random opacity
                particle.style.opacity = Math.random() * 0.5 + 0.3;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Scroll animations
        function handleScrollAnimations() {
            const elements = document.querySelectorAll('.scroll-animate');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            elements.forEach(element => {
                observer.observe(element);
            });
        }
        
        // Smooth scrolling for anchor links
        function handleSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
        
        // Mouse move effect for cards
        function handleMouseEffects() {
            const cards = document.querySelectorAll('.glass-card, .project-card');
            
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                });
            });
        }
        
        // Typing effect for tagline
        function typeWriter() {
            const text = "No espero a que las oportunidades lleguen: las creo";
            const tagline = document.querySelector('.tagline');
            let i = 0;
            
            tagline.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    tagline.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, 50);
                } else {
                    // Add blinking cursor
                    tagline.innerHTML += '<span class="cursor">|</span>';
                    
                    // Add cursor animation
                    const cursor = tagline.querySelector('.cursor');
                    if (cursor) {
                        cursor.style.animation = 'blink 1s infinite';
                    }
                }
            }
            
            // Start typing after a delay
            setTimeout(type, 2000);
        }
        
        // Add cursor blink animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Counter animation for stats
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const counter = entry.target;
                        const target = counter.textContent;
                        const isK = target.includes('K');
                        const isM = target.includes('M');
                        const isPlus = target.includes('+');
                        
                        let numericTarget = parseInt(target.replace(/[KM+]/g, ''));
                        if (isK) numericTarget *= 1000;
                        if (isM) numericTarget *= 1000000;
                        
                        let current = 0;
                        const increment = numericTarget / 100;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= numericTarget) {
                                current = numericTarget;
                                clearInterval(timer);
                            }
                            
                            let displayValue = Math.floor(current);
                            if (isM) {
                                displayValue = (displayValue / 1000000).toFixed(1) + 'M';
                            } else if (isK) {
                                displayValue = (displayValue / 1000).toFixed(0) + 'K';
                            }
                            
                            counter.textContent = displayValue + (isPlus ? '+' : '');
                        }, 20);
                        
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });
            
            counters.forEach(counter => observer.observe(counter));
        }
        
        // Initialize parallax effect
        function handleParallax() {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const particles = document.querySelectorAll('.particle');
                
                particles.forEach((particle, index) => {
                    const speed = 0.5 + (index % 3) * 0.2;
                    particle.style.transform = `translateY(${scrolled * speed}px)`;
                });
            });
        }
        
        // Add loading animation
        function showLoadingAnimation() {
            document.body.style.opacity = '0';
            
            window.addEventListener('load', () => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            });
        }
        
        // Initialize all functions
        function init() {
            showLoadingAnimation();
            createParticles();
            handleScrollAnimations();
            handleSmoothScrolling();
            handleMouseEffects();
            typeWriter();
            animateCounters();
            handleParallax();
        }
        
        // Start everything when DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
        
        // Performance optimization
        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        }
        
        function updateAnimations() {
            // Update any continuous animations here
            ticking = false;
        }
        
        // Intersection Observer for performance
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        // Add resize handler for responsive adjustments
        window.addEventListener('resize', () => {
            // Recalculate particle positions if needed
            if (window.innerWidth < 768) {
                document.querySelectorAll('.particle').forEach(particle => {
                    particle.style.display = 'none';
                });
            } else {
                document.querySelectorAll('.particle').forEach(particle => {
                    particle.style.display = 'block';
                });
            }
        });
        
        // Add error handling
        window.addEventListener('error', (e) => {
            console.log('Error handled gracefully:', e.message);
        });
        
        // Service Worker registration (for future PWA features)
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                // Future service worker registration
            });
        }
