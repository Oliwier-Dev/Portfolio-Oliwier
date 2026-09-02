const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-nav');
const cursor = document.querySelector('.cursor');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scrollHero = document.querySelector('[data-scroll-hero]');
if (scrollHero && !reduceMotion) {
  let heroFrame = 0;
  const updateHeroProgress = () => {
    heroFrame = 0;
    const distance = Math.max(innerHeight * 0.72, 520);
    const progress = Math.min(1, Math.max(0, scrollY / distance));
    scrollHero.style.setProperty('--hero-progress', progress.toFixed(4));
  };
  const requestHeroUpdate = () => {
    if (!heroFrame) heroFrame = requestAnimationFrame(updateHeroProgress);
  };
  addEventListener('scroll', requestHeroUpdate, { passive: true });
  addEventListener('resize', requestHeroUpdate, { passive: true });
  updateHeroProgress();
}

function closeMenu() {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  mobileMenu.setAttribute('aria-hidden', 'true');
  mobileMenu.classList.remove('is-open');
}

function toggleMenu() {
  if (!menuButton || !mobileMenu) return;
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mobileMenu.setAttribute('aria-hidden', String(!open));
  mobileMenu.classList.toggle('is-open', open);
}

mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

const revealItems = document.querySelectorAll('.reveal');
if (!reduceMotion && 'IntersectionObserver' in window) {
  document.body.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
  revealItems.forEach((element) => observer.observe(element));
} else revealItems.forEach((element) => element.classList.add('is-visible'));

if (cursor && window.matchMedia('(pointer: fine)').matches && !reduceMotion) {
  document.body.classList.add('has-cursor');
  let pointerX = innerWidth / 2;
  let pointerY = innerHeight / 2;
  let cursorX = pointerX;
  let cursorY = pointerY;
  const renderCursor = () => {
    cursorX += (pointerX - cursorX) * 0.18;
    cursorY += (pointerY - cursorY) * 0.18;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(renderCursor);
  };
  addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    cursor.classList.add('is-visible');
  }, { passive: true });
  addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
  addEventListener('pointerdown', () => cursor.classList.add('is-pressed'));
  addEventListener('pointerup', () => cursor.classList.remove('is-pressed'));
  document.querySelectorAll('a, button, .cursor-target').forEach((target) => {
    target.addEventListener('pointerenter', () => cursor.classList.add('is-active'));
    target.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
  });
  renderCursor();
}

const portrait = document.querySelector('.about-photo img');
if (portrait && !reduceMotion) {
  let ticking = false;
  const updatePortrait = () => {
    const rect = portrait.parentElement.getBoundingClientRect();
    const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - (rect.top + rect.height / 2)) / innerHeight));
    portrait.style.transform = `scale(1.06) translateY(${progress * 18}px)`;
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) requestAnimationFrame(updatePortrait);
    ticking = true;
  }, { passive: true });
  updatePortrait();
}
