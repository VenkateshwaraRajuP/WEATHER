// ─── Types ────────────────────────────────────────────────────────────────────

export interface RequestOptions {
  query?: Record<string, string | number | boolean | undefined | null>;
}

export interface ApiError extends Error {
  status: number;
  data: unknown;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const buildUrl = (
  baseUrl: string,
  path: string,
  query?: RequestOptions["query"]
): string => {
  const normalizedBase = baseUrl.endsWith("/")
    ? baseUrl.slice(0, -1)
    : baseUrl;

  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  const url = new URL(`${normalizedBase}/${normalizedPath}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
};

function createApiError(message: string, status: number, data: unknown): ApiError {
  const err = new Error(message) as ApiError;
  err.name = "ApiError";
  err.status = status;
  err.data = data;
  return err;
}

// ─── Client ───────────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_WEATHER_API_BASE_URL as string;

if (!BASE_URL) {
  console.error(
    "[apiClient] VITE_WEATHER_API_BASE_URL is not set. Check your .env file."
  );
}

export const apiClient = {
  async request<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
    const url = buildUrl(BASE_URL, path, options.query);

    let response: Response;
    try {
      response = await fetch(url);
    } catch (networkErr) {
      // Network failure (offline, DNS error, CORS, etc.)
      throw new Error(
        `Network error – could not reach the weather API. ${
          networkErr instanceof Error ? networkErr.message : ""
        }`.trim()
      );
    }

    // OpenWeatherMap returns error details in JSON even for 4xx/5xx
    let data: unknown;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      const message =
        (data as { message?: string })?.message ??
        `Request failed with status ${response.status}`;
      throw createApiError(message, response.status, data);
    }

    return data as T;
  },
};
