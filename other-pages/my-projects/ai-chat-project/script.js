const questionInput = document.querySelector('#question');
function chooseQuestion(button) {
  questionInput.placeholder = button.dataset.question;
  document.querySelector('.composer').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
}

// Future provider-neutral contract:
// POST /api/ask with { question: string }.
// The server must answer only from data/oliwier-public-profile.json, refuse
// private or age-related questions, and return { answer: string, sources: string[] }.
