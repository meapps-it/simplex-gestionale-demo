export const fontChoices = [
  ['system', 'Sistema', 'sans-serif'],
  ['modern', 'Moderno', 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'],
  ['serif', 'Classico', 'Georgia, "Times New Roman", serif'],
  ['mono', 'Monospaziato', 'ui-monospace, "Courier New", monospace']
];
const KEY = 'sg:typography';
export function normalizeTypography(value = {}) {
  const font = fontChoices.some(([id]) => id === value?.font) ? value.font : 'system';
  const n = Number(value?.size);
  return {font, size: Number.isFinite(n) && n >= 80 && n <= 160 ? Math.round(n) : 100};
}
export function readTypography(storage = localStorage) {
  try { return normalizeTypography(JSON.parse(storage.getItem(KEY) || '{}')); }
  catch { return normalizeTypography(); }
}
export function applyTypography(value, root = document.documentElement) {
  const prefs = normalizeTypography(value);
  const native = typeof window !== 'undefined' && window.sgNativeSystemFont?.status === 'ready';
  root.style.setProperty('--app-font', prefs.font === 'system' && native ? '"SimplexDeviceFont", sans-serif' : fontChoices.find(([id]) => id === prefs.font)[2]);
  root.style.setProperty('--text-scale', String(prefs.size / 100));
  root.dataset.largeText = String(prefs.size >= 140);
  return prefs;
}
export function saveTypography(value, storage = localStorage) {
  const prefs = normalizeTypography(value);
  storage.setItem(KEY, JSON.stringify(prefs));
  return prefs;
}
