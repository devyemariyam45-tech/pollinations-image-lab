export async function onRequest(context) {
  const url = new URL(context.request.url);

  const prompt = url.searchParams.get("prompt");
  const model = url.searchParams.get("model") || "flux";
  const width = url.searchParams.get("width") || "1024";
  const height = url.searchParams.get("height") || "1024";
  const seed = url.searchParams.get("seed");
  const transparent = url.searchParams.get("transparent");

  if (!prompt || !prompt.trim()) {
    return new Response(
      JSON.stringify({ error: "Please enter a prompt." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  const params = new URLSearchParams({
    prompt: prompt.trim(),
    model,
    width,
    height
  });

  if (seed) {
    params.set("seed", seed);
  }

  if (transparent === "true") {
    params.set("transparent", "true");
  }

  const imageUrl =
    `https://gen.pollinations.ai/image/${encodeURIComponent(prompt.trim())}?${params.toString()}`;

  return Response.redirect(imageUrl, 302);
}
