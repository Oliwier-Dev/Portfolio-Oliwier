const menu = document.querySelector('.nl-menu');
const nav = document.querySelector('.nl-nav');
const closeNav = () => {
  menu?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('aria-label', 'Open navigation');
  nav?.classList.remove('is-open');
};
function toggleNorthlineMenu() {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav?.classList.toggle('is-open', open);
}
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
addEventListener('keydown', (event) => { if (event.key === 'Escape') closeNav(); });

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduced && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  }), { threshold: .12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
} else document.querySelectorAll('.reveal').forEach((item) => item.classList.add('is-visible'));

const filterButtons = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('[data-category]');
function filterRestorations(filter, button) {
  filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  projects.forEach((project) => { project.hidden = filter !== 'all' && project.dataset.category !== filter; });
}
