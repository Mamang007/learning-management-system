export async function apiFetch(path: string, options: RequestInit = {}) {
  const url = \/api/proxy/\\;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(\API request failed: \\);
  }

  return response.json();
}
