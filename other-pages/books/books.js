function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);
}

function renderBook(text, target) {
  const chapterNames = new Set(['Mindset', 'Productivity', 'Money', 'Psychology', 'Life', 'Action']);
  const specialNames = new Set(['Summary', 'Reflection', 'Questions']);
  const blocks = text.replace(/\r/g, '').split(/\n\s*\n+/).map((block) => block.trim()).filter(Boolean);
  let chapterNumber = 0;

  target.innerHTML = blocks.map((block) => {
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
    const first = lines[0];
    const safe = lines.map(escapeHtml);

    if (lines.length === 1 && chapterNames.has(first)) return `<h2 class="book-part">${safe[0]}</h2>`;
    if (chapterNames.has(first) && lines.length > 1) {
      chapterNumber += 1;
      const title = safe[1];
      const remaining = safe.slice(2);
      const chapter = `<h3 class="book-chapter"><span>Chapter ${String(chapterNumber).padStart(2, '0')}</span>${title}</h3>`;
      const body = remaining.length ? `<p>${remaining.join('<br>')}</p>` : '';
      return `<h2 class="book-part">${safe[0]}</h2>${chapter}${body}`;
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
