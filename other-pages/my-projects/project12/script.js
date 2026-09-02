const ui = {
  openPopUpBtn: document.querySelector('#openPopUpBtn'),
  popUp: document.querySelector('#popUp'),
  form: document.querySelector('#form'),
  userInput: document.querySelector('#userInput'),
  addSubredditBtn: document.querySelector('#addSubredditBtn'),
  redditLanes: document.querySelector('#redditLanes')
};

let popUpOpen = false;
const status = document.createElement('p');
status.id = 'redditStatus';
status.setAttribute('role', 'status');
status.setAttribute('aria-live', 'polite');
ui.form.append(status);

ui.form.addEventListener('submit', loadSubreddit);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && popUpOpen) setPopup(false); });

function toggleSubredditPopup() { setPopup(!popUpOpen); }

function setPopup(open) {
  popUpOpen = open;
  ui.openPopUpBtn.style.transform = open ? 'rotate(-45deg)' : 'rotate(0deg)';
  ui.openPopUpBtn.setAttribute('aria-expanded', String(open));
  ui.popUp.classList.toggle('pointer-events-none', !open);
  ui.popUp.classList.toggle('opacity-0', !open);
  ui.popUp.classList.toggle('scale-95', !open);
  ui.popUp.classList.toggle('opacity-100', open);
  ui.popUp.classList.toggle('scale-100', open);
  if (open) ui.userInput.focus();
}

async function loadSubreddit(event) {
  event.preventDefault();
  const subreddit = ui.userInput.value.trim().replace(/^r\//i, '');
  if (!subreddit) {
    status.textContent = 'Enter a subreddit name.';
    ui.userInput.focus();
    return;
  }

  status.textContent = `Loading r/${subreddit}…`;
  ui.addSubredditBtn.disabled = true;
  ui.addSubredditBtn.setAttribute('aria-busy', 'true');

  try {
    const response = await fetch(`https://www.reddit.com/r/${encodeURIComponent(subreddit)}.json`);
    if (!response.ok) throw new Error(`Reddit returned ${response.status}`);
    const payload = await response.json();
    const posts = payload?.data?.children;
    if (!Array.isArray(posts)) throw new Error('Unexpected response');
    displayInfo(subreddit, posts);
    status.textContent = `Loaded ${posts.length} posts from r/${subreddit}.`;
    ui.userInput.value = '';
    setPopup(false);
  } catch (_) {
    status.textContent = 'Reddit could not be reached. Check the name or try again later.';
  } finally {
    ui.addSubredditBtn.disabled = false;
    ui.addSubredditBtn.removeAttribute('aria-busy');
  }
}

function displayInfo(subredditName, posts) {
  const lane = document.createElement('section');
  lane.className = 'reddit-lane';
  const heading = document.createElement('header');
  const title = document.createElement('h2');
  title.textContent = `/r/${subredditName}`;
  const remove = document.createElement('button');
  remove.type = 'button';
  remove.textContent = 'Remove';
  remove.addEventListener('click', () => lane.remove());
  heading.append(title, remove);
  lane.append(heading);

  posts.slice(0, 10).forEach(({ data }) => {
    const article = document.createElement('article');
    const postTitle = document.createElement('h3');
    postTitle.textContent = data.title;
    const meta = document.createElement('p');
    meta.textContent = `${data.ups} upvotes · ${data.num_comments} comments · u/${data.author}`;
    const link = document.createElement('a');
    link.href = `https://reddit.com${data.permalink}`;
    link.textContent = 'View post ↗';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    article.append(postTitle, meta, link);
    lane.append(article);
  });

  ui.redditLanes.append(lane);
}
