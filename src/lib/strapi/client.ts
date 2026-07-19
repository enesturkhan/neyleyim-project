/**
 * Strapi CMS client placeholder.
 * Wire base URL, auth, and typed fetchers when the CMS is connected.
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "";

export function getStrapiUrl(path = ""): string {
  if (!STRAPI_URL) return path;
  return `${STRAPI_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export async function strapiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const url = getStrapiUrl(path);

  if (!STRAPI_URL) {
    throw new Error("NEXT_PUBLIC_STRAPI_URL is not configured.");
  }

  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
