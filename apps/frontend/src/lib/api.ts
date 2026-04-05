export async function apiFetch(path: string, options: RequestInit = {}) {
  // Ensure path starts with a slash for the URL constructor or template literal
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Since this is called from Server Components, we need the full URL
  // or a relative URL if called from the client. 
  // However, our proxy is at /api/proxy/*.
  // If calling from Server, localhost:3000 is needed.
  
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const url = `${baseUrl}/api/proxy/${cleanPath}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    // Prevent caching for now to see fresh data during dev
    cache: 'no-store'
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API Fetch Error: ${response.status} ${response.statusText} - ${errorText}`);
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}
