// Hamburger icon
const hamburger = document.getElementById('hamburger');
const overlay = document.getElementById('mobileOverlay');

if (hamburger && overlay) {
  hamburger.addEventListener('click', () => {
    const isOpen = overlay.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);

    hamburger.setAttribute('aria-expanded', String(isOpen));
    overlay.setAttribute('aria-hidden', String(!isOpen));

    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  overlay.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target === overlay) {
      overlay.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
}

// Filter buttons for menu
const filterButtons = document.querySelectorAll(".filters button");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});


document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filters button');
  const dishes = document.querySelectorAll('.dish');

  // Set default active filter (first button)
  if (filterButtons.length > 0) {
    filterButtons[0].classList.add('active');
    filterDishes(filterButtons[0].dataset.category);
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter dishes
      filterDishes(category);
    });
  });

  function filterDishes(category) {
    dishes.forEach(dish => {
      if (dish.dataset.category === category) {
        dish.style.display = 'block';
      } else {
        dish.style.display = 'none';
      }
    });
  }
});