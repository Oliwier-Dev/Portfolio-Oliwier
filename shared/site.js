(() => {
  const path = location.pathname.toLowerCase();
  const body = document.body;
  body.classList.add('precision-page');
  const mainTarget = document.querySelector('main');
  if (mainTarget && !mainTarget.id) mainTarget.id = 'main';
  if (path.includes('/books/')) body.classList.add('books-page');
  if (path.includes('/legal/')) body.classList.add('legal-page');
  if (path.endsWith('/my-projects/') || path.endsWith('/my-projects/index.html')) body.classList.add('projects-index');
  if (path.includes('/ai-chat-project/')) body.classList.add('demo-page', 'ai-demo');
  if (path.includes('/project11-tasktracker/')) body.classList.add('demo-page', 'task-demo');
  if (path.includes('/project12/')) body.classList.add('demo-page', 'reddit-demo');
  if (path.includes('/project13/')) body.classList.add('demo-page', 'converter-demo');
  if (path.includes('/project7-quiz/')) body.classList.add('demo-page', 'quiz-demo');

  if (!document.querySelector('.skip-link')) {
    const skip = document.createElement('a');
    skip.className = 'skip-link';
    skip.href = '#main';
    skip.textContent = 'Skip to content';
    body.prepend(skip);
  }

  const bar = document.createElement('header');
  bar.className = 'site-header shared-header';
  bar.innerHTML = '<a class="wordmark" href="/index.html" aria-label="Oliwier Mako, home">Oliwier Mako</a><nav class="desktop-nav" aria-label="Main navigation"><a href="/index.html#work">Work</a><a href="/index.html#websites">Websites</a><a href="/index.html#about">About</a></nav><a class="button button--small header-cta" href="https://www.instagram.com/oliwiermako/" target="_blank" rel="noopener noreferrer">Start a project</a><button class="menu-button" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="shared-mobile-menu"><span></span><span></span></button><nav class="mobile-nav" id="shared-mobile-menu" aria-label="Mobile navigation" aria-hidden="true"><a href="/index.html#work">Work</a><a href="/index.html#websites">Websites</a><a href="/index.html#about">About</a><a href="https://www.instagram.com/oliwiermako/" target="_blank" rel="noopener noreferrer">Start a project ↗</a></nav>';
  body.insertBefore(bar, body.firstElementChild?.nextSibling || null);

  const menuButton = bar.querySelector('.menu-button');
  const mobileMenu = bar.querySelector('.mobile-nav');
  const setMenu = (open) => {
    menuButton?.setAttribute('aria-expanded', String(open));
    menuButton?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileMenu?.setAttribute('aria-hidden', String(!open));
    mobileMenu?.classList.toggle('is-open', open);
  };
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });

  if (body.classList.contains('books-page') && document.querySelector('.book-article')) {
    const progress = document.createElement('div');
    progress.className = 'reading-progress';
    progress.setAttribute('aria-hidden', 'true');
    body.append(progress);
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    addEventListener('scroll', update, { passive: true });
    update();
  }
})();
