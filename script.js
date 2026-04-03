const entries = [
  { day: "Day 1", text: "I saw a fish today. I chased it. I missed. This is a personal attack." },
  { day: "Day 2", text: "I got the fish. Balance has been restored." },
  { day: "Day 3", text: "It rained. I am already wet. I do not understand the problem humans have with this." },
  { day: "Day 4", text: "Napped for six hours. Considered napping more. Did." },
  { day: "Day 5", text: "A human waved at me today. I did not wave back. We are not equals." },
];

const main = document.getElementById('entries');

entries.forEach(e => {
    const div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML = `<h2>${e.day}</h2><p></p>`;
    div.dataset.text = e.text;
    main.appendChild(div);
});

function typeText(el, text) {
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    el.appendChild(cursor);
    const t = setInterval(() => {
        if (i < text.length) cursor.insertAdjacentText('beforebegin', text[i++]);
        else { clearInterval(t); setTimeout(() => cursor.remove(), 1000); }
    }, 35);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting && !target.classList.contains('visible')) {
      target.classList.add('visible');
      setTimeout(() => typeText(target.querySelector('p'), target.dataset.text), 400);
      observer.unobserve(target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.entry').forEach(e => observer.observe(e));

const btn = document.getElementById('soundBtn');
const audio = document.getElementById('ocean');
btn.addEventListener('click', () => {
    if (audio.paused) { audio.play(); btn.textContent = '🔊'; }
    else              { audio.pause(); btn.textContent = '🔇'; }
});