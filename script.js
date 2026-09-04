// script.js - subtle interactions: reveal-on-scroll, lightbox, and parallax hero card

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('show');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* Lightbox */
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
const lbClose = document.getElementById('lb-close');

document.querySelectorAll('.gallery-item').forEach(img => {
  img.addEventListener('click', (ev) => {
    lbImg.src = ev.currentTarget.src;
    lbCaption.textContent = ev.currentTarget.alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  });
});

lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  lbImg.src = '';
  lbCaption.textContent = '';
}

/* Parallax tilt for hero photo (subtle) */
const parallax = document.getElementById('parallax');
if (parallax) {
  parallax.addEventListener('mousemove', (e) => {
    const r = parallax.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    parallax.style.transform = `rotateY(${px * 6}deg) rotateX(${ -py * 6 }deg) translateZ(6px)`;
  });
  parallax.addEventListener('mouseleave', () => {
    parallax.style.transform = `rotateY(0deg) rotateX(0deg) translateZ(0)`;
  });
}

/* Accessibility: close lightbox with ESC */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});