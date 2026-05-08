
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // stagger siblings
          const siblings = entry.target.parentElement.querySelectorAll('.reveal');
          siblings.forEach((el, i) => {
            if (!el.classList.contains('visible')) {
              setTimeout(() => el.classList.add('visible'), i * 120);
            }
          });
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Mobile menu
    function toggleMenu() {
      const nav = document.querySelector('.nav-links');
      if (nav.style.display === 'flex') {
        nav.style.display = 'none';
      } else {
        nav.style.cssText = `
          display: flex; flex-direction: column;
          position: fixed; top: 70px; left: 0; right: 0;
          background: rgba(250,247,242,.97); backdrop-filter: blur(12px);
          padding: 2rem; gap: 1.5rem;
          border-bottom: 1px solid #d4c9b0;
          z-index: 999;
        `;
      }
    }

    // Enquire buttons
    document.querySelectorAll('.product-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Form submit
    function handleSubmit() {
      const btn = document.querySelector('.form-submit .btn-primary');
      btn.textContent = '✓ Enquiry Sent!';
      btn.style.background = '#2d4a35';
      setTimeout(() => {
        btn.textContent = 'Send Enquiry →';
        btn.style.background = '';
      }, 3000);
    }

    // Animated counters on stats
    function animateCount(el, target, suffix = '') {
      let count = 0;
      const step = target / 60;
      const interval = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = (count >= 1000 ? (count/1000).toFixed(1)+'K' : Math.round(count)) + suffix;
        if (count >= target) clearInterval(interval);
      }, 20);
    }
  
function sendToWhatsApp(event) {
  event.preventDefault();

  let name = document.querySelector('[name="name"]').value || "";
  let company = document.querySelector('[name="company"]').value || "";
  let email = document.querySelector('[name="email"]').value || "";
  let phoneInput = document.querySelector('[name="phone"]').value || "";
  let product = document.querySelector('[name="product"]').value || "";
  let message = document.querySelector('[name="message"]').value || "";

  let yourNumber = "918237896811";

  let text =
`New Enquiry:

Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phoneInput}
Product: ${product}
Message: ${message}`;

  let encodedText = encodeURIComponent(text);

  let isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  let url;

  if (isMobile) {
    url = "https://wa.me/" + yourNumber + "?text=" + encodedText;
  } else {
    url = "https://web.whatsapp.com/send?phone=" + yourNumber + "&text=" + encodedText;
  }

  window.open(url, "_blank");
}
