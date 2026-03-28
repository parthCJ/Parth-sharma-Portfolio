const revealTargets = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((target, index) => {
  target.style.transitionDelay = `${index * 90}ms`;
  observer.observe(target);
});

const backToTopLink = document.querySelector('footer a[href="#top"]');

backToTopLink?.addEventListener('click', (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
