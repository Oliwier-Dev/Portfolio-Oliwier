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
  document.querySelectorAll('.reveal, [data-detail-story]').forEach((item) => observer.observe(item));
} else document.querySelectorAll('.reveal, [data-detail-story]').forEach((item) => item.classList.add('is-visible'));

const detailStory = document.querySelector('[data-detail-story]');
if (detailStory && !reduced) {
  let storyFrame = 0;
  const updateDetailStory = () => {
    const bounds = detailStory.getBoundingClientRect();
    const distance = innerHeight + bounds.height;
    const progress = Math.max(0, Math.min(1, (innerHeight - bounds.top) / distance));
    detailStory.style.setProperty('--story-progress', progress.toFixed(3));
    detailStory.style.setProperty('--story-title-x', `${(-18 * progress).toFixed(2)}px`);
    detailStory.style.setProperty('--component-y', `${(-46 * (progress - .45)).toFixed(2)}px`);
    detailStory.style.setProperty('--component-rotate', `${(-.8 * (progress - .5)).toFixed(3)}deg`);
    detailStory.style.setProperty('--workshop-y', `${(58 * (progress - .45)).toFixed(2)}px`);
    detailStory.style.setProperty('--workshop-rotate', `${(-2 + 1.2 * progress).toFixed(3)}deg`);
    storyFrame = 0;
  };
  const queueDetailStory = () => {
    if (!storyFrame) storyFrame = requestAnimationFrame(updateDetailStory);
  };
  addEventListener('scroll', queueDetailStory, { passive: true });
  addEventListener('resize', queueDetailStory);
  updateDetailStory();
}

const filterButtons = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('[data-category]');
function filterRestorations(filter, button) {
  filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  projects.forEach((project) => { project.hidden = filter !== 'all' && project.dataset.category !== filter; });
}
