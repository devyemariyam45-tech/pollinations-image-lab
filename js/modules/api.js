export async function fetchAvailableModels() {
  const res = await fetch('/api/models');

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    throw new Error('Invalid response format');
  }

  return data.filter(m => m && m.name).map(m => m.name);
}

export async function buildImageUrl(prompt, settings) {
  if (!prompt?.trim()) {
    throw new Error('Please enter a prompt.');
  }

  const params = new URLSearchParams({
    prompt: prompt.trim(),
    model: settings.model || 'flux',
    width: settings.width || 1024,
    height: settings.height || 1024
  });

  if (settings.seed) {
    params.append('seed', settings.seed);
  }

  if (settings.transparent) {
    params.append('transparent', 'true');
  }

  return `/api/image?${params.toString()}`;
}
