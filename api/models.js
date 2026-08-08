export async function onRequest() {
  const res = await fetch("https://gen.pollinations.ai/image/models");

  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: `HTTP ${res.status}` }),
      {
        status: res.status,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}
