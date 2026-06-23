// Shared TypeScript interfaces for weather-related API responses.
// These are intentionally generic so they can sit on top of any concrete weather API.

export interface CurrentWeatherResponse {
  city: string;
  country?: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection?: number;
  description: string;
  icon?: string;
  /** ISO 8601 timestamp representing when the observation was recorded. */
  timestamp: string;
}

export interface ForecastItem {
  /** ISO 8601 timestamp for the forecasted time slot. */
  timestamp: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection?: number;
  description: string;
  icon?: string;
}

export interface ForecastResponse {
  city: string;
  country?: string;
  items: ForecastItem[];
}

export interface WeatherHistoryEntry {
  /** Date associated with this historical record (e.g. YYYY-MM-DD or ISO date string). */
  date: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
}

export interface WeatherHistoryResponse {
  city: string;
  country?: string;
  /** The date this history response corresponds to. */
  date: string;
  entries: WeatherHistoryEntry[];
}

