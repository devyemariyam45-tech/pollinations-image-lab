import { buildImageUrl } from './api.js';
import { addToHistory } from './history.js';
import { showToast } from './utils.js';

export async function generateImage(prompt, settings, onStart, onSuccess, onError) {
  if (!prompt || !prompt.trim()) {
    showToast('Please enter a prompt.', true);
    return;
  }

  // API key must exist
  if (!settings || !settings.apiKey || !settings.apiKey.trim()) {
    showToast('Please enter your API key.', true);
    return;
  }

  if (!settings.model || !settings.model.trim()) {
    showToast('Please select a model.', true);
    return;
  }

  onStart?.();

  try {
    const url = buildImageUrl(prompt.trim(), settings);

    if (!url) {
      throw new Error('Could not build image URL.');
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = () => reject(new Error('Image failed to load.'));
      img.src = url;
    });

    const imageUrl = url;

    addToHistory({
      prompt: prompt.trim(),
      model: settings.model,
      url: imageUrl,
      width: settings.width,
      height: settings.height,
      seed: settings.seed || 'random',
      transparent: !!settings.transparent
    });

    onSuccess?.(imageUrl, prompt.trim(), settings);

    showToast('Image generated!');
    return imageUrl;

  } catch (err) {
    console.error('Image generation error:', err);

    showToast(
      err?.message || 'Generation failed. Check your API key or model.',
      true
    );

    onError?.(err);
    throw err;
  }
}
