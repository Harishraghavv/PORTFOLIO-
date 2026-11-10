/**
 * PORTFOLIO JAVASCRIPT - HARISH RAGHAVENDRA
 * Clean, lightweight, dependency-free vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. THEME SWITCHER (Dark / Light Mode) ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Retrieve saved theme or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else if (!systemPrefersDark) {
    htmlElement.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  // --- 2. MOBILE NAVIGATION MENU ---
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggleBtn.classList.toggle('open', isOpen);
      mobileToggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking on any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggleBtn.classList.remove('open');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !mobileToggleBtn.contains(event.target)) {
        navMenu.classList.remove('open');
        mobileToggleBtn.classList.remove('open');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- 3. DYNAMIC HERO TYPING EFFECT ---
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = [
      'Aspiring Web Developer',
      'Computer Science Scholar',
      'Tech Enthusiast & Innovator',
      'Student Head & Coordinator',
      'Disciplined Basketball Athlete'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 90;
    const eraseSpeed = 45;
    const delayBetweenWords = 1800;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeoutDuration = isDeleting ? eraseSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentRole.length) {
        timeoutDuration = delayBetweenWords;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timeoutDuration = 400;
      }

      setTimeout(typeEffect, timeoutDuration);
    }

    typeEffect();
  }

  // --- 4. ACTIVE NAVIGATION LINK ON SCROLL ---
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-list a[href*='${sectionId}']`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (activeLink) activeLink.classList.add('active');
      } else {
        if (activeLink) activeLink.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveNavLink);

  // --- 5. PROJECTS CATEGORY FILTER ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active button styling
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const cardCategories = card.getAttribute('data-category') || '';
          if (filterValue === 'all' || cardCategories.includes(filterValue)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // --- 6. INTERACTIVE CONTACT FORM WITH CLIENT VALIDATION ---
  const contactForm = document.getElementById('portfolio-contact-form');
  const formAlert = document.getElementById('form-alert');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('submit-btn');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Reset errors
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      formAlert.classList.add('hidden');
      formAlert.className = 'form-alert hidden';

      let isValid = true;

      // Validate name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        nameError.textContent = 'Please provide your full name (at least 2 characters).';
        isValid = false;
      }

      // Validate email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please provide a valid email address.';
        isValid = false;
      }

      // Validate message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        messageError.textContent = 'Please write a message with at least 10 characters.';
        isValid = false;
      }

      if (!isValid) return;

      // Show processing state
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>';

      // Simulate sending and trigger fallback mailto
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        // Feedback alert
        formAlert.className = 'form-alert success';
        formAlert.classList.remove('hidden');
        formAlert.innerHTML = `
          <strong>Thank you, ${nameInput.value.trim()}!</strong> Your message has been prepared. 
          You can also reach Harish directly at <a href="mailto:harishraghav.prabha@gmail.com" style="text-decoration: underline; font-weight: 600;">harishraghav.prabha@gmail.com</a>.
        `;

        // Compose direct mailto link to ensure prompt delivery
        const subject = encodeURIComponent(subjectInput.value.trim() || 'Portfolio Inquiry');
        const body = encodeURIComponent(`From: ${nameInput.value.trim()} (${emailInput.value.trim()})\n\nMessage:\n${messageInput.value.trim()}`);
        const mailtoUri = `mailto:harishraghav.prabha@gmail.com?subject=${subject}&body=${body}`;

        // Prompt optional client mail opening
        window.open(mailtoUri, '_blank');

        // Reset inputs
        contactForm.reset();
      }, 900);
    });
  }

  // --- 7. BACK TO TOP BUTTON ---
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 8. FOOTER CURRENT YEAR AUTO-UPDATE ---
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
