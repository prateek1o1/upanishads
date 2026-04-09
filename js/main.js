// main.js
import { getTheme, setTheme, getFontScale, setFontScale } from './storage.js';

export function initTheme() {
  const theme = getTheme();
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

export function initFontScale() {
  document.documentElement.style.setProperty('--font-scale', getFontScale());
}

export function initControls() {
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    document.getElementById('theme-toggle').textContent = next === 'dark' ? '☀️' : '🌙';
  });
  const slider = document.getElementById('font-slider');
  const label = document.getElementById('font-label');
  if (slider) {
    slider.value = Math.round(getFontScale() * 100);
    if (label) label.textContent = slider.value + '%';
    slider.addEventListener('input', () => {
      const s = slider.value / 100;
      setFontScale(s);
      document.documentElement.style.setProperty('--font-scale', s);
      if (label) label.textContent = slider.value + '%';
    });
  }
}

export function initReadingProgress() {
  const bar = document.getElementById('reading-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const el = document.documentElement;
    bar.style.width = (el.scrollTop / (el.scrollHeight - el.clientHeight) * 100) + '%';
  });
}

export async function fetchUpanishad(id) {
  const res = await fetch(`data/${id}.json`);
  if (!res.ok) throw new Error('Not found');
  return res.json();
}

export function getDailyVerseRef(upanishads) {
  const total = upanishads.reduce((s, u) => s + u.total_verses, 0);
  const day = Math.floor(Date.now() / 86400000);
  let idx = day % total;
  for (const u of upanishads) {
    if (idx < u.total_verses) return { uid: u.id, vn: idx + 1 };
    idx -= u.total_verses;
  }
  return { uid: upanishads[0].id, vn: 1 };
}
