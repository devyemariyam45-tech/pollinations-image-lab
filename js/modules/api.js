export async function fetchAvailableModels() {
  return [
    'flux',
    'zimage',
    'kontext',
    'nanobanana',
    'seedream',
    'gptimage'
  ];
}

export async function buildImageUrl(prompt, settings) {
  if (!prompt?.trim()) {
    throw new Error('Please enter a prompt.');
  }

  const params = new URLSearchParams({
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

  return `https://gen.pollinations.ai/image/${encodeURIComponent(
    prompt.trim()
  )}?${params.toString()}`;
}
