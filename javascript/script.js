let current = 0;

function showEntry(i) {
  const e = entries[i];

  const photo = document.getElementById('entryPhoto');
  photo.src = '';
  photo.src = e.photo;

  document.getElementById('entryDay').textContent     = e.day;
  document.getElementById('entryWeather').textContent = e.weather;
  document.getElementById('entryText').textContent    = e.text;
  document.getElementById('counter').textContent      = `${i + 1} / ${entries.length}`;

  document.getElementById('prevBtn').disabled = i === 0;
  document.getElementById('nextBtn').disabled = i === entries.length - 1;
}

function openJournal() {
  const wrap = document.getElementById('coverWrap');
  wrap.classList.add('opening');
  setTimeout(() => {
    wrap.classList.add('hidden');
    document.getElementById('journal').classList.remove('hidden');
    showEntry(0);
  }, 500);
}

function closeJournal() {
  const wrap = document.getElementById('coverWrap');
  wrap.classList.remove('opening', 'hidden');
  document.getElementById('journal').classList.add('hidden');
  current = 0;
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

document.addEventListener('keydown', function(e) {
  if (document.getElementById('journal').classList.contains('hidden')) return;
  if (e.key === 'ArrowRight') nextPage();
  if (e.key === 'ArrowLeft')  prevPage();
});
