function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);
}

function renderBook(text, target) {
  const chapterNames = new Set(['Mindset', 'Productivity', 'Money', 'Psychology', 'Life', 'Action']);
  const specialNames = new Set(['Summary', 'Reflection', 'Questions']);
  const blocks = text.replace(/\r/g, '').split(/\n\s*\n+/).map((block) => block.trim()).filter(Boolean);
  const firstPartIndex = blocks.findIndex((block) => /^Mindset\nHow to change your mindset/.test(block));
  const openingBlocks = firstPartIndex > 0 ? blocks.slice(0, firstPartIndex) : [];
  const bookBlocks = firstPartIndex > 0 ? blocks.slice(firstPartIndex) : blocks;
  const contentsIndex = openingBlocks.findIndex((block) => block === 'Contents');
  const introBlocks = contentsIndex > 0 ? openingBlocks.slice(1, contentsIndex) : [];
  const contentsBlocks = contentsIndex >= 0 ? openingBlocks.slice(contentsIndex + 1, -1) : [];
  const readerNote = contentsIndex >= 0 ? openingBlocks.at(-1) : '';
  let chapterNumber = 0;
  let partNumber = 0;

  function renderPart(title) {
    partNumber += 1;
    return `<h2 class="book-part${partNumber === 1 ? ' book-part--first' : ''}">${escapeHtml(title)}</h2>`;
  }

  const openingHtml = [
    introBlocks.length ? `<div class="book-intro">${introBlocks.map((block) => `<p>${escapeHtml(block)}</p>`).join('')}</div>` : '',
    contentsBlocks.length ? `<section class="book-contents"><h2>Contents</h2><ol>${contentsBlocks.map((block) => {
      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
      return `<li><strong>${escapeHtml(lines[0])}</strong>${lines.length > 1 ? `<span>${lines.slice(1).map(escapeHtml).join(' · ')}</span>` : ''}</li>`;
    }).join('')}</ol></section>` : '',
    readerNote ? `<aside class="book-reader-note"><strong>Reader’s note</strong><p>${escapeHtml(readerNote)}</p></aside>` : ''
  ].join('');

  target.innerHTML = openingHtml + bookBlocks.map((block) => {
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
    const first = lines[0];
    const safe = lines.map(escapeHtml);

    if (lines.length === 1 && chapterNames.has(first)) return renderPart(first);
    if (chapterNames.has(first) && lines.length > 1) {
      chapterNumber += 1;
      const title = safe[1];
      const remaining = safe.slice(2);
      const chapter = `<h3 class="book-chapter"><span>Chapter ${String(chapterNumber).padStart(2, '0')}</span>${title}</h3>`;
      const body = remaining.length ? `<p>${remaining.join('<br>')}</p>` : '';
      return `${renderPart(first)}${chapter}${body}`;
    }
    if (lines.length === 1 && specialNames.has(first)) return `<h4 class="book-marker">${safe[0]}</h4>`;
    if (lines.length === 1 && /^[“"‘']/.test(first)) return `<blockquote>${safe[0]}</blockquote>`;
    if (lines.length === 1 && first.length < 92 && !/[.!?]$/.test(first)) {
      chapterNumber += 1;
      return `<h3 class="book-chapter"><span>Chapter ${String(chapterNumber).padStart(2, '0')}</span>${safe[0]}</h3>`;
    }
    if (lines.every((line) => /^([*•-])\s+/.test(line))) {
      return `<ul>${safe.map((line) => `<li>${line.replace(/^([*•-])\s+/, '')}</li>`).join('')}</ul>`;
    }
    if (lines.every((line) => /^\d+\.\s+/.test(line))) {
      return `<ol>${safe.map((line) => `<li>${line.replace(/^\d+\.\s+/, '')}</li>`).join('')}</ol>`;
    }
    return `<p>${safe.join('<br>')}</p>`;
  }).join('');
}

document.querySelectorAll('[data-book-source]').forEach(async (article) => {
  try {
    const response = await fetch(article.dataset.bookSource);
    if (!response.ok) throw new Error('Book source not found');
    renderBook(await response.text(), article);
  } catch (_) {
    article.innerHTML = '<p class="book-article__loading">This book could not be loaded right now.</p>';
  }
});
