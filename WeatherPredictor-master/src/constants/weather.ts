// Weather-related constants and enums (units, metric keys, etc.).

export const WEATHER_UNITS = {
  temperature: "metric", // e.g., metric / imperial
  windSpeed: "m_s", // e.g., m_s / km_h
} as const;

export const WEATHER_METRIC_KEYS = {
  temperature: "temperature",
  humidity: "humidity",
  windSpeed: "windSpeed",
  pressure: "pressure",
  visibility: "visibility",
} as const;


