// Custom Cursor with Orbiting Particles
const initCustomCursor = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 48;
  canvas.height = 48;
  canvas.style.position = 'fixed';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  canvas.style.display = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let mouseX = 0;
  let mouseY = 0;
  let animationTime = 0;

  const drawCursor = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const time = animationTime * 0.05;

    // Main circle
    ctx.fillStyle = '#0b8e83';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 7, 0, Math.PI * 2);
    ctx.fill();

    // Orbiting particles
    const particleCount = 4;
    const orbitRadius = 14;
    for (let i = 0; i < particleCount; i++) {
      const angle = (time + (i / particleCount) * Math.PI * 2);
      const x = centerX + Math.cos(angle) * orbitRadius;
      const y = centerY + Math.sin(angle) * orbitRadius;

      ctx.fillStyle = `rgba(219, 79, 31, ${0.6 + Math.sin(time + i) * 0.4})`;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    animationTime++;
    requestAnimationFrame(drawCursor);
  };

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    canvas.style.left = (mouseX - 24) + 'px';
    canvas.style.top = (mouseY - 24) + 'px';
    canvas.style.display = 'block';
  });

  document.addEventListener('mouseleave', () => {
    canvas.style.display = 'none';
  });

  document.body.style.cursor = 'none';
  drawCursor();
};

initCustomCursor();

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

const cdDisk = document.getElementById('cd-disk');
const cdAudio = document.getElementById('cd-audio');
const playPauseIcon = document.getElementById('play-pause-icon');

let isPlaying = false;

const updateIcon = () => {
  if (playPauseIcon) {
    playPauseIcon.textContent = isPlaying ? '⏸' : '▶';
  }
};

cdDisk?.addEventListener('click', () => {
  if (!cdAudio) return;

  if (isPlaying) {
    cdAudio.pause();
    isPlaying = false;
  } else {
    cdAudio.play().catch(() => {
      console.log('Audio play failed');
    });
    isPlaying = true;
  }
  updateIcon();
});

cdDisk?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    cdDisk.click();
  }
});

cdAudio?.addEventListener('ended', () => {
  isPlaying = false;
  updateIcon();
});
