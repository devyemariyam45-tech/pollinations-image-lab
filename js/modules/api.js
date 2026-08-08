import { STORAGE_KEYS, DEFAULT_SETTINGS } from './config.js';

export async function fetchAvailableModels() {
  const res = await fetch('https://gen.pollinations.ai/image/models');

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    throw new Error('Invalid response format');
  }

  return data
    .map(m => m?.name || m)
    .filter(Boolean);
}

export function buildImageUrl(prompt, settings) {
  const cleanPrompt = String(prompt || '').trim();

  if (!cleanPrompt) {
    throw new Error('Prompt is required');
  }

  const s = {
    ...DEFAULT_SETTINGS,
    ...(settings || {})
  };

  if (!s.model) {
    throw new Error('Image model is required');
  }

  const params = new URLSearchParams();

  params.set('model', s.model);

  if (s.width) {
    params.set('width', String(s.width));
  }

  if (s.height) {
    params.set('height', String(s.height));
  }

  if (s.seed !== undefined && s.seed !== null && String(s.seed).trim()) {
    params.set('seed', String(s.seed).trim());
  }

  if (s.transparent === true) {
    params.set('transparent', 'true');
  }

  // API key:
  // Only use a client-safe / authorized key in a frontend app.
  if (s.apiKey && String(s.apiKey).trim()) {
    params.set('key', String(s.apiKey).trim());
  }

  return `https://gen.pollinations.ai/image/${encodeURIComponent(cleanPrompt)}?${params.toString()}`;
}
