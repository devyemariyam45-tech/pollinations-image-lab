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

export async function buildImageUrl(prompt, settings = {}) {
  if (!prompt?.trim()) {
    throw new Error('Please enter a prompt.');
  }

  const apiKey = process.env.POLLINATIONS_API_KEY;

  if (!apiKey) {
    throw new Error('POLLINATIONS_API_KEY is not configured.');
  }

  const params = new URLSearchParams({
    model: settings.model || 'flux',
    width: String(settings.width || 1024),
    height: String(settings.height || 1024),
    key: apiKey
  });

  if (settings.seed) {
    params.append('seed', String(settings.seed));
  }

  if (settings.transparent) {
    params.append('transparent', 'true');
  }

  return `https://gen.pollinations.ai/image/${encodeURIComponent(
    prompt.trim()
  )}?${params.toString()}`;
}
