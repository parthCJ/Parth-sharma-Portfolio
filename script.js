const revealTargets = document.querySelectorAll('.reveal');

const loader = document.getElementById('intro-loader');
const introProgress = document.getElementById('intro-progress');
const introPercent = document.getElementById('intro-percent');
const introWord = document.getElementById('intro-word');

const runLoader = () => {
  if (!loader || !introProgress || !introPercent || !introWord) {
    document.body.classList.remove('is-loading');
    return;
  }

  const words = ['bold', 'cinematic', 'playful', 'sharp'];
  let wordIndex = 0;
  let progress = 0;
  const startedAt = Date.now();

  const wordTimer = window.setInterval(() => {
    wordIndex = (wordIndex + 1) % words.length;
    introWord.textContent = words[wordIndex];
  }, 320);

  const progressTimer = window.setInterval(() => {
    const step = Math.floor(Math.random() * 12) + 5;
    progress = Math.min(progress + step, 100);

    introProgress.style.width = `${progress}%`;
    introPercent.textContent = `${progress}%`;

    const progressWrap = introProgress.parentElement;
    progressWrap?.setAttribute('aria-valuenow', String(progress));

    if (progress >= 100 && Date.now() - startedAt > 1250) {
      window.clearInterval(progressTimer);
      window.clearInterval(wordTimer);

      loader.classList.add('is-hidden');
      document.body.classList.remove('is-loading');

      window.setTimeout(() => {
        loader.remove();
      }, 500);
    }
  }, 190);
};

runLoader();

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
