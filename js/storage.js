// storage.js — All localStorage operations for Upanishads

const KEYS = {
  BOOKMARKS: 'upan_bookmarks',
  NOTES: 'upan_notes',
  READ: 'upan_read',
  THEME: 'upan_theme',
  FONT_SCALE: 'upan_font_scale',
  LAST_READ_DATE: 'upan_last_read_date',
  STREAK: 'upan_streak',
  LAST_VERSE: 'upan_last_verse',
};

function getJSON(key, fallback = {}) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; }
  catch { return fallback; }
}
function setJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

// Bookmarks
export function getBookmarks() { return getJSON(KEYS.BOOKMARKS, []); }
export function isBookmarked(uid, vn) { return getBookmarks().some(b => b.uid === uid && b.vn === vn); }
export function toggleBookmark(uid, vn, preview) {
  let bm = getBookmarks();
  const idx = bm.findIndex(b => b.uid === uid && b.vn === vn);
  if (idx >= 0) bm.splice(idx, 1); else bm.push({ uid, vn, preview });
  setJSON(KEYS.BOOKMARKS, bm);
  return idx < 0;
}

// Notes
export function getNote(uid, vn) { return getJSON(KEYS.NOTES, {})[`${uid}_${vn}`] || ''; }
export function saveNote(uid, vn, text) {
  const notes = getJSON(KEYS.NOTES, {});
  notes[`${uid}_${vn}`] = text;
  setJSON(KEYS.NOTES, notes);
}

// Read status
export function getReadSet() { return getJSON(KEYS.READ, {}); }
export function isRead(uid, vn) { return !!getReadSet()[`${uid}_${vn}`]; }
export function markRead(uid, vn) {
  const r = getReadSet(); r[`${uid}_${vn}`] = true; setJSON(KEYS.READ, r); updateStreak();
}
export function unmarkRead(uid, vn) {
  const r = getReadSet(); delete r[`${uid}_${vn}`]; setJSON(KEYS.READ, r);
}
export function getUpanishadProgress(uid, total) {
  const r = getReadSet();
  let count = 0;
  for (let i = 1; i <= total; i++) if (r[`${uid}_${i}`]) count++;
  return count;
}
export function getTotalRead() { return Object.keys(getReadSet()).length; }

// Theme
export function getTheme() { return localStorage.getItem(KEYS.THEME) || 'light'; }
export function setTheme(t) { localStorage.setItem(KEYS.THEME, t); }

// Font scale
export function getFontScale() { return parseFloat(localStorage.getItem(KEYS.FONT_SCALE)) || 1; }
export function setFontScale(s) { localStorage.setItem(KEYS.FONT_SCALE, s); }

// Streak
export function getStreak() { return parseInt(localStorage.getItem(KEYS.STREAK)) || 0; }
function updateStreak() {
  const today = new Date().toDateString();
  const last = localStorage.getItem(KEYS.LAST_READ_DATE);
  if (last === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const streak = last === yesterday ? getStreak() + 1 : 1;
  localStorage.setItem(KEYS.STREAK, streak);
  localStorage.setItem(KEYS.LAST_READ_DATE, today);
}

// Last visited verse
export function setLastVerse(uid, vn) { localStorage.setItem(KEYS.LAST_VERSE, JSON.stringify({ uid, vn })); }
export function getLastVerse() {
  try { return JSON.parse(localStorage.getItem(KEYS.LAST_VERSE)); } catch { return null; }
}
