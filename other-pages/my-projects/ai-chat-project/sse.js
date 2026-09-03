(function exposeSSEParser(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.AskSSE = api;
})(typeof window !== 'undefined' ? window : null, function createAPI() {
  function createSSEParser(onEvent) {
    let buffer = '';

    const consume = (block) => {
      let event = 'message';
      let data = '';
      for (const line of block.split('\n')) {
        if (line.startsWith('event:')) event = line.slice(6).trim();
        if (line.startsWith('data:')) data += line.slice(5).trim();
      }
      if (!data) return;
      onEvent(event, JSON.parse(data));
    };

    return {
      push(chunk) {
        buffer += String(chunk).replace(/\r\n/g, '\n');
        let boundary;
        while ((boundary = buffer.indexOf('\n\n')) !== -1) {
          const block = buffer.slice(0, boundary);
          buffer = buffer.slice(boundary + 2);
          if (block.trim()) consume(block);
        }
      },
      finish() {
        if (buffer.trim()) consume(buffer);
        buffer = '';
      },
    };
  }

  function safeHttpUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
    } catch {
      return null;
    }
  }

  function tokenizeInlineFormatting(value) {
    const text = String(value);
    const expression = /(\*\*([^*\n]+)\*\*|\[([^\]\n]+)\]\(([^)\s]+)\)|<(https?:\/\/[^>\s]+)>|(https?:\/\/[^\s<]+))/g;
    const tokens = [];
    let cursor = 0;
    let match;

    const addText = (content) => {
      if (!content) return;
      const previous = tokens.at(-1);
      if (previous?.type === 'text') previous.content += content;
      else tokens.push({ type: 'text', content });
    };

    while ((match = expression.exec(text))) {
      if (match.index > cursor) addText(text.slice(cursor, match.index));
      if (match[2]) {
        tokens.push({ type: 'strong', content: match[2] });
      } else {
        const markdownHref = match[4];
        const angleHref = match[5];
        let candidate = markdownHref || angleHref || match[6];
        let trailing = '';
        if (!markdownHref && !angleHref) {
          const clean = candidate.replace(/[.,!?;:]+$/, '');
          trailing = candidate.slice(clean.length);
          candidate = clean;
        }
        const href = safeHttpUrl(candidate);
        if (href) {
          tokens.push({ type: 'link', content: match[3] || candidate, href });
          addText(trailing);
        } else {
          addText(match[0]);
        }
      }
      cursor = match.index + match[0].length;
    }
    if (cursor < text.length) addText(text.slice(cursor));
    return tokens;
  }

  return { createSSEParser, safeHttpUrl, tokenizeInlineFormatting };
});
