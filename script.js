/* ============================================
   PREMIUM PORTFOLIO — MANOJ SANKAR K
   Interactive JavaScript
   ============================================ */

(function () {
    'use strict';

    /* ---------- DOM Ready ---------- */
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initCustomCursor();
        initScrollProgress();
        initNavbar();
        initMobileMenu();
        initThemeToggle();
        initScrollReveal();
        initTypingEffect();
        initParticles();
        initProjectFilters();
        initSkillBars();
        initCountUp();
        initRippleEffect();
        initContactForm();
        initActiveNavLink();
    }

    /* ============================================
       CUSTOM CURSOR
       ============================================ */
    function initCustomCursor() {
        const dot = document.getElementById('cursorDot');
        const outline = document.getElementById('cursorOutline');
        if (!dot || !outline) return;

        // Detect touch device — disable custom cursor
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
        });

        // Smooth outline follow
        function animateOutline() {
            outlineX += (mouseX - outlineX) * 0.12;
            outlineY += (mouseY - outlineY) * 0.12;
            outline.style.left = outlineX + 'px';
            outline.style.top = outlineY + 'px';
            requestAnimationFrame(animateOutline);
        }
        animateOutline();

        // Hover effect on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, input, textarea, .project-card, .tech-badge, .filter-btn');
        hoverTargets.forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                dot.classList.add('hover');
                outline.classList.add('hover');
            });
            el.addEventListener('mouseleave', function () {
                dot.classList.remove('hover');
                outline.classList.remove('hover');
            });
        });
    }

    /* ============================================
       SCROLL PROGRESS BAR
       ============================================ */
    function initScrollProgress() {
        const bar = document.getElementById('scrollProgress');
        if (!bar) return;

        function updateProgress() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = progress + '%';
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    /* ============================================
       NAVBAR — Blur on scroll + Active link
       ============================================ */
    function initNavbar() {
        var navbar = document.getElementById('navbar');
        if (!navbar) return;

        function onScroll() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* Active nav link tracking */
    function initActiveNavLink() {
        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('.nav-link');

        function updateActiveLink() {
            var scrollY = window.pageYOffset + 120;

            sections.forEach(function (section) {
                var sectionTop = section.offsetTop;
                var sectionHeight = section.offsetHeight;
                var sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(function (link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', updateActiveLink, { passive: true });
        updateActiveLink();
    }

    /* ============================================
       MOBILE MENU
       ============================================ */
    function initMobileMenu() {
        var hamburger = document.getElementById('hamburger');
        var navLinks = document.getElementById('navLinks');
        if (!hamburger || !navLinks) return;

        // Create overlay
        var overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);

        function toggleMenu() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
            overlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        }

        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Close on nav link click
        navLinks.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                if (navLinks.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });
    }

    /* ============================================
       DARK / LIGHT MODE TOGGLE
       ============================================ */
    function initThemeToggle() {
        var toggle = document.getElementById('themeToggle');
        var html = document.documentElement;
        if (!toggle) return;

        // Load saved theme
        var savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            html.setAttribute('data-theme', savedTheme);
        }

        toggle.addEventListener('click', function () {
            var current = html.getAttribute('data-theme');
            var next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('portfolio-theme', next);
        });
    }

    /* ============================================
       SCROLL REVEAL (IntersectionObserver)
       ============================================ */
    function initScrollReveal() {
        var reveals = document.querySelectorAll('.reveal');

        // Immediately show hero elements (they use CSS animation)
        var heroReveals = document.querySelectorAll('.hero .reveal');
        heroReveals.forEach(function (el) {
            el.classList.add('visible');
        });

        if (!('IntersectionObserver' in window)) {
            // Fallback: show all
            reveals.forEach(function (el) { el.classList.add('visible'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        reveals.forEach(function (el) {
            // Skip hero elements (already visible)
            if (!el.closest('.hero')) {
                observer.observe(el);
            }
        });
    }

    /* ============================================
       TYPING EFFECT
       ============================================ */
    function initTypingEffect() {
        var element = document.getElementById('typedText');
        if (!element) return;

        var phrases = [
            'AI-Powered Apps',
            'Stunning Websites',
            'Intelligent Solutions',
            'Premium Experiences',
            'Smart Tools'
        ];

        var phraseIndex = 0;
        var charIndex = 0;
        var isDeleting = false;
        var typingSpeed = 80;

        function type() {
            var currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                element.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                element.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Pause at end of phrase
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400;
            }

            setTimeout(type, typingSpeed);
        }

        // Start after a delay
        setTimeout(type, 1200);
    }

    /* ============================================
       HERO PARTICLES
       ============================================ */
    function initParticles() {
        var container = document.getElementById('heroParticles');
        if (!container) return;

        var particleCount = 30;

        for (var i = 0; i < particleCount; i++) {
            var particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            particle.style.width = (2 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            particle.style.opacity = (0.2 + Math.random() * 0.4).toString();
            container.appendChild(particle);
        }
    }

    /* ============================================
       PROJECT CATEGORY FILTER
       ============================================ */
    function initProjectFilters() {
        var filterBtns = document.querySelectorAll('.filter-btn');
        var projectCards = document.querySelectorAll('.project-card');
        if (filterBtns.length === 0) return;

        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                // Update active state
                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                var filter = btn.getAttribute('data-filter');

                projectCards.forEach(function (card) {
                    var category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    /* ============================================
       ANIMATED SKILL BARS
       ============================================ */
    function initSkillBars() {
        var skillFills = document.querySelectorAll('.skill-fill');
        if (skillFills.length === 0) return;

        if (!('IntersectionObserver' in window)) {
            skillFills.forEach(function (fill) {
                fill.style.width = fill.getAttribute('data-width') + '%';
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var fills = entry.target.querySelectorAll('.skill-fill');
                    fills.forEach(function (fill, index) {
                        setTimeout(function () {
                            fill.style.width = fill.getAttribute('data-width') + '%';
                            fill.classList.add('animated');
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // Observe each skill category card
        document.querySelectorAll('.skill-category').forEach(function (card) {
            observer.observe(card);
        });
    }

    /* ============================================
       COUNTER ANIMATION (Hero Stats)
       ============================================ */
    function initCountUp() {
        var statNumbers = document.querySelectorAll('.stat-number[data-target]');
        if (statNumbers.length === 0) return;

        if (!('IntersectionObserver' in window)) {
            statNumbers.forEach(function (el) {
                el.textContent = el.getAttribute('data-target');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var target = parseInt(el.getAttribute('data-target'), 10);
                    animateCounter(el, 0, target, 1500);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(function (el) {
            observer.observe(el);
        });
    }

    function animateCounter(element, start, end, duration) {
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * (end - start) + start);
            element.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                element.textContent = end;
            }
        }

        requestAnimationFrame(step);
    }

    /* ============================================
       BUTTON RIPPLE EFFECT
       ============================================ */
    function initRippleEffect() {
        var buttons = document.querySelectorAll('.btn');

        buttons.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                var ripple = document.createElement('span');
                ripple.classList.add('ripple');

                var rect = btn.getBoundingClientRect();
                var size = Math.max(rect.width, rect.height);
                ripple.style.width = size + 'px';
                ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

                btn.appendChild(ripple);

                ripple.addEventListener('animationend', function () {
                    ripple.remove();
                });
            });
        });
    }

    /* ============================================
       CONTACT FORM (Demo Handler)
       ============================================ */
    function initContactForm() {
        var form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var submitBtn = form.querySelector('button[type="submit"]');
            var originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            var formData = new FormData(form);
            var formObject = {};
            formData.forEach(function (value, key) {
                formObject[key] = value;
            });

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(function (response) {
                if (response.ok) {
                    // Show success state
                    form.innerHTML = '<div class="form-success">' +
                        '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                        '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>' +
                        '<polyline points="22 4 12 14.01 9 11.01"/>' +
                        '</svg>' +
                        '<h4>Message Sent!</h4>' +
                        '<p>Thank you for reaching out. Your message has been sent to Manoj Sankar.</p>' +
                        '</div>';
                } else {
                    response.json().then(function (data) {
                        if (Object.hasOwnProperty.call(data, 'errors')) {
                            alert(data["errors"].map(function (error) { return error["message"]; }).join(", "));
                        } else {
                            alert('Oops! There was a problem submitting your form');
                        }
                    });
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                }
            }).catch(function (error) {
                alert('Oops! There was a problem submitting your form');
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            });
        });
    }

    /* ============================================
       SMOOTH SCROLL FOR NAV LINKS
       ============================================ */
    document.addEventListener('click', function (e) {
        var link = e.target.closest('a[href^="#"]');
        if (!link) return;

        var targetId = link.getAttribute('href');
        if (targetId === '#') return;

        var targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
        }
    });

})();
