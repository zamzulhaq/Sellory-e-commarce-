/* ============================================
   SELLORY - script.js
   Interactions, Animations, Scroll Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ============================================
  // AUTH NAVIGATION
  // ============================================
  const navLogin = document.getElementById('nav-login');
  const navSignup = document.getElementById('nav-signup');

  if (navLogin) {
    navLogin.addEventListener('click', function(e) {
      // Let the href handle it, or you could e.preventDefault() here
    });
  }

  if (navSignup) {
    navSignup.addEventListener('click', function(e) {
      // Let the href handle it, or you could e.preventDefault() here
    });
  }

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  const handleNavbarScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide on scroll down, show on scroll up (for mobile)
    if (window.innerWidth <= 768) {
      if (scrollY > lastScrollY && scrollY > 200) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
    }
    lastScrollY = scrollY;
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ============================================
  // HAMBURGER MENU
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      // Update aria
      hamburger.setAttribute('aria-expanded', isOpen);

      // Animate hamburger lines
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // ============================================
  // SCROLL-TRIGGERED ANIMATIONS
  // ============================================
  const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after first animation
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateOnScrollElements.forEach(el => {
    scrollObserver.observe(el);
  });

  // ============================================
  // HERO PARALLAX EFFECT
  // ============================================
  const heroBatikBg = document.querySelector('.hero-batik-bg');
  const heroGlow1 = document.querySelector('.hero-glow-1');
  const heroGlow2 = document.querySelector('.hero-glow-2');

  const handleMouseMove = (e) => {
    if (window.innerWidth <= 768) return;

    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    const xRatio = (clientX / innerWidth) - 0.5;
    const yRatio = (clientY / innerHeight) - 0.5;

    if (heroBatikBg) {
      heroBatikBg.style.transform = `translate(${xRatio * 20}px, ${yRatio * 15}px)`;
    }
    if (heroGlow1) {
      heroGlow1.style.transform = `translate(${xRatio * -30}px, ${yRatio * -20}px)`;
    }
    if (heroGlow2) {
      heroGlow2.style.transform = `translate(${xRatio * 25}px, ${yRatio * 18}px)`;
    }
  };

  document.addEventListener('mousemove', handleMouseMove, { passive: true });

  // ============================================
  // PRICING TOGGLE
  // ============================================
  const pricingToggle = document.getElementById('pricing-toggle');

  if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
      const isYearly = pricingToggle.checked;
      const priceNums = document.querySelectorAll('[data-monthly]');

      priceNums.forEach(el => {
        const monthly = parseInt(el.getAttribute('data-monthly'));
        const yearly = parseInt(el.getAttribute('data-yearly'));

        const targetVal = isYearly ? yearly : monthly;
        const priceNumEl = el.querySelector('.price-num');

        if (priceNumEl) {
          // Animate count up/down
          animateCounter(priceNumEl, targetVal);
        }
      });
    });
  }

  function animateCounter(el, targetVal) {
    const startVal = parseInt(el.textContent.replace(/\./g, '')) || 0;
    const duration = 400;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);
      const current = Math.round(startVal + (targetVal - startVal) * eased);

      // Format with dots (Indonesian number format)
      el.textContent = current === 0 ? '0' : formatRupiah(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function formatRupiah(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  // ============================================
  // THEME FILTER
  // ============================================
  const themeFilterBtns = document.querySelectorAll('.theme-filter-btn');
  const themeCards = document.querySelectorAll('.theme-card[data-category]');

  themeFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button
      themeFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      themeCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.style.opacity = '1';
          card.style.transform = '';
          card.style.pointerEvents = '';
        } else {
          card.style.opacity = '0.25';
          card.style.transform = 'scale(0.95)';
          card.style.pointerEvents = 'none';
        }
      });
    });
  });

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // FEATURE CARD HOVER EFFECT
  // ============================================
  const featureCards = document.querySelectorAll('.feature-card');

  featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = (x / rect.width - 0.5) * 2;
      const yPercent = (y / rect.height - 0.5) * 2;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ============================================
  // CHART BAR ANIMATION ON SCROLL
  // ============================================
  const chartBars = document.querySelectorAll('.chart-bar');

  const chartObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      chartBars.forEach((bar, i) => {
        setTimeout(() => {
          bar.style.animation = 'bar-grow 0.6s ease-out forwards';
        }, i * 80);
      });
      chartObserver.disconnect();
    }
  }, { threshold: 0.5 });

  const chartEl = document.querySelector('.dash-chart');
  if (chartEl) chartObserver.observe(chartEl);

  // ============================================
  // TESTIMONIALS AUTO-SCROLL INDICATOR
  // ============================================
  // Subtle tilt on hover for testi cards
  const testiCards = document.querySelectorAll('.testi-card:not(.testi-highlight)');

  testiCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  // ============================================
  // STATS COUNTER ANIMATION ON SCROLL
  // ============================================
  const statNums = document.querySelectorAll('.stat-num');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;

      // Just trigger a subtle pulse animation
      statNums.forEach((num, i) => {
        setTimeout(() => {
          num.style.transition = 'transform 0.4s ease, color 0.4s ease';
          num.style.color = '#C9A96E';
          setTimeout(() => {
            num.style.color = '';
          }, 600);
        }, i * 150);
      });
    }
  }, { threshold: 0.8 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  // ============================================
  // FLOATING CARDS PARALLAX
  // ============================================
  const floatCards = document.querySelectorAll('.float-card');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        floatCards.forEach((card, i) => {
          const speed = i === 0 ? 0.05 : -0.03;
          const baseAnim = i === 0 ? 'float' : 'float-slow';
          card.style.transform = `translateY(${scrollY * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ============================================
  // CURSOR GLOW (DESKTOP ONLY)
  // ============================================
  if (window.innerWidth > 1024) {
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease;
      mix-blend-mode: multiply;
    `;
    document.body.appendChild(cursorGlow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateGlow = () => {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
      requestAnimationFrame(animateGlow);
    };

    animateGlow();
  }

  // ============================================
  // ACTIVE NAV LINK ON SCROLL
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-links a[href^="#"]');

  const activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--charcoal)';
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -40% 0px'
  });

  sections.forEach(section => activeSectionObserver.observe(section));

  // ============================================
  // BUTTON RIPPLE EFFECT
  // ============================================
  document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.2);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-anim 0.5s ease-out forwards;
        pointer-events: none;
        z-index: 2;
      `;

      this.style.position = this.style.position || 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes ripple-anim {
      to {
        transform: scale(2.5);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);

  // ============================================
  // PAGE LOAD SEQUENCE
  // ============================================
  // Trigger hero animations with stagger
  const heroAnimElements = document.querySelectorAll('.hero .animate-fade-up');
  heroAnimElements.forEach((el, i) => {
    el.style.animationPlayState = 'running';
  });

  // Small delay before starting scroll observers
  setTimeout(() => {
    // Re-check for elements that are already in viewport
    animateOnScrollElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add('visible');
      }
    });
  }, 100);

  // ============================================
  // THEME CARD CLICK PREVIEW
  // ============================================
  document.querySelectorAll('.theme-card:not(.theme-more)').forEach(card => {
    card.addEventListener('click', function () {
      // Simulate a preview modal with a subtle animation
      this.style.transform = 'scale(0.97)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });

  console.log(
    '%c Sellory ',
    'background: #1B2B5E; color: #C9A96E; font-family: serif; font-size: 18px; padding: 6px 16px; border-radius: 4px;',
    '\nPlatform toko online modern untuk UMKM Indonesia. 🇮🇩'
  );

});
