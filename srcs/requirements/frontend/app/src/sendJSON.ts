// sendJSON.ts

// Fonction générique pour envoyer les données
export async function sendJSON(url: string, body: object): Promise<Response> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  // if (!res.ok) {
  //   const errText = await res.text();
  //   throw new Error(errText || `HTTP ${res.status}`);
  // }

  return res; // <= OK
}

