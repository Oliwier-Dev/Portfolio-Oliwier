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
  bar.className = 'subsite-bar';
  bar.innerHTML = '<a href="/index.html">Oliwier Mako</a><nav aria-label="Portfolio navigation"><a href="/index.html#work">Work</a><a href="/index.html#websites">Websites</a><a href="/index.html#about">About</a></nav><a class="subsite-contact" href="https://www.instagram.com/oliwier_mako/" target="_blank" rel="noopener noreferrer">Start a project ↗</a>';
  body.insertBefore(bar, body.firstElementChild?.nextSibling || null);

  if (body.classList.contains('demo-page')) {
    const main = document.querySelector('main');
    if (main) {
      const title = document.title.replace(/\s*[—|-].*$/, '');
      const intro = document.createElement('header');
      intro.className = 'demo-intro';
      intro.innerHTML = `<p>Earlier build · Interactive demo</p><h1>${title}</h1>`;
      main.prepend(intro);
    }
  }

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
