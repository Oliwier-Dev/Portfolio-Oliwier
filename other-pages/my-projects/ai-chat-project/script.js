const form = document.querySelector('#ask-form');
const questionInput = document.querySelector('#question');
const sendButton = document.querySelector('#send-button');
const stopButton = document.querySelector('#stop-button');
const retryButton = document.querySelector('#retry-button');
const conversation = document.querySelector('#conversation');
const conversationEnd = document.querySelector('#conversation-end');
const connectionStatus = document.querySelector('#connection-status');
const workspace = document.querySelector('.ask-workspace');

let messages = [];
let lastPayload = [];
let activeController = null;
let activeMessage = null;
let activeContent = '';
let readerScrolledUp = false;

function appendInlineFormatting(element, text) {
  const expression = /\*\*(.+?)\*\*/g;
  let cursor = 0;
  let match;
  while ((match = expression.exec(text))) {
    if (match.index > cursor) element.append(document.createTextNode(text.slice(cursor, match.index)));
    const strong = document.createElement('strong');
    strong.textContent = match[1];
    element.append(strong);
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) element.append(document.createTextNode(text.slice(cursor)));
}

function renderSafeFormatting(element, value) {
  element.replaceChildren();
  const lines = value.replace(/\r/g, '').split('\n');
  let index = 0;
  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const node = document.createElement(heading[1].length === 1 ? 'h2' : 'h3');
      appendInlineFormatting(node, heading[2]);
      element.append(node);
      index += 1;
      continue;
    }

    const listMatch = line.match(/^([-*]|\d+\.)\s+(.+)$/);
    if (listMatch) {
      const ordered = /\d+\./.test(listMatch[1]);
      const list = document.createElement(ordered ? 'ol' : 'ul');
      while (index < lines.length) {
        const item = lines[index].trim().match(/^([-*]|\d+\.)\s+(.+)$/);
        if (!item || /\d+\./.test(item[1]) !== ordered) break;
        const listItem = document.createElement('li');
        appendInlineFormatting(listItem, item[2]);
        list.append(listItem);
        index += 1;
      }
      element.append(list);
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (index < lines.length) {
      const next = lines[index].trim();
      if (!next || /^(#{1,3})\s+/.test(next) || /^([-*]|\d+\.)\s+/.test(next)) break;
      paragraphLines.push(next);
      index += 1;
    }
    const paragraph = document.createElement('p');
    appendInlineFormatting(paragraph, paragraphLines.join(' '));
    element.append(paragraph);
  }
}

function updateAutoScrollState() {
  readerScrolledUp = conversation.scrollHeight - conversation.scrollTop - conversation.clientHeight > 120;
}

function scrollConversation(force = false) {
  if (force || !readerScrolledUp) {
    conversation.scrollTo({
      top: conversation.scrollHeight,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }
}

function addUserMessage(content) {
  const article = document.createElement('article');
  article.className = 'message message--user';
  const paragraph = document.createElement('p');
  paragraph.textContent = content;
  article.append(paragraph);
  conversation.insertBefore(article, conversationEnd);
}

function addAssistantMessage() {
  const article = document.createElement('article');
  article.className = 'message message--assistant is-streaming';
  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.setAttribute('aria-hidden', 'true');
  avatar.textContent = 'OM';
  const body = document.createElement('div');
  body.className = 'message-content';
  const loading = document.createElement('p');
  loading.textContent = 'Thinking…';
  body.append(loading);
  article.append(avatar, body);
  conversation.insertBefore(article, conversationEnd);
  return { article, body };
}

function addMessageState(article, message, alert = false) {
  article.querySelector('.message-state')?.remove();
  const state = document.createElement('p');
  state.className = 'message-state';
  if (alert) state.setAttribute('role', 'alert');
  state.textContent = message;
  article.querySelector('.message-content')?.append(state);
}

function setInterfaceState(state, message) {
  const streaming = state === 'streaming';
  stopButton.hidden = !streaming;
  stopButton.disabled = !streaming;
  sendButton.hidden = streaming;
  const canRetry = ['error', 'stopped', 'rate-limited', 'unavailable'].includes(state);
  retryButton.hidden = !canRetry;
  retryButton.disabled = !canRetry;
  questionInput.setAttribute('aria-busy', String(streaming));
  connectionStatus.textContent = message;
  connectionStatus.dataset.tone = ['error', 'rate-limited', 'unavailable'].includes(state) ? 'error' : state === 'complete' ? 'success' : '';
  updateSendState();
}

function updateSendState() {
  sendButton.disabled = Boolean(activeController) || !questionInput.value.trim();
}

function resizeComposer() {
  questionInput.style.height = 'auto';
  questionInput.style.height = `${Math.min(questionInput.scrollHeight, 148)}px`;
}

async function readErrorMessage(response) {
  try {
    const body = await response.json();
    return typeof body?.message === 'string' ? body.message : '';
  } catch {
    return '';
  }
}

async function sendQuestion(rawQuestion, { retry = false } = {}) {
  const question = rawQuestion.trim();
  if ((!question && !retry) || activeController) return;

  if (!retry) {
    addUserMessage(question);
    messages.push({ role: 'user', content: question });
    messages = messages.slice(-12);
    lastPayload = messages.map((message) => ({ ...message }));
    questionInput.value = '';
    resizeComposer();
  }

  readerScrolledUp = false;
  activeMessage = addAssistantMessage();
  activeContent = '';
  const requestController = new AbortController();
  activeController = requestController;
  setInterfaceState('streaming', 'Generating a grounded answer…');
  if (!retry && window.matchMedia('(max-width: 900px)').matches) {
    workspace.scrollIntoView({ block: 'start', behavior: 'auto' });
  }
  scrollConversation(true);

  try {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: lastPayload }),
      signal: requestController.signal,
    });

    if (!response.ok) {
      const detail = await readErrorMessage(response);
      const error = new Error(detail || 'Ask Oliwier could not answer right now.');
      error.status = response.status;
      throw error;
    }
    if (!response.body) throw new Error('No response stream was available.');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let finished = false;
    const parser = window.AskSSE.createSSEParser((event, payload) => {
      if (event === 'delta' && typeof payload.content === 'string') {
        activeContent += payload.content;
        renderSafeFormatting(activeMessage.body, activeContent);
        scrollConversation();
      } else if (event === 'done') {
        finished = true;
      } else if (event === 'error') {
        throw new Error(payload.message || 'The answer stopped unexpectedly.');
      }
    });

    while (!finished) {
      const { value, done } = await reader.read();
      parser.push(decoder.decode(value || new Uint8Array(), { stream: !done }));
      if (done) break;
    }
    parser.finish();

    if (!activeContent.trim()) throw new Error('The model returned an empty answer.');
    activeMessage.article.classList.remove('is-streaming');
    renderSafeFormatting(activeMessage.body, activeContent);
    messages.push({ role: 'assistant', content: activeContent.trim().slice(0, 800) });
    messages = messages.slice(-12);
    setInterfaceState('complete', 'Answer complete.');
  } catch (error) {
    if (activeController === requestController) activeController = null;
    if (error.name === 'AbortError') {
      activeMessage.article.classList.remove('is-streaming');
      if (!activeContent) renderSafeFormatting(activeMessage.body, 'The response was stopped before any text arrived.');
      addMessageState(activeMessage.article, 'Stopped. You can retry the same question.');
      setInterfaceState('stopped', 'Response stopped.');
    } else {
      activeMessage.article.classList.remove('is-streaming');
      if (!activeContent) renderSafeFormatting(activeMessage.body, 'I could not complete that answer.');
      const state = error.status === 429 ? 'rate-limited' : error.status === 503 ? 'unavailable' : 'error';
      const message = state === 'rate-limited'
        ? 'Too many requests. Wait a moment, then retry.'
        : state === 'unavailable'
          ? 'Ask Oliwier is unavailable until the model connection is configured.'
          : error.message || 'The answer failed. Retry when you are ready.';
      addMessageState(activeMessage.article, message, true);
      setInterfaceState(state, message);
    }
  } finally {
    if (activeController === requestController) activeController = null;
    updateSendState();
    questionInput.focus({ preventScroll: true });
    scrollConversation();
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  sendQuestion(event.submitter?.dataset.question || questionInput.value);
});

questionInput.addEventListener('input', () => {
  resizeComposer();
  updateSendState();
});

questionInput.addEventListener('keydown', (event) => {
  if (event.isComposing) return;
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});

stopButton.addEventListener('click', () => activeController?.abort());
retryButton.addEventListener('click', () => sendQuestion('', { retry: true }));
conversation.addEventListener('scroll', updateAutoScrollState, { passive: true });

resizeComposer();
updateSendState();
