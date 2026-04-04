let current = 0;

function showEntry(i) {
  const e = entries[i];

  document.getElementById('entryPhoto').src           = e.photo;
  document.getElementById('entryDay').textContent     = e.day;
  document.getElementById('entryDate').textContent    = e.date;
  document.getElementById('entryWeather').textContent = e.weather;
  document.getElementById('entryNote').textContent    = e.note;
  document.getElementById('counter').textContent      = `${i + 1} / ${entries.length}`;

  document.getElementById('prevBtn').disabled = i === 0;
  document.getElementById('nextBtn').disabled = i === entries.length - 1;

  typeText(e.text);
}

function typeText(text) {
  document.getElementById('entryText').textContent = text;
}

function openJournal() {
  document.getElementById('cover').classList.add('hidden');
  document.getElementById('journal').classList.remove('hidden');
  showEntry(0);
}

function closeJournal() {
  document.getElementById('journal').classList.add('hidden');
  document.getElementById('cover').classList.remove('hidden');
}

function nextPage() {
  if (current < entries.length - 1) {
    current++;
    showEntry(current);
  }
}

function prevPage() {
  if (current > 0) {
    current--;
    showEntry(current);
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextPage();
  if (e.key === 'ArrowLeft')  prevPage();
});
