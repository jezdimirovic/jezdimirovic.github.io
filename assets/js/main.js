// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isHidden = navMenu.classList.toggle('hidden');
    navToggle.setAttribute('aria-expanded', String(!isHidden));
  });
  navMenu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      navMenu.classList.add('hidden');
      navToggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// On-scroll reveal
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');
if (reduce) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } }),
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));
}

// Scroll-spy: highlight active nav link
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('[data-nav]');
const spy = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      navLinks.forEach((l) => l.classList.toggle('text-accent', l.getAttribute('href') === `#${e.target.id}`));
    }
  }),
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach((s) => spy.observe(s));

// Typed role effect
const typedEl = document.getElementById('typed-role');
const typedPhrases = typedEl ? (typedEl.dataset.typed || '').split('|').filter(Boolean) : [];
if (typedEl && !reduce && typedPhrases.length) {
  const phrases = typedPhrases;
  let pi = 0, ci = 0, deleting = false;
  const tick = () => {
    const word = phrases[pi];
    typedEl.textContent = word.slice(0, ci);
    if (!deleting && ci < word.length) { ci++; setTimeout(tick, 70); }
    else if (!deleting) { deleting = true; setTimeout(tick, 1600); }
    else if (ci > 0) { ci--; setTimeout(tick, 35); }
    else { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 300); }
  };
  tick();
} else if (typedEl && typedPhrases.length) {
  typedEl.textContent = typedPhrases[0];
}
