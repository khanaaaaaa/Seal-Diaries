// fix sound button text
document.getElementById('soundBtn').textContent = 'sound off';

const entries = [
  {
    day: "Day 1", date: "March 3",
    weather: "overcast · 12°C · low tide",
    photo: "images/pic1.jpg",
    caption: "the rock. my rock.",
    mood: "focused",
    text: "Saw a fish. Chased it. Missed. Harbour seals can swim up to 35 km/h but apparently I was not doing that today.",
    note: "the lunge needs work."
  },
  {
    day: "Day 2", date: "March 4",
    weather: "partly cloudy · 13°C",
    photo: "images/pic2.jpg",
    caption: "got one.",
    mood: "satisfied",
    text: "Caught a herring. My whiskers picked up the pressure wave before I even saw it. Vibrissae — that is what they are called. 900 of them. All working perfectly.",
    note: "herring: 9/10. would chase again."
  },
  {
    day: "Day 3", date: "March 5",
    weather: "raining · 10°C · high tide",
    photo: "images/pic3.jpg",
    caption: "resting. do not approach.",
    mood: "unbothered",
    text: "Slept underwater for 11 minutes. Heart rate slowed to about 4 bpm. Seals can redirect blood away from non-essential organs during a dive. I am non-essential to no one.",
    note: "woke up. went back to sleep."
  },
  {
    day: "Day 4", date: "March 7",
    weather: "sunny · 15°C · ebb tide",
    photo: "images/pic4.jpg",
    caption: "the kayak incident.",
    mood: "unimpressed",
    text: "A human waved at me from a kayak. I looked at them for a long time. Did not wave back. Harbour seals are naturally curious but that does not mean I owe anyone a response.",
    note: "they had a camera. I gave them my good side. I am not unreasonable."
  },
  {
    day: "Day 5", date: "March 9",
    weather: "windy · 11°C",
    photo: "images/pic5.jpg",
    caption: "self study.",
    mood: "reflective",
    text: "My spot pattern is unique — like a fingerprint. No two harbour seals look the same. Researchers use this to identify individuals in the wild. I have been identified. I am known.",
    note: "I have been thinking about this all afternoon."
  },
  {
    day: "Day 6", date: "March 11",
    weather: "foggy · 9°C · slack tide",
    photo: "images/pic6.jpg",
    caption: "Gerald again.",
    mood: "irritated",
    text: "Gerald took my haul-out spot. Harbour seals gather in groups called colonies but there is no rule that says I have to like everyone in mine. I moved six inches left. This is called tolerance.",
    note: "Gerald has been noted."
  },
  {
    day: "Day 7", date: "March 14",
    weather: "clearing · 14°C",
    photo: "images/pic7.jpg",
    caption: "500 metres down.",
    mood: "accomplished",
    text: "Dived to around 300 metres today. Harbour seals can reach 500m and hold their breath for 28 minutes. My eyes have a special reflective layer — the tapetum lucidum — that makes underwater vision sharp even in low light.",
    note: "saw a lingcod. we did not speak."
  },
  {
    day: "Day 8", date: "March 16",
    weather: "mild · 13°C · low tide",
    photo: "images/pic8.jpg",
    caption: "evening haul-out.",
    mood: "tired",
    text: "On land my vision is blurry. Underwater it is sharp. My eyes are built for the sea — flattened cornea, large pupils, the whole thing. Land is fine. But it is not where I am at my best.",
    note: "the sunset was fine. the fish were better."
  },
  {
    day: "Day 9", date: "March 18",
    weather: "storm · 8°C · rough seas",
    photo: "images/pic9.jpg",
    caption: "storm day.",
    mood: "cosy",
    text: "Stayed hauled out during the storm. Harbour seals can thermoregulate well — a thick layer of blubber, up to 5 cm, keeps core temperature stable. The rain does not bother me. I am already wet.",
    note: "two salmon. one nap. one more salmon."
  },
  {
    day: "Day 10", date: "March 20",
    weather: "clear · 16°C · spring tide",
    photo: "images/pic10.jpg",
    caption: "first day of spring.",
    mood: "at peace",
    text: "Harbour seals live 25–35 years. I have many more springs ahead of me. Gerald has moved to a different rock. The fish are running. Everything is as it should be.",
    note: "I have nothing more to say at this time."
  }
];

// build pages
const book = document.getElementById('book');
entries.forEach((e, i) => {
  const page = document.createElement('div');
  page.className = 'page' + (i === 0 ? ' active' : '');

  const left = document.createElement('div');
  left.className = 'page-left';
  left.innerHTML = `
    <p class="p-date">${e.date}</p>
    <div class="photo-frame"><img src="${e.photo}" alt="${e.caption}"/></div>
    <p class="p-caption">${e.caption}</p>
    <p class="p-mood">mood: ${e.mood}</p>
  `;

  const right = document.createElement('div');
  right.className = 'page-right';

  const dayEl   = document.createElement('div');
  dayEl.className = 'p-header';
  dayEl.innerHTML = `<span class="p-day">${e.day}</span><span class="p-dateright">${e.date}</span>`;

  const wx = document.createElement('p');
  wx.className = 'p-weather';
  wx.textContent = e.weather;

  const body = document.createElement('p');
  body.className = 'p-text';
  body.dataset.text = e.text;

  const note = document.createElement('p');
  note.className = 'p-note';
  note.textContent = e.note;

  right.appendChild(dayEl);
  right.appendChild(wx);
  right.appendChild(body);
  right.appendChild(note);

  page.appendChild(left);
  page.appendChild(right);
  book.appendChild(page);
});

// nav dots
const navDots = document.getElementById('navDots');
entries.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => goTo(i));
  navDots.appendChild(d);
});

// typewriter
function typeText(el) {
  if (el.dataset.typed) return;
  el.dataset.typed = '1';
  const text = el.dataset.text;
  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  el.appendChild(cursor);
  const t = setInterval(() => {
    if (i < text.length) cursor.insertAdjacentText('beforebegin', text[i++]);
    else { clearInterval(t); setTimeout(() => cursor.remove(), 1000); }
  }, 22);
}

// navigation
const pages    = () => document.querySelectorAll('.page');
const prevBtn  = document.getElementById('prevBtn');
const nextBtn  = document.getElementById('nextBtn');
const counter  = document.getElementById('pageCounter');
let current = 0;

function goTo(i) {
  const all = pages();
  if (i < 0 || i >= all.length) return;
  all[current].classList.remove('active');
  all[current].classList.add('exit');
  setTimeout(() => all[current].classList.remove('exit'), 450);
  current = i;
  all[current].classList.add('active');
  typeText(all[current].querySelector('.p-text'));
  counter.textContent = `${current + 1} / ${all.length}`;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === all.length - 1;
  document.querySelectorAll('.dot').forEach((d, j) => d.classList.toggle('active', j === current));
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => {
  if (current === pages().length - 1) showBack();
  else goTo(current + 1);
});

document.addEventListener('keydown', ev => {
  if (document.getElementById('journal').classList.contains('hidden')) return;
  if (ev.key === 'ArrowRight') current === pages().length - 1 ? showBack() : goTo(current + 1);
  if (ev.key === 'ArrowLeft')  goTo(current - 1);
});

let tx = 0;
document.addEventListener('touchstart', e => { tx = e.touches[0].clientX; });
document.addEventListener('touchend',   e => {
  const dx = e.changedTouches[0].clientX - tx;
  if (Math.abs(dx) < 40) return;
  if (dx < 0) current === pages().length - 1 ? showBack() : goTo(current + 1);
  else goTo(current - 1);
});

// init first page
typeText(document.querySelectorAll('.p-text')[0]);
prevBtn.disabled = true;
counter.textContent = `1 / ${entries.length}`;

// cover open
document.getElementById('openBtn').addEventListener('click', () => {
  document.getElementById('cover').classList.add('hidden');
  document.getElementById('journal').classList.remove('hidden');
});

document.getElementById('closeBtn').addEventListener('click', () => {
  document.getElementById('journal').classList.add('hidden');
  document.getElementById('cover').classList.remove('hidden');
});

function showBack() {
  document.getElementById('journal').classList.add('hidden');
  document.getElementById('backCover').classList.remove('hidden');
}

document.getElementById('restartBtn').addEventListener('click', () => {
  document.getElementById('backCover').classList.add('hidden');
  current = 0;
  document.querySelectorAll('.page').forEach((p, i) => {
    p.classList.toggle('active', i === 0);
    p.classList.remove('exit');
  });
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === 0));
  counter.textContent = `1 / ${entries.length}`;
  prevBtn.disabled = true;
  nextBtn.disabled = false;
  document.getElementById('journal').classList.remove('hidden');
});

// sound
const soundBtn = document.getElementById('soundBtn');
const audio    = document.getElementById('ocean');
soundBtn.addEventListener('click', () => {
  if (audio.paused) { audio.play(); soundBtn.textContent = 'sound on'; }
  else              { audio.pause(); soundBtn.textContent = 'sound off'; }
});

// open-meteo weather (Oregon Coast)
fetch('https://api.open-meteo.com/v1/forecast?latitude=44.6&longitude=-124.1&current=temperature_2m,weathercode&timezone=America%2FLos_Angeles')
  .then(r => r.json())
  .then(d => {
      document.getElementById('coverWeather').textContent =
      `Oregon Coast · ${Math.round(d.current.temperature_2m)}°C right now`;
  }).catch(() => {});

// wikipedia seal fact for back cover
fetch('https://en.wikipedia.org/api/rest_v1/page/summary/Harbor_seal')
  .then(r => r.json())
  .then(d => {
    const s = d.extract.match(/[^.!?]+[.!?]+/g) || [];
    document.getElementById('backFact').textContent = s.slice(0,2).join(' ');
  }).catch(() => {});

// moon phase
(function() {
  const now = new Date();
  let y = now.getFullYear(), m = now.getMonth() + 1, day = now.getDate();
  if (m < 3) { y--; m += 12; }
  const a = Math.floor(y/100), b = 2 - a + Math.floor(a/4);
  const jd = Math.floor(365.25*(y+4716)) + Math.floor(30.6001*(m+1)) + day + b - 1524.5;
  const phase = ((jd - 2451549.5) % 29.53 + 29.53) % 29.53;
  const names = ['new moon','waxing crescent','first quarter','waxing gibbous','full moon','waning gibbous','last quarter','waning crescent'];
  document.getElementById('moonPhase').textContent = names[Math.floor(phase / 29.53 * 8)];
})();

document.getElementById('coverYear').textContent = new Date().getFullYear();
