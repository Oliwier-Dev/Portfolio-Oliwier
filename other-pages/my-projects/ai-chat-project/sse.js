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

  return { createSSEParser };
});
