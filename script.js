/* ═══════════════════════════════════════
   SEAL DIARIES — script.js
   APIs used (all free, no key needed):
   • Open-Meteo  — live weather
   • Wikipedia   — harbor seal extract
   • Farmsense   — moon phase
═══════════════════════════════════════ */

// ── Diary entries ──────────────────────
const entries = [
  {
    day: "Day 1",
    date: "March 3rd",
    weather: "☁️ overcast · 12°C · low tide",
    mood: "determined",
    caption: "the rock. my rock.",
    stickers: [{ e: "🐟", b: "12%", r: "8%" }, { e: "💧", t: "10%", l: "14%" }],
    text: "I saw a fish today. I chased it. I missed. It looked back at me. This is a personal attack and I will not be recovering quickly.",
    note: "Note to self: practice the lunge. The lunge needs work."
  },
  {
    day: "Day 2",
    date: "March 4th",
    weather: "🌤 partly cloudy · 13°C · rising tide",
    mood: "victorious",
    caption: "post-victory haul-out",
    stickers: [{ e: "🏆", b: "8%", r: "10%" }],
    text: "I got the fish. My whiskers detected its movement from two body lengths away. Scientists call these vibrissae. I call them my gift. Balance has been restored to this ocean.",
    note: "The fish was a herring. Excellent texture. 9/10."
  },
  {
    day: "Day 3",
    date: "March 5th",
    weather: "🌧 rain · 10°C · high tide",
    mood: "unbothered",
    caption: "do not disturb",
    stickers: [{ e: "💤", t: "10%", r: "12%" }, { e: "🌊", b: "10%", l: "10%" }],
    text: "Slept underwater for eleven minutes. Humans call this 'bottling.' I call it a completely normal Tuesday. My heart rate dropped to 4 beats per minute. I am extremely efficient.",
    note: "Woke up. Considered the ocean. Went back to sleep."
  },
  {
    day: "Day 4",
    date: "March 7th",
    weather: "☀️ sunny · 15°C · ebb tide",
    mood: "unimpressed",
    caption: "the incident",
    stickers: [{ e: "👋", t: "8%", l: "8%" }],
    text: "A human waved at me today from a kayak. I stared at them for a long time. I did not wave back. We are not equals. They paddled away looking confused. Good.",
    note: "They had a camera. I gave them my best side anyway. I am not a monster."
  },
  {
    day: "Day 5",
    date: "March 9th",
    weather: "🌬 windy · 11°C · choppy",
    mood: "philosophical",
    caption: "self portrait session",
    stickers: [{ e: "✨", t: "12%", r: "10%" }, { e: "🔍", b: "12%", l: "8%" }],
    text: "My coat has spots unique to me alone — like fingerprints, but better because they are on a seal. No other animal on this coast looks exactly like me. I have been thinking about this all day.",
    note: "I am, objectively, the most interesting individual in this cove."
  },
  {
    day: "Day 6",
    date: "March 11th",
    weather: "🌫 foggy · 9°C · slack tide",
    mood: "social (reluctantly)",
    caption: "the colony situation",
    stickers: [{ e: "🦭", b: "8%", r: "8%" }, { e: "😤", t: "10%", l: "10%" }],
    text: "Gerald took my spot on the rock again. I moved six inches to the left. This is called compromise. I do not enjoy it. Gerald smells like low tide and poor decisions.",
    note: "Gerald has been noted. Gerald will be remembered."
  },
  {
    day: "Day 7",
    date: "March 14th",
    weather: "⛅ clearing · 14°C · flood tide",
    mood: "scientific",
    caption: "deep dive research",
    stickers: [{ e: "🔬", t: "8%", r: "12%" }],
    text: "I can dive to 500 metres and hold my breath for 28 minutes. I know this because I did it today, mostly to avoid Gerald. My blood stores oxygen more efficiently than any human's. I am built different.",
    note: "Saw a lingcod at 200m. We acknowledged each other professionally."
  },
  {
    day: "Day 8",
    date: "March 16th",
    weather: "🌤 mild · 13°C · low tide",
    mood: "reflective",
    caption: "sunset haul-out",
    stickers: [{ e: "🌅", b: "10%", r: "8%" }, { e: "🐠", t: "12%", l: "12%" }],
    text: "On land my vision is blurry. Underwater I see perfectly. This tells me something important: land is simply less important. I have structured my entire life around this conclusion.",
    note: "The sunset was acceptable. The fish were better."
  },
  {
    day: "Day 9",
    date: "March 18th",
    weather: "🌧 stormy · 8°C · rough seas",
    mood: "cozy",
    caption: "storm day protocol",
    stickers: [{ e: "⛈️", t: "8%", l: "8%" }, { e: "😌", b: "10%", r: "10%" }],
    text: "Storm today. Hauled out with the others. Someone's pup kept barking. I barked back. We reached an understanding. The rain does not bother me. I am already wet. I have always been wet. This is my element.",
    note: "Ate two salmon. Napped. Ate one more salmon. Perfect day."
  },
  {
    day: "Day 10",
    date: "March 20th",
    weather: "☀️ clear · 16°C · spring tide",
    mood: "at peace",
    caption: "first day of spring",
    stickers: [{ e: "🌸", t: "10%", r: "8%" }, { e: "🐟", b: "8%", l: "10%" }],
    text: "First day of spring. The water is warmer. The fish are more plentiful. Gerald has moved to a different rock. Everything is as it should be. I have nothing more to say at this time.",
    note: "I lied. I always have more to say. But today I choose peace."
  }
];

// ── DOM refs ───────────────────────────
const book       = document.getElementById('book');
const prevBtn    = document.getElementById('prevBtn');
const nextBtn    = document.getElementById('nextBtn');
const counter    = document.getElementById('pageCounter');
const navDots    = document.getElementById('navDots');
const moonBadge  = document.getElementById('moonPhase');
const journal    = document.getElementById('journal');
const frontCover = document.getElementById('frontCover');
const backCover  = document.getElementById('backCover');

let current = 0;
let pages   = [];

// ── Build pages ────────────────────────
entries.forEach((e, i) => {
  const page = document.createElement('div');
  page.className = 'page' + (i === 0 ? ' active' : '');

  // LEFT
  const left = document.createElement('div');
  left.className = 'page-left';

  const topLabel = document.createElement('p');
  topLabel.className = 'left-top-label';
  topLabel.textContent = e.date;

  const frame = document.createElement('div');
  frame.className = 'photo-frame';

  const icon = document.createElement('span');
  icon.className = 'seal-icon';
  icon.textContent = '🦭';

  const photoLabel = document.createElement('span');
  photoLabel.textContent = 'photo here';

  frame.appendChild(icon);
  frame.appendChild(photoLabel);

  // stickers
  (e.stickers || []).forEach(s => {
    const st = document.createElement('span');
    st.className = 'sticker';
    st.textContent = s.e;
    if (s.t) st.style.top    = s.t;
    if (s.b) st.style.bottom = s.b;
    if (s.l) st.style.left   = s.l;
    if (s.r) st.style.right  = s.r;
    frame.appendChild(st);
  });

  const caption = document.createElement('p');
  caption.className = 'photo-caption';
  caption.textContent = e.caption;

  const moodTag = document.createElement('p');
  moodTag.className = 'mood-tag';
  moodTag.textContent = `mood: ${e.mood}`;

  left.appendChild(topLabel);
  left.appendChild(frame);
  left.appendChild(caption);
  left.appendChild(moodTag);

  // RIGHT
  const right = document.createElement('div');
  right.className = 'page-right';

  const header = document.createElement('div');
  header.className = 'page-header';

  const dayLabel = document.createElement('p');
  dayLabel.className = 'day-label';
  dayLabel.textContent = e.day;

  const dateLabel = document.createElement('p');
  dateLabel.className = 'entry-date';
  dateLabel.textContent = e.date;

  header.appendChild(dayLabel);
  header.appendChild(dateLabel);

  const weatherStrip = document.createElement('div');
  weatherStrip.className = 'weather-strip';
  weatherStrip.textContent = e.weather;

  const body = document.createElement('p');
  body.className = 'entry-body';
  body.dataset.text = e.text;

  const footnote = document.createElement('p');
  footnote.className = 'entry-footnote';
  footnote.textContent = e.note;

  right.appendChild(header);
  right.appendChild(weatherStrip);
  right.appendChild(body);
  right.appendChild(footnote);

  page.appendChild(left);
  page.appendChild(right);
  book.appendChild(page);
});

pages = Array.from(document.querySelectorAll('.page'));

// ── Nav dots ───────────────────────────
entries.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  navDots.appendChild(dot);
});

// ── Typewriter ─────────────────────────
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
    else { clearInterval(t); setTimeout(() => cursor.remove(), 1200); }
  }, 28);
}

// ── Navigation ─────────────────────────
function goTo(index) {
  if (index < 0 || index >= pages.length) return;

  pages[current].classList.remove('active');
  pages[current].classList.add('exit');
  setTimeout(() => pages[current].classList.remove('exit'), 500);

  current = index;
  pages[current].classList.add('active');
  typeText(pages[current].querySelector('.entry-body'));

  counter.textContent = `Page ${current + 1} of ${pages.length}`;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === pages.length - 1;

  document.querySelectorAll('.nav-dot').forEach((d, i) =>
    d.classList.toggle('active', i === current)
  );
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => {
  if (current === pages.length - 1) showBackCover();
  else goTo(current + 1);
});

document.addEventListener('keydown', ev => {
  if (!journal.classList.contains('hidden')) {
    if (ev.key === 'ArrowRight') current === pages.length - 1 ? showBackCover() : goTo(current + 1);
    if (ev.key === 'ArrowLeft')  goTo(current - 1);
  }
});

// swipe
let touchX = 0;
document.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; });
document.addEventListener('touchend',   e => {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) < 40) return;
  if (dx < 0) current === pages.length - 1 ? showBackCover() : goTo(current + 1);
  else         goTo(current - 1);
});

// type first page
typeText(pages[0].querySelector('.entry-body'));
prevBtn.disabled = true;

// ── Cover open ─────────────────────────
document.getElementById('openBtn').addEventListener('click', () => {
  frontCover.classList.add('opening');
  setTimeout(() => {
    frontCover.classList.add('hidden');
    journal.classList.remove('hidden');
  }, 900);
});

// ── Close journal → back to cover ──────
document.getElementById('closeBtn').addEventListener('click', () => {
  journal.classList.add('hidden');
  frontCover.classList.remove('hidden', 'opening');
});

// ── Back cover ─────────────────────────
function showBackCover() {
  journal.classList.add('hidden');
  backCover.classList.remove('hidden');
}

document.getElementById('restartBtn').addEventListener('click', () => {
  backCover.classList.add('hidden');
  current = 0;
  pages.forEach((p, i) => {
    p.classList.remove('active', 'exit');
    if (i === 0) p.classList.add('active');
  });
  document.querySelectorAll('.nav-dot').forEach((d, i) =>
    d.classList.toggle('active', i === 0)
  );
  counter.textContent = `Page 1 of ${pages.length}`;
  prevBtn.disabled = true;
  nextBtn.disabled = false;
  journal.classList.remove('hidden');
});

// ── Sound ──────────────────────────────
const soundBtn = document.getElementById('soundBtn');
const audio    = document.getElementById('ocean');
soundBtn.addEventListener('click', () => {
  if (audio.paused) { audio.play(); soundBtn.textContent = '🔊'; }
  else              { audio.pause(); soundBtn.textContent = '🔇'; }
});

// ══════════════════════════════════════
// API 1 — Open-Meteo (live weather)
// Coordinates: Oregon Coast (44.6°N, 124.1°W)
// ══════════════════════════════════════
async function fetchWeather() {
  try {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=44.6&longitude=-124.1&current=temperature_2m,weathercode&temperature_unit=celsius&timezone=America%2FLos_Angeles';
    const res  = await fetch(url);
    const data = await res.json();
    const temp = Math.round(data.current.temperature_2m);
    const code = data.current.weathercode;

    const icons = {
      0:'☀️', 1:'🌤', 2:'⛅', 3:'☁️',
      45:'🌫', 48:'🌫', 51:'🌦', 53:'🌦', 55:'🌧',
      61:'🌧', 63:'🌧', 65:'🌧', 71:'🌨', 73:'🌨',
      80:'🌦', 81:'🌧', 82:'⛈️', 95:'⛈️'
    };
    const icon = icons[code] || '🌊';
    document.getElementById('coverWeather').textContent =
      `${icon} Oregon Coast right now · ${temp}°C`;
  } catch {
    document.getElementById('coverWeather').textContent = '🌊 Oregon Coast · conditions unknown';
  }
}
fetchWeather();

// ══════════════════════════════════════
// API 2 — Wikipedia (harbor seal extract)
// ══════════════════════════════════════
async function fetchSealFact() {
  try {
    const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/Harbor_seal';
    const res  = await fetch(url);
    const data = await res.json();
    // grab first two sentences
    const sentences = data.extract.match(/[^.!?]+[.!?]+/g) || [];
    const fact = sentences.slice(0, 2).join(' ').trim();
    document.getElementById('backFact').textContent = `"${fact}"`;
  } catch {
    document.getElementById('backFact').textContent =
      '"Harbor seals are true seals found along temperate and Arctic marine coastlines."';
  }
}
fetchSealFact();

// ══════════════════════════════════════
// API 3 — Moon phase (calculation, no key)
// ══════════════════════════════════════
function getMoonPhase() {
  const now  = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day   = now.getDate();
  // Meeus algorithm (simplified)
  let y = year, m = month;
  if (m < 3) { y--; m += 12; }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524.5;
  const daysSinceNew = (jd - 2451549.5) % 29.53058867;
  const phase = ((daysSinceNew % 29.53058867) + 29.53058867) % 29.53058867;

  const phases = [
    { max: 1.85,  icon: '🌑', name: 'New Moon' },
    { max: 7.38,  icon: '🌒', name: 'Waxing Crescent' },
    { max: 9.22,  icon: '🌓', name: 'First Quarter' },
    { max: 14.77, icon: '🌔', name: 'Waxing Gibbous' },
    { max: 16.61, icon: '🌕', name: 'Full Moon' },
    { max: 22.15, icon: '🌖', name: 'Waning Gibbous' },
    { max: 23.99, icon: '🌗', name: 'Last Quarter' },
    { max: 29.53, icon: '🌘', name: 'Waning Crescent' },
  ];

  const p = phases.find(ph => phase < ph.max) || phases[7];
  moonBadge.textContent = p.icon;
  moonBadge.title = p.name;
}
getMoonPhase();

// ── Cover year ─────────────────────────
document.getElementById('coverYear').textContent = new Date().getFullYear();
